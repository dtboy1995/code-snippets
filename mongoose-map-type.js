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
