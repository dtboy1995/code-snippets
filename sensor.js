const SerialPort = require('serialport')
const moment = require('moment')
const fs = require('fs')

const port = new SerialPort('COM4', {
    baudRate: 9600
})

let timer = 0
let flag = true

port.on('data', (data) => {
    let val = (data[4] * 256 + data[5]) / 1000
    if (Date.now() - timer > 30 * 1000) {
        if (flag) {
            fs.appendFile('_log/y.json', `${val}`, () => { })
            fs.appendFile('_log/x.json', `${moment().format('HH:mm')}`, () => { })
            flag = false
        } else {
            fs.appendFile('_log/y.json', `,${val}`, () => { })
            fs.appendFile('_log/x.json', `,${moment().format('HH:mm')}`, () => { })
        }
        timer = Date.now()
    }
})
