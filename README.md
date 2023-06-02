### 字体处理
https://transfonter.org/

### mongosh
```js
const { ShellEvaluator } = require('@mongosh/shell-evaluator')
let evaluator = new ShellEvaluator( )
console.log(evaluator);
let x = await evaluator.customEval(async function (a, b, c) {
     console.log(a, b, c);
    return
}, 'show dbs;')

const { CliServiceProvider } = require('@mongosh/service-provider-server');
const { WorkerRuntime } = require('@mongosh/node-runtime-worker-thread')

async function test() {
    //const serviceProvider = await CliServiceProvider.connect('mongodb://localhost')
    //console.log(serviceProvider);

    // Create a new instance of the runtime and evaluate code from a playground.
    //const runtime = new WorkerRuntime(serviceProvider);
    const runtime = new WorkerRuntime('mongodb://localhost', {}, {})
    await runtime.waitForRuntimeToBeReady()
    // console.log(runtime)
    runtime.setEvaluationListener({
        onPrint(value) {
            console.log('onPrint', value);
        }
    })
    await runtime.evaluate('use abc');
    let x = await runtime.evaluate(`show dbs;`)
    console.log(x);
    //let a = await runtime.evaluate(`db.tests.insertOne({fuck: 'you'})`)
    //console.log(a)
    await runtime.terminate()
}

test()


```
```
"dependencies": {
    "@mongosh/browser-runtime-core": "^1.6.1",
    "@mongosh/node-runtime-worker-thread": "^1.6.1",
    "@mongosh/service-provider-server": "^1.6.1",
    "@mongosh/shell-evaluator": "^1.6.1",
    "@mongosh/types": "^1.6.1",
    "koa": "^2.14.1",
    "lodash": "^4.17.21",
    "moment": "^2.29.4",
    "node-media-server": "^2.4.9",
    "request": "^2.88.2",
    "request-promise": "^4.2.6",
    "saslprep": "^1.0.3"
  }
```

### el-scrollbar
```
.changelog-container {
  .el-scrollbar {
    height: calc(100vh - 100px);
  }
  /deep/ .el-scrollbar__bar.is-horizontal {
    display: none !important;
  }
}
.scrollbar-wrapper {
    overflow-x: hidden !important;
}
<el-scrollbar wrap-class="scrollbar-wrapper">
      <article
        style="margin: 20px"
        v-html="changelog"
        class="markdown-body"
      ></article>
</el-scrollbar>


```


https://altearius.github.io/tools/json/index.html
https://jsonhero.io/

### aframe loading
```
var scene = document.querySelector('a-scene');

if (scene.hasLoaded) {
  run();
} else {
  scene.addEventListener('loaded', run);
}

function run () {
  var entity = scene.querySelector('a-entity');
  entity.setAttribute('material', 'color', 'red');
}

<a-scene loading-screen="enabled: false"></a-scene>

```

### electron mirror
```
https://registry.npmmirror.com/binary.html?path=electron/
```

### ssh保活
```
/etc/ssh/sshd_config
ClientAliveInterval 60
ClientAliveCountMax 10

systemctl restart sshd

```

### 清空日志
```
cat /dev/null>/var/log/cron
```

# upsert mongoose
upsert的时候，default参数不工作 注意注意注意

# 代码片段

```
export const addOpacity = function (sharp: Sharp, opacity = 128): Sharp {
    return sharp.composite([{
        input: Buffer.from([255, 255, 255, opacity]),
        raw: { width: 1, height: 1, channels: 4 },
        tile: true,
        blend: 'dest-in'
    }]);
};
```

```
Remove-Item (Get-PSReadlineOption).HistorySavePath
```

```
npx uglifyjs --compress -m --output .\build\aframe.min.js .\build\aframe.js
```

### npm org
```
npm init --scope=datong
npm publish --access public
```

### xpt csv

```
https://github.com/selik/xport/issues/26
```

```python
import pandas as pd
import xport
import xport.v56

df = pd.read_csv('input.csv')
ds = xport.Dataset(df, name='SPEC', sas_os='X64_DS12', sas_version='9.4')
with open('output.xpt', 'wb') as f:
    xport.v56.dump(ds, f)

print("done")
```

```python
import pandas as pd
import xport
import xport.v56

df1 = pd.read_csv('input.csv')
df2 = pd.read_csv('input.csv')

ds1 = xport.Dataset(df1, name='SPEC1', sas_os='X64_DS12', sas_version='9.4')
ds2 = xport.Dataset(df2, name='SPEC2', sas_os='X64_DS12', sas_version='9.4')

library = xport.Library({'SPEC1': ds1, 'SPEC2': ds2})

with open('output.xpt', 'wb') as f:
    xport.v56.dump(library, f)

print("done")
```

```js
const { stringify } = require('csv-stringify')
const { promisify } = require('util')

async function toCsv({ input, columns }) {
    let csv = await promisify(stringify)(input, {
        header: true,
        columns,
    })
    return csv
}

toCsv({
    input: [
        ['1', '2', '3', '4'],
        ['a', 'b', 'c', 'd']
    ],
    columns: ['C1', 'C2', 'C3', 'C4'],
}).then((csv) => {
    console.log(csv);
}).catch((err) => {
    console.log(err);
})
```

### mongodb 查看索引创建进度
> db.adminCommand({ currentOp: true, $or: [{ op: "command", "command.createIndexes": { $exists: true }}, { op: "none", "msg": /^Index Build/ }]}).inprog[0].msg

### oss获取全部数据
```js
async function test() {
    let count = 0
    let marker
    while (true) {
        let condition = {
            prefix: 'images/',
            'max-keys': 1000,
            delimiter: '/',
        }
        if (marker) {
            condition.marker = marker
        }
        let { objects, nextMarker } = await client.list(condition)
        console.log(_.head(objects));
        count += objects.length
        marker = nextMarker
        if (!marker) {
            break
        }
    }
    console.log(count);
}
```

### getAllCookies
```js
const client = await page.target().createCDPSession();
console.log(await client.send("Network.getAllCookies"));
```

### 注意使用vue-cli打包时 
- 不要自己设置NODE_ENV=development 否则会影响打包的判断!

### glob 删除指定后缀名文件
```js
glob.sync(path + '**/*.{html,xhtml}')
glob.sync(path + '**/*.+(html|xhtml)')
glob.sync(path + '**/*.@(html|xhtml)')
```

### 安装puppeteer
```
PUPPETEER_DOWNLOAD_HOST=https://storage.googleapis.com.cnpmjs.org npm install puppeteer
```

### 避免puppeteer等有install.js重复执行的情况
```
npm install --ignore-scripts
```

### mongodb 地理 
```js
location: {
        type: {
            type: String,
            default: 'Point',
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
            index: '2dsphere'
        }
    }
```

- git commit --amend

### mongodb忘记密码之后先把授权启动关闭再操作即可

### css 绝对定位找的是祖先有position的元素去做定位元素 所以可以跳过父找父的父

### bootstrap 浮动后 row会产生边距错乱

### 响应式布局中英文详解
```
XS:extra small 加小码
S:small 小码
M:medium 中码
L:large 大码
XL:extra large 超大码
```
web boundary
```
xs = extra small < 768
sm = small >= 768
md = middle >= 992
lg = large >= 1200
xl = extra large >= 1920
```

### html识别\r\n需要在所在元素添加如下样式
white-space: pre-line;

### 乐观锁的实现 
CAS

### bintray冲突
```gradle
libraryVariants.all {
    it.generateBuildConfig.enabled = false
 }
```

### 环形队列
环形队列是解决固定长度缓冲区的通用方法

### butterknife 启示
```java
package butterknife.internal;

import android.view.View;

/**
 * A {@linkplain View.OnClickListener click listener} that debounces multiple clicks posted in the
 * same frame. A click on one button disables all buttons for that frame.
 */
public abstract class DebouncingOnClickListener implements View.OnClickListener {
  static boolean enabled = true;

  private static final Runnable ENABLE_AGAIN = new Runnable() {
    @Override public void run() {
      enabled = true;
    }
  };

  @Override public final void onClick(View v) {
    if (enabled) {
      enabled = false;
      v.post(ENABLE_AGAIN);
      doClick(v);
    }
  }

  public abstract void doClick(View v);
}
```

### git 忽略已经提交到远程的文件
```shell
git rm --cached -r dir/
```
### vscode字体 
```config
'DejaVu Sans Mono',Consolas,'Courier New', monospace, 微软雅黑
```
### css相关
- 样式改变时，顺序取结果，所有有时候没有生效请看一下样式编写的顺序
### 小程序注意事项
- canvas wx:if drawImage 会引发问题
- 弹出层注意事件不要向下传递，否则会引发性能问题
- wepy最好不要使用计算属性
### 硬件相关
- gpio
- uart
- i2c
- i2s
- Bluetooth
- zigbee
- wifi
### vscode 设置vscode默认终端所使用的shell
```json
{
    "terminal.integrated.shell.windows": "C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\powershell.exe"
}
```
### nginx http 的普通的一个配置
```nginx
server {
    listen 80;
    server_name [domain];

    location / {
        proxy_pass http://localhost:[port];
        proxy_http_version 1.1;
        proxy_set_header Host $host; # 真实的客户端域名
        proxy_set_header X-Real-IP $remote_addr; #真实的客户端IP地址 
        proxy_set_header Upgrade $http_upgrade; # websocket
        proxy_set_header Connection "upgrade"; # websocket
    }
}
```
### vue spa 的配置如下
```nginx
server {
    listen 80;
    server_name [domain];
    root [dir]/dist;
    index index.html;

    location /favicon.ico {
        root [dir]/dist;
    }

    location / {
        try_files $uri /index.html;
    }

    location = /index.html {
        expires -1;
    }
}
```

### mongodb 3.2 yum 安装 配置 repos
```yum
[MongoDB]
name=MongoDB Repository
baseurl=http://mirrors.aliyun.com/mongodb/yum/redhat/7/mongodb-org/3.2/x86_64
gpgcheck=0
enabled=1
```

### mongodb 带授权的简单配置 common config
```mongodb
systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

storage:
  dbPath: /var/lib/mongo
  journal:
    enabled: true

processManagement:
  fork: true  # fork and run in background
  pidFilePath: /var/run/mongodb/mongod.pid  # location of pidfile

net:
  port: 27017
#  bindIp: 127.0.0.1  # Listen to local interface only, comment to listen on all interfaces.

security:
  authorization: enabled
```
### http 301 to https

- http config

```nginx
server {
    listen          80;
    server_name     ithot.org;
    return 301      https://$server_name$request_uri;
}
```

- https config

```nginx
server {
    listen 443;
    server_name ithot.org;
    ssl on;
    ssl_certificate /etc/nginx/cert/214450036080552.pem;
    ssl_certificate_key /etc/nginx/cert/214450036080552.key;
    ssl_session_timeout 5m;

    location / {
        proxy_pass http://localhost:7000;
    }
}
```

- dns

| type | record | value |
| :- | :- | :- |
| A | @ | 220.181.112.244 |
| dominant url | www | https://ithot.org |


### 阿里云短信
```coffeescript
config    = require 'config'
Promise   = require 'bluebird'
AliSms    = require 'ali-sms-callback'

client = new AliSms
  AccessKeyId: '-',
  AccessKeySecret: '-'

module.exports =

  TEMPLATE:
    REGISTER: 'SMS_126865294'
    FINDBACK: 'SMS_121905212'

  sendTemplateSMS: (template, phone, vars) ->
    new Promise (resolve, reject) ->
      options =
        SignName: 'EnglishICO'
        TemplateCode: template
        TemplateParam: JSON.stringify vars
        PhoneNumbers: phone
      client.SendSms options, (err, data) ->
        if err?
          reject err
        else
          resolve data

```
### 小程序更新
app.js `onLaunch()`
```js
const manager = wx.getUpdateManager();
    manager.onCheckForUpdate(res => {
      logger.debug(res);
    });
manager.onUpdateReady(() => {
  wx.showModal({
    title: '更新提示',
    content: '新版本已经准备好，是否重启应用？',
    success(res) {
      if (res.confirm) {
        manager.applyUpdate();
      }
    }
  });
});
manager.onUpdateFailed(err => {
  logger.debug(err);
});
```
