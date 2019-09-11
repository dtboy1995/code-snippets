const DataStore = require('nedb-promises')
const db = {
    accounts: DataStore.create({
        timestampData: true,
        filename: `${__dirname}/accounts.db`,
        autoload: true
    })
}

// // MockRPC
// const BALS = [{
//     qty: "0",
//     raw: 0
// }]

// async function mockJSONRPC(method, params, id) {
//     if (method == 'showaddrbals') {
//         return { result: BALS }
//     }
//     if (method == 'showaddrdeals') {

//     }
//     if (method == 'sendfrom') {

//     }
// }
