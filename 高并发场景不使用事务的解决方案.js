const Bull = require('bull')
const Koa = require('koa')
const mongoose = require('mongoose')
const Router = require('@koa/router')

const TestSchema = new mongoose.Schema({
    name: String,
    value: Number,
})

const Test = mongoose.model('Test', TestSchema)

let queue = new Bull('Test')

let app = new Koa()

queue.process(async (job) => {
    let { } = job.data
    let item = await Test.findOne()
    if (item.value) {
        await Test.findOneAndUpdate({}, { $inc: { value: -1 } })
        return { success: true }
    }
    return { success: false }
})

const router = new Router()

router.get('/balance', async (ctx) => {
    let item = await Test.findOne()
    ctx.body = item
})

router.post('/inc', async (ctx) => {
    let job = await queue.add({})
    let item = await job.finished()
    ctx.body = item
})


router.post('/inc_', async (ctx) => {
    let item = await Test.findOne()
    if (item.value) {
        await Test.findOneAndUpdate({}, { $inc: { value: -1 } })
        ctx.body = { success: true }
    } else {
        ctx.body = { success: false }
    }
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, async () => {
    await mongoose.connect('mongodb://localhost/test1')
    if (!await Test.findOne()) {
        await Test.create({
            name: 'A',
            value: 100,
        })
    }
    console.log(3000)
})

const _ = require('lodash')
const request = require('request-promise')

async function req() {
    let x = await request.post('http://localhost:3000/inc')
    console.log(x)
}

async function test() {
    let promises = []
    for (let i = 0; i < 200; i++) {
        promises.push(1)
    }
    await Promise.all(promises.map(async (ctx) => {
        await req()
    }))
}

test()
