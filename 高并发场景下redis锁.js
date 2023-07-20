const Koa = require('koa')
const Redis = require('ioredis').default
const mongoose = require('mongoose')
const Router = require('@koa/router')

const redis = new Redis({
    host: 'localhost',
    port: 6379,
})

const TestSchema = new mongoose.Schema({
    name: String,
    value: Number,
})
const Test = mongoose.model('Test', TestSchema)

const app = new Koa()
const router = new Router()

router.get('/balance', async (ctx) => {
    let item = await Test.findOne()
    ctx.body = item
})

async function acquireLock(lockKey, lockValue, lockTimeout) {
    const result = await redis.set(lockKey, lockValue, 'PX', lockTimeout, 'NX');
    return result === 'OK';
}

async function releaseLock(lockKey, lockValue) {
    const script = `
    if redis.call("get", KEYS[1]) == ARGV[1] then
      return redis.call("del", KEYS[1])
    else
      return 0
    end
  `;
    const result = await redis.eval(script, 1, lockKey, lockValue);
    return result === 1;
}

const redisPrefix = 'seckill:'

router.get('/seckill', async (ctx) => {
    let productId = '1'
    let lockKey = `${redisPrefix}lock:${productId}`;
    let lockValue = 'll'
    let lockTimeout = 10000;
    const lockAcquired = await acquireLock(lockKey, lockValue, lockTimeout);
    if (lockAcquired) {
        try {
            let item = await Test.findOne()
            if (item.value) {
                await Test.findOneAndUpdate({}, { $inc: { value: -1 } })
                ctx.body = { msg: '抢购成功' }
            } else {
                ctx.body = { msg: '商品已售罄' }
            }
        } catch (err) {
            console.log(err)
            ctx.throw(401, err.message)
        } finally {
            const lockReleased = await releaseLock(lockKey, lockValue);
        }
    } else {
        ctx.body = { msg: '抢购失败' }
    }
})

app.use(router.routes())
app.use(router.allowedMethods())
let port = +process.argv[2] || 3000
app.listen(port, async () => {
    await mongoose.connect('mongodb://localhost/test1')
    // if (!await Test.findOne()) {
    //     await Test.create({
    //         name: 'A',
    //         value: 100,
    //     })
    // }
    console.log(port)
})
