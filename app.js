const crypto = require('crypto-js');

const express = require('express')
const app = express()
const port = 4444

const responseBody = {
    request_id: "ab3d89e4-3231-11ed-a261-0242ac120002"
}

const signKey = "signatureKey"
const dateNow = Date.now();
const sign = signatureGenerator()
app.post('/debit/authorize', (req, res) => {
    res.header("x-signature", sign);
    res.header('x-date', dateNow)
    res.header('content-type', 'application/json')
    res.json(responseBody)
    console.log('Request POST to "/debit/authorize"')
})

app.get('/', (req, res) => {
    res.send('Hello world!');
    console.log('Request GET to "/"')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// Function for generating Signature with possibility to turn-off x-date and x-signature
function signatureGenerator(
    ts = dateNow,
    bodyRequest = responseBody,
    signatureApiKey = signKey
) {
    let msg = '';
    let header = {};

    if (bodyRequest) {
        msg = JSON.stringify(bodyRequest);
    }

    msg += ts;
    const hmac = crypto.HmacSHA512(msg, signatureApiKey);
    const encodedMsg = hmac.toString();
    return encodedMsg;
}