# EDF 文件
## 标准头 (以下数字代表属性所占用的字节数, 英文为属性代名词)
- 8 `version` EDF文件版本号
- 80 `patient_id` 被测者唯一标识
- 80 `record_id` 此次记录id
- 8 `start_date` 记录开始日期dd.mm.yy 日.月.年
- 8 `start_time` 记录开始时间hh.mm.ss 时.分.秒
- 8 `number_of_bytes_in_header` 头部的字节总长度，包括文件头和信号头
- 44 `reserved` 保留字段 (为EDF+保留)
- 8 `number_of_blocks_in_record` 文件中的块总数(数据区中一共记录了多少个数据块)
- 8 `duration_of_data_record` 每个数据块记录的数据时长 (比如这里是1 代表了一个数据块是所有信号按照他们的采样率采样1秒的组合。)
- 4 `number_of_signals` 文件中的信号数量 (包含EDF Annotation找个信号)
> 前256个字节记录了EDF文件的标准头信息
## 信号头
> 信号头总长度为 `number_of_signals` * 256 
### 解析规则为
```
信号头不是每256个字节为一个信号头
而是 number_of_signals * 头属性所占字节数 为每个信号的第n个属性值
```
- `number_of_signals` * 16 `label` 标签 电极位置，体温等信息 
- `number_of_signals` * 80 `transducer` 电极信息
- `number_of_signals` * 8 `physical_dimension` 幅值单位信息
- `number_of_signals` * 8 `physical_min` 物理信号最小值
- `number_of_signals` * 8 `physical_max` 物理信号最大值
- `number_of_signals` * 8 `digital_min` 数字信号最小值
- `number_of_signals` * 8 `digital_max` 数字信号最大值
- `number_of_signals` * 80 `prefiltering` 滤波器参数
- `number_of_signals` * 8 `number_of_samples` 采样率
- `number_of_signals` * 32 `reserved` 保留字段 (采集信号类型) 

> 此时信号头解析完毕 `标准头` + `信号头` = `number_of_bytes_in_header`

----------

## 数据
- 数据部分为: `文件总长度` - `number_of_bytes_in_header`
- 数据共有 `number_of_blocks_in_record` 块
- 每块的长度为所有信号的`number_of_samples`也就是采样率的总和 例如累加后为`765`那么代表着，所有信号在一个数据块中`duration_of_data_record`时间内有765个数据, 每个数据点占两个字节 那么一个数据块所占用的字节长度为 `2` * `765` = `1530`
- 计算出每个数据块所占字节长度后,就可以按照这个长度进行数据解析了。普通的信号按照 每2个字节一个数据解析即可 解析规则为**2字节有符号 小字节序 二进制补码** --- 各个语言都有各自的方法 Nodejs中为`block.readInt16LE(offset)` 普通的信号每个信号在这个块中所占字节长度为该信号的采样率X2 按照信号顺序依次在数据块中依次解析每个信号在这个数据块中的数值
- 对于`EDF Annotations`信号 解析到它时把他的数据段按`0x14``0x0`两个特殊字符分割，得到的每段数据再按照`0x14`分割 分割后的第一个数据为`onset` 剩下的都为原始annotation `onset`继续按照`0x15`分割 第一个为这个数据块中annotation的`开始时间` 第二个数据为这个数据块中annotation的`持续时间` 可参考https://www.edfplus.info/specs/index.html

### 数字值转物理值函数为
```js
let scale = (该信号的.physicalMax - 该信号的.physicalMin) / (该信号的.digitalMax - 该信号的.digitalMin)
let offset = 该信号的.physicalMax / scale - 该信号的.digitalMax;
return scale * (数字值 + offset);
```
> 返回的即为可以绘制的物理值


## 附上nodejs的文件解析简单实现
```js
const fs = require('fs-extra')
const path = require('path')
const moment = require('moment')
const { range } = require('range')

const NUL = 0x0
const DC4 = 0x14
const NAK = 0x15

const EDF_ANNOTATIONS_LABEL = 'EDF Annotations'
const TALS_DELIMITER = Buffer.from([DC4, NUL])
const ANNOTATIONS_DELIMITER = Buffer.from([DC4])
const ONESET_DELIMITER = Buffer.from([NAK])

const NUMBER = function (v) {
    return +STRING(v)
}

const STRING = function (v) {
    return v.toString().trim()
}

const NUMBER_OF_PER_HEADER_BYTES = 256
const SAMPLE_BYTE_LENGTH = 2

const EDF_SPECIFICATION = {
    HEADERS: [
        { name: 'version', len: 8, desc: 'EDF文件版本号', type: NUMBER },
        { name: 'patient_id', len: 80, desc: '被测者唯一标识', type: STRING },
        { name: 'record_id', len: 80, desc: '此次记录id', type: STRING },
        { name: 'start_date', len: 8, desc: '记录开始日期dd.mm.yy', type: STRING },
        { name: 'start_time', len: 8, desc: '记录开始时间hh.mm.ss', type: STRING },
        { name: 'number_of_bytes_in_header', len: 8, desc: '头部的字节总长度，包括文件头和信号头', type: NUMBER },
        { name: 'reserved', len: 44, desc: 'EDF文件版本号', type: STRING },
        { name: 'number_of_blocks_in_record', len: 8, desc: '文件中的块总数', type: NUMBER },
        { name: 'duration_of_data_record', len: 8, desc: '数据块多少秒记录一次', type: NUMBER },
        { name: 'number_of_signals', len: 4, desc: '文件中的信号数量', type: NUMBER },
    ],
    SIGNAL_HEADERS: [
        { name: 'label', len: 16, desc: '标签 电极位置，体温等信息', type: STRING },
        { name: 'transducer', len: 80, desc: '电极信息', type: STRING },
        { name: 'physical_dimension', len: 8, desc: '幅值单位信息', type: STRING },
        { name: 'physical_min', len: 8, desc: '物理信号最小值', type: NUMBER },
        { name: 'physical_max', len: 8, desc: '物理信号最大值', type: NUMBER },
        { name: 'digital_min', len: 8, desc: '数字信号最小值', type: NUMBER },
        { name: 'digital_max', len: 8, desc: '数字信号最大值', type: NUMBER },
        { name: 'prefiltering', len: 80, desc: '滤波器参数', type: STRING },
        { name: 'number_of_samples', len: 8, desc: '采样率', type: NUMBER },
        { name: 'reserved', len: 32, desc: '保留字段 (采集信号类型)', type: STRING },
    ]
}

class Edflib {

    constructor(file_path) {
        this.edf = { headers: {}, signals: [] }
        this.file_path = file_path
    }

    async parse_headers() {
        let header_bytes = Buffer.alloc(NUMBER_OF_PER_HEADER_BYTES)
        await fs.read(this.fd, header_bytes, 0, NUMBER_OF_PER_HEADER_BYTES, 0)
        let next = 0
        EDF_SPECIFICATION.HEADERS.forEach(({ name, len, type }) => {
            this.edf.headers[name] = type(header_bytes.slice(next, next + len))
            next += len
        })
        this.edf.start_datetime = moment(`${this.edf.headers.start_date}${this.edf.headers.start_time}`, 'DD.MM.YYHH.mm.ss').toDate()
        this.edf.start_datetime_formatted = moment(this.edf.start_datetime).format('YYYY-MM-DD HH:mm:ss')
    }

    async parse_signals_headers() {
        let number_of_skip_header_bytes = NUMBER_OF_PER_HEADER_BYTES
        let len_of_signal_headers = this.edf.headers.number_of_signals * NUMBER_OF_PER_HEADER_BYTES
        let signals_header_bytes = Buffer.alloc(len_of_signal_headers)
        await fs.read(this.fd, signals_header_bytes, 0, len_of_signal_headers, number_of_skip_header_bytes)
        range(0, this.edf.headers.number_of_signals).forEach(() => {
            this.edf.signals.push({
                headers: {},
                data: [],
                reality: []
            })
        })
        let next = 0
        EDF_SPECIFICATION.SIGNAL_HEADERS.forEach(({ name, len, type }) => {
            this.edf.signals.forEach((signal) => {
                signal.headers[name] = type(signals_header_bytes.slice(next, next + len))
                next += len
            })
        })
        this.edf.signals.forEach((signal) => {
            signal.sample_duration = this.edf.headers.duration_of_data_record / signal.headers.number_of_samples;
            signal.sample_rate = signal.headers.number_of_samples / this.edf.headers.duration_of_data_record;
            signal.bytes_in_data_record = signal.headers.number_of_samples * SAMPLE_BYTE_LENGTH;
        })
        this.edf.num_samples_in_data_record = 0
        this.edf.bytes_in_data_record = 0
        this.edf.signals.forEach(signal => {
            this.edf.num_samples_in_data_record += signal.headers.number_of_samples
            this.edf.bytes_in_data_record += signal.bytes_in_data_record
        })
    }

    splitBuffer(buffer, delimiter) {
        const lines = [];
        let search;
        while ((search = buffer.indexOf(delimiter)) > -1) {
            lines.push(buffer.slice(0, search));
            buffer = buffer.slice(search + delimiter.length, buffer.length);
        }
        buffer.length && lines.push(buffer);
        return lines;
    }


    async parse() {
        this.fd = await fs.open(this.file_path, 'r')
        await this.parse_headers()
        await this.parse_signals_headers()
    }

    parse_annotation(signal, block) {
        const tals = this.splitBuffer(block, TALS_DELIMITER);
        tals.forEach(tal => {
            if (tal.indexOf(DC4) < 0) {
                return;
            }
            const [onset, ...rawAnnotations] = this.splitBuffer(tal, ANNOTATIONS_DELIMITER);
            const [rawStart, rawDuration = Buffer.from([NUL])] = this.splitBuffer(onset, ONESET_DELIMITER);
            const start = rawStart.toString()
            const duration = rawDuration.toString()
            rawAnnotations.forEach(rawAnnotation => {
                signal.data.push({
                    start: start,
                    value: rawAnnotation.toString().trim(),
                    duration
                })
            });
        });
    }

    digit2physics(signal, raw) {
        let scale = (signal.headers.physical_max - signal.headers.physical_min) / (signal.headers.digital_max - signal.headers.digital_min)
        let offset = signal.headers.physical_max / scale - signal.headers.digital_max;
        return scale * (raw + offset);
    }

    async parse_block() {
        let position = this.edf.headers.number_of_bytes_in_header
        for (let i = 0; i < this.edf.headers.number_of_blocks_in_record; i++) {
            let block_bytes = Buffer.alloc(this.edf.bytes_in_data_record)
            let start = 0
            await fs.read(this.fd, block_bytes, 0, this.edf.bytes_in_data_record, position)
            for (let j = 0; j < this.edf.signals.length; j++) {
                let signal = this.edf.signals[j]
                let block = block_bytes.slice(start, start + signal.bytes_in_data_record)
                if (signal.headers.label === EDF_ANNOTATIONS_LABEL) {
                    this.parse_annotation(signal, block)
                } else {
                    let offset = 0
                    for (let k = 0; k < signal.headers.number_of_samples; k++) {
                        const value = block.readInt16LE(offset)
                        // signal.data.push(value)
                        signal.reality.push(this.digit2physics(signal, value))
                        offset += SAMPLE_BYTE_LENGTH
                    }
                }
                start += signal.bytes_in_data_record
            }
            position += this.edf.bytes_in_data_record
        }
    }
}

module.exports = Edflib

async function test() {
    console.time('parse edf')
    let file_path = path.join(__dirname, 'eeg.edf')
    let edflib = new Edflib(file_path)
    await edflib.parse()
    await edflib.parse_block()
    console.timeEnd('parse edf')
}

test()
```
