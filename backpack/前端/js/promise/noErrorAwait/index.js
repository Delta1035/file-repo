// 标识每次请求的成功与否(吉林-山东、山东-云南、云南-海南)
const interface = [true, false, true];
// 查询 吉林-山东 的车票是否已售空的接口
const requestJS = () => new Promise((res, rej) => {
    setTimeout(() => {
        // 请求成功(resolve)则代表车票未售空
        if (interface[0]) return res({ ticket: true, price: 530, destination: '吉林-山东' })
        // 请求成功(rejected)则代表车票已售空
        rej({ ticket: false, destination: '吉林-山东' })
    }, 1000)
})
// 查询 山东-云南 的车票是否已售空的接口
const requestSY = () => new Promise((res, rej) => {
    setTimeout(() => {
        if (interface[1]) return res({ ticket: true, price: 820, destination: '山东-云南' })
        rej({ ticket: false, destination: '山东-云南' })
    }, 1500)
})
// 查询 云南-海南 的车票是否已售空的接口
const requestYH = () => new Promise((res, rej) => {
    setTimeout(() => {
        if (interface[2]) return res({ ticket: true, price: 1500, destination: '云南-海南' })
        rej({ ticket: false, destination: '云南-海南' })
    }, 2000)
})
// 存储每次的请求结果
const result = []
const callback = (...args) => console.log('某个请求出错了，前面收到的结果是', ...args)
const noErrorAwait = async f => {
    try {
        const r = await f()
        const args = {flag: true, data: r}
        result.push(args)
        generator.next(args)
    } catch (e) {
        const args = {flag: false, data: e}
        result.push(args)
        callback(result)
        return args
    }
}

const getInfo = function* () {
    const js = yield noErrorAwait(requestJS)
    console.log(`吉林-山东的车票未售空，价格是 ${js.data.price} RMB`)
    const sy = yield noErrorAwait(requestSY)
    console.log(`山东-云南的车票未售空，价格是 ${sy.data.price} RMB`)
    const yh = yield noErrorAwait(requestYH)
    console.log(`云南-海南的车票未售空，价格是 ${yh.data.price} RMB`)
    console.log(`本次旅途共计车费 ${js.data.price + sy.data.price + yh.data.price}`)
}

const generator = getInfo();

generator.next()

//github.com/FuncJin/combine-async-error