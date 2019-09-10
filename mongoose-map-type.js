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
