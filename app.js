const express = require('express')
const app = express()
const port = 4444

const responseBody = {
    "request_id": "ab3d89e4-3231-11ed-a261-0242ac120002"
}
const responseHeaders = {}
app.post('/', (req, res) => {
    res.set('Content-Type', 'application/json')
    res.set('x-signature', 'fe845227b2a12803948a2ea3da136a16b05e7fbefb429012c5483b5cf7ce5643ef1211287b977a29afbd6d7d67aaec6eb2ac1ddc348e5a5bf04832b548acfbcb')
    res.set('x-date', '1728038932096')
    res.send(responseBody)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})