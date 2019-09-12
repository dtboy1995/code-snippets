const mongoose = require('mongoose')

const TestSchema = new mongoose.Schema({
    incomes: {
        type: Map,
        of: Number
    }
})

const Test = mongoose.model('Test', TestSchema)

async function test() {
    const conn = await mongoose.connect('mongodb://localhost/ccc')
    // let test = await Test.create({
    //     incomes: {
    //         '2019-12-16': 0.001
    //     }
    // })
    let test = await Test.findOne()
    // let val = test.incomes.get('2019-12-17')
    test.incomes.set('2019-12-18', 1000)
    await test.save()
    // console.log(typeof val);
    // console.log(val);
    await conn.disconnect()
}

test()

if(moment().get('hour')===9) {
    if(miner.last_alloc_date !== moment().format('YYYY-MM-DD HH')) {
        // start allocation 
        miner.last_alloc_date =moment().format('YYYY-MM-DD HH')
        await miner.save()
    }
}

if(moment(miner.started_at).add('days', project_duration).isBefore(moment()))) {
    // start return origin
    miner.status = 'END'
    await miner.save()
    await job.cancel()
}

 client.request('addnewaddr', [], '1')
{ result: '1GhZM5y37mamm5uGk453J1UoKZhNB2aftf',
  error: null,
  id: '1' }

 .request('sendfrom', ['1HKT4VKDULFprPzLJJqeaQFSTU6opBwGzs', '16BCfe2NirzFJ2YqS5yApPHNY2bxAo2FP7', 0.01], '1')

{ result:
   '240e72143a86fa9ecebfa903c6ad9505b647d4dcd9761ea43eafdd5bb6153fbc',
  error: null,
  id: '1' }

 .request('showaddrdeals', ['1HKT4VKDULFprPzLJJqeaQFSTU6opBwGzs', 20, 0], '1')

{"result":[{"balance":{"amount":0.5,"assets":[]},"myaddresses":["1HKT4VKDULFprPzLJJqeaQFSTU6opBwGzs"],"addresses":["16BCfe2NirzFJ2YqS5yApPHNY2bxAo2FP7"],"permissions":[],"items":[],"data":[],"confirmations":47797,"blockhash":"00ea9d705082b3fc4d3e8b6b3d0a03723951f5614f9493dd0c0f01aaec9a6039","blockindex":4,"blocktime":1567525022,"txid":"b7fb554834f5151edb2823d25c4b79a45c00315e63833caeb19aac30da11c660","valid":true,"time":1567525022,"timereceived":1567525023},{"balance":{"amount":-0.0101,"assets":[]},"myaddresses":["1HKT4VKDULFprPzLJJqeaQFSTU6opBwGzs"],"addresses":["16BCfe2NirzFJ2YqS5yApPHNY2bxAo2FP7"],"permissions":[],"items":[],"data":[],"confirmations":47312,"blockhash":"007e6401383c23e4036267e3ae569b45d3e0b53019bc08181057bcdaaa350736","blockindex":1,"blocktime":1567532311,"txid":"380db20bb20767620702b5b49284378d5f51dc4b1102b16e0913135b7aca868b","valid":true,"time":1567532299,"timereceived":1567532299},{"balance":{"amount":-0.013766,"assets":[]},"myaddresses":["1HKT4VKDULFprPzLJJqeaQFSTU6opBwGzs"],"addresses":["16BCfe2NirzFJ2YqS5yApPHNY2bxAo2FP7"],"permissions":[],"items":[],"data":[],"confirmations":36952,"blockhash":"00e3a488102aeec3aa713a5b56ff65c36aeacbcee7df72cc5e8aa750c2c4afbd","blockindex":1,"blocktime":1567688616,"txid":"c6060ba9a8e85e1e7b452fe95ba5d5523ec6bb41471f240a9f46919dc5cfe4a6","valid":true,"time":1567688596,"timereceived":1567688596},{"balance":{"amount":-0.0101,"assets":[]},"myaddresses":["1HKT4VKDULFprPzLJJqeaQFSTU6opBwGzs"],"addresses":["16BCfe2NirzFJ2YqS5yApPHNY2bxAo2FP7"],"permissions":[],"items":[],"data":[],"confirmations":36940,"blockhash":"002868c082f753a3a83d7b45c5e2ae2852f9511374078321621a45be5c0b2870","blockindex":6,"blocktime":1567688802,"txid":"63ad07ad27ea59c874e2c8667965c8002492ba6c7272bb5051db42ce35fdf944","valid":true,"time":1567688798,"timereceived":1567688798},{"balance":{"amount":-0.013766,"assets":[]},"myaddresses":["1HKT4VKDULFprPzLJJqeaQFSTU6opBwGzs"],"addresses":["16BCfe2NirzFJ2YqS5yApPHNY2bxAo2FP7"],"permissions":[],"items":[],"data":[],"confirmations":2,"blockhash":"00978d4a74f7d370a26d0fb044b7d8203d96081fa63dbc1021bc2b62ce5d765a","blockindex":4,"blocktime":1568246213,"txid":"240e72143a86fa9ecebfa903c6ad9505b647d4dcd9761ea43eafdd5bb6153fbc","valid":true,"time":1568246207,"timereceived":1568246207}],"error":null,"id":"1"}

 .request('showaddrbals', ['1HKT4VKDULFprPzLJJqeaQFSTU6opBwGzs'], '1')

{ result: [ { assetref: '', qty: '0.452268', raw: 452268 } ],
  error: null,
  id: '1' }
