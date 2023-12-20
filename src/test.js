"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var constant_ts_1 = require("/Users/truong/alone/bitcoin-ordinal-api/constant.ts");
var TEST_ADDRESS = 'bc1q8cpn3zl6lz5xrxdqgx7j68ggcpjm7ctzyds82c';
function getBalances(address) {
    var config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: constant_ts_1.HIRO_APIs.list_of_incriptions + "?".concat(address),
        headers: {
            'Accept': 'application/json'
        }
    };
    axios_1.default.request(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
        .catch(function (error) {
        console.log(error);
    });
}
