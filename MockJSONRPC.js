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

accounts.db
{"address":"NTcyZDgwY2ItNmNiMS00ZmU1LWFlYjMtMTcxO","balance":500,"_id":"thaKcv9CdcwDG1m5","createdAt":{"$$date":1568282829580},"updatedAt":{"$$date":1568282829580}}
{"address":"OWZhNmMyNzYtYWU1YS00NzJkLTg4NmQtMDM1N","balance":500,"_id":"0Tou3iC43DlYghJX","createdAt":{"$$date":1568282829593},"updatedAt":{"$$date":1568282829593}}
{"address":"NzRjODY0ZDItZTU0My00Zjg0LWEwMzEtY2JmZ","balance":500,"_id":"yfXtcenn533ihXAX","createdAt":{"$$date":1568282829595},"updatedAt":{"$$date":1568282829595}}
{"address":"ZGU4NDcyZWMtMTkyOS00NWVjLTkxZTQtZDZkZ","balance":500,"_id":"js2liOEU0krWlxks","createdAt":{"$$date":1568282829597},"updatedAt":{"$$date":1568282829597}}
{"address":"ODVjMDVhNjQtMWRjYy00ZGQxLTkwZGEtMDBjY","balance":500,"_id":"X6Ozwi8v3gQFxmSn","createdAt":{"$$date":1568282829606},"updatedAt":{"$$date":1568282829606}}
{"address":"YjZkMzQ4ZWQtOTY4ZC00M2QzLTgzMmItYmE4Y","balance":500,"_id":"0NgACSVLmq7Ib82R","createdAt":{"$$date":1568282829613},"updatedAt":{"$$date":1568282829613}}
{"address":"NTNkNWY0Y2UtNzljYy00ODBmLTk0ODYtNjA3O","balance":500,"_id":"i01gdjiYKilvq7kW","createdAt":{"$$date":1568282829614},"updatedAt":{"$$date":1568282829614}}
{"address":"NzEyYjQ4OWItNmUwMS00ZTUwLTljMDgtMTJmN","balance":500,"_id":"MLFQaXgeUfCVlZRJ","createdAt":{"$$date":1568282829619},"updatedAt":{"$$date":1568282829619}}
{"address":"MDgyNWRmM2YtYmFjOS00ZmM1LTkxNjItYjJhZ","balance":500,"_id":"qzv2GcTq1k4KBuHz","createdAt":{"$$date":1568282829621},"updatedAt":{"$$date":1568282829621}}
{"address":"OGI3MDEyMDktZDcxYi00MTNkLWJhMjgtNDYwY","balance":500,"_id":"zXD7ooZEfXdjszus","createdAt":{"$$date":1568282829626},"updatedAt":{"$$date":1568282829626}}
{"address":"NDQ0MWFmNmQtMDlhOC00OWZiLWE5M2UtYzIzM","balance":500,"_id":"vqJNxl4t3y65zDMy","createdAt":{"$$date":1568282829632},"updatedAt":{"$$date":1568282829632}}
{"address":"MDY3NTYzZTItNTI3NC00ODJjLTg5NzAtMjhjY","balance":500,"_id":"VlSPJkvEZYT9I3C6","createdAt":{"$$date":1568282829638},"updatedAt":{"$$date":1568282829638}}
{"address":"NzU2YWMyOGUtMWNlZS00NjlmLThmYWEtOTgxM","balance":500,"_id":"TITUfa4CReogLr0Q","createdAt":{"$$date":1568282829639},"updatedAt":{"$$date":1568282829639}}
{"address":"YzFjZWIwZmItMWU2Ny00MDBlLTk4ZDItZWUwM","balance":500,"_id":"VWldRzxHyTUXMYRz","createdAt":{"$$date":1568282829644},"updatedAt":{"$$date":1568282829644}}
{"address":"ZWY3ZTljZjgtODJiYS00YmI0LWFmNjQtYWU4O","balance":500,"_id":"dJGEgUUDLdqe48XT","createdAt":{"$$date":1568282829650},"updatedAt":{"$$date":1568282829650}}
{"address":"ODAwZjEzODEtYmVkNy00YTQ5LTgxNjItYjYyM","balance":500,"_id":"fQK3n5BaZC6eM9Eh","createdAt":{"$$date":1568282829651},"updatedAt":{"$$date":1568282829651}}
{"address":"N2EyYzQxNjktMTUxOS00MTc4LWFhM2QtN2RlZ","balance":500,"_id":"y2aqe8hyYr7caKf8","createdAt":{"$$date":1568282829656},"updatedAt":{"$$date":1568282829656}}
{"address":"YTA1NGUyNzUtYWIzYi00ZTBmLTg3NzItYTY3Z","balance":0,"miner":true,"_id":"ouFp0GVbHM1YANWd","createdAt":{"$$date":1568282829657},"updatedAt":{"$$date":1568282829657}}
{"address":"MDUwM2Y0MzctZmU2OC00NjJhLTgyOWUtNDFiY","balance":1000,"system":true,"_id":"sAbElA3lpOw3F6EN","createdAt":{"$$date":1568282829662},"updatedAt":{"$$date":1568282829662}}
{"address":"NjMxODBiZTktNTYyMi00OTdhLTkzYjctZTVhM","balance":1000,"system":true,"_id":"8xSm5sq3d3RzBpiu","createdAt":{"$$date":1568282829663},"updatedAt":{"$$date":1568282829663}}
