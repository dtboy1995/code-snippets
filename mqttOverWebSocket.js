
const aedes = require('aedes')()
const { createServer } = require('aedes-server-factory')
const port = 8000

const httpServer = createServer(aedes, {
    ws: true
})

aedes.on('clientReady', (c) => {
    console.log('clientReady');
})
aedes.on('clientDisconnect', (c) => {
    console.log('clientDisconnect');
})
// aedes.on('connectionError', (err) => {
//     console.log(err);
// })
httpServer.listen(port, function (err) {
    console.log(err);
    console.log('websocket server listening on port ', port)
})

const server = require('aedes-server-factory').createServer(aedes);

const port_ = 1883;

server.listen(port_, function () {
    console.log('server started and listening on port ', port_);
});




////////////////////////// 


var mqtt = require('mqtt')
var client = mqtt.connect('ws://localhost:8000')

client.on('connect', function () {
    console.log('xxxxxxxxx');
    client.subscribe('presence', function (err) {
        if (!err) {
            setInterval(() => {
                client.publish('presence', '我是websocket的消息')
            }, 3000)
        }
    })
})

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString())
    // client.end()
})

/////////////////////////////



var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1883')

client.on('connect', function () {
    console.log('xxxxxxxxx');
    client.subscribe('presence', function (err) {
        if (!err) {
            setInterval(() => {
                client.publish('presence', '我是tcp的消息')
            }, 3000)
        }
    })
})

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString())
    // client.end()
})

///////////////////////////////////


