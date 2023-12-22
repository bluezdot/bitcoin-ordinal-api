const bitcore = require('bitcore-lib');
const explorers = require('bitcore-explorers');
// // private key: 92bbQ6VEd5cQ7Ux9rZ7PLemsR7UcgJ2u2om8Tpxm6mU6wk3wgnj
// // public key: n3R8FsKTsJKFTouifuXjRWi7W7xTywQwQW

const address = new bitcore.PrivateKey('92bbQ6VEd5cQ7Ux9rZ7PLemsR7UcgJ2u2om8Tpxm6mU6wk3wgnj').toAddress();
console.log(address.toString());

// var utxo = {
//   "txId" : "115e8f72f39fad874cfab0deed11a80f24f967a84079fb56ddf53ea02e308986",
//   "outputIndex" : 0,
//   "address" : "17XBj6iFEsf8kzDMGQk5ghZipxX49VXuaV",
//   "script" : "76a91447862fe165e6121af80d5dde1ecb478ed170565b88ac",
//   "satoshis" : 50000
// };

// var transaction = new bitcore.Transaction()
//   .from(utxo)
//   .to('1Gokm82v6DmtwKEB8AiVhm82hyFSsEvBDK', 15000)
//   .sign(privateKey);