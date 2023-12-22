const bitcoin = require('bitcoinjs-lib');

const TESTNET = bitcoin.networks.testnet;
const keyPair = bitcoin.ECPair
console.log(keyPair);

// const { address } = bitcoin.payments.p2pkh({
//    pubkey: keyPair.publicKey,
//    network: TESTNET,
// });;
// let wif = keyPair.toWIF()
// console.log(address, keyPair.publicKey.toString('hex') , keyPair.privateKey.toString('hex') , wif);

// let fkeyPair = bitcoin.ECPair.fromWIF(fwif , TESTNET);
// const result = await axios.get(`https://testnet.blockchain.info/rawaddr/${fAddress}`);
// let balance = result.data.final_balance;
// let latestTx = result.data.txs[0].hash;
// console.log('testAddress balance:' , balance);
// console.log('latest tx: ', latestTx);
// var txb = new bitcoin.TransactionBuilder(bitcoin.networks.testnet);
// let sendAmount = 15000;
// let fee = 26456;
// let whatIsLeft = balance - fee - sendAmount;
// txb.addInput(latestTx, 1);
// txb.addOutput(f2Address, sendAmount);
// txb.addOutput(f2Address, whatIsLeft);
// txb.sign(0, fkeyPair);
// let body = txb.build().toHex();
// console.log(body);