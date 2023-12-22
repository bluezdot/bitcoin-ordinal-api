/*

var bitcoin = require('bitcoinjs-lib')
var rp = require('request-promise');


var data = Buffer.from('Hello World', 'utf8');
var testnet=bitcoin.networks.testnet;
var privateKey='cQx4Ucd3uXEpa3bNnS1JJ84gWn5djChfChtfHSkRaDNZQYA1FYnr'
var SourceAddress="n3CKupfRCJ6Bnmr78mw9eyeszUSkfyHcPy"

var url="https://chain.so/api/v2/get_tx_unspent/BTCTEST/"+SourceAddress
var DestionationAddress ='2MsHsi4CHXsaNZSq5krnrpP4WShNgtuRa9U'
var options = {
    uri: url,
    json: true
};


rp(options).then(function (response) {
var index = response.data.txs.length - 1;

console.log(response.data.txs[index])
var UtxoId =response.data.txs[index].txid;
var vout = response.data.txs[index].output_no;
var amount=Number(response.data.txs[index].value*100000000);
var fee = 0.0005*100000000; // 0.0005 BTC

const RawTransaction = new bitcoin.TransactionBuilder(testnet)
RawTransaction.addInput(UtxoId, vout);
RawTransaction.addOutput(DestionationAddress, parseInt(amount-fee));
scrypt = bitcoin.script.compile([bitcoin.opcodes.OP_RETURN,data]);
RawTransaction.addOutput(scrypt, 0);
var keyPair = bitcoin.ECPair.fromWIF(privateKey, testnet);
RawTransaction.sign(0, keyPair)
    
// For P2SH transaction use the following code instead the previous line. Make sure that the source address is a P2SH address
// const p2wpkh = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network: bitcoin.networks.testnet })
// const p2sh = bitcoin.payments.p2sh({ redeem: p2wpkh, network: bitcoin.networks.testnet })
// RawTransaction.sign(0, keyPair, p2sh.redeem.output, null, parseInt(amount))

var Transaction=RawTransaction.build().toHex();
 

 
var Sendingoptions = {
    method: 'POST',
 url: 'https://chain.so/api/v2/send_tx/BTCTEST',

body: {tx_hex: Transaction},
  json: true
};
 
rp(Sendingoptions).then(function (response) {
 var Jresponse = JSON.stringify(response);
console.log("Transaction ID:\n"+Jresponse);

}).catch(function (err) {

console.log("err");

    }); 

}).catch(function (err) {

console.log(err);
});

 */

const bitcoin = require('bitcoinjs-lib');

// Set up the network (mainnet or testnet)
const network = bitcoin.networks.testnet;

// Create a key pair (replace with your own private key in a real scenario)
const privateKeyWIF = 'cMk7Hic4j7gQRq7DqMDV5fw8nCj1m2QJ95fcsjgBCgEvF8pDRQ68';
const keyPair = bitcoin.ECPair.fromWIF(privateKeyWIF, network);

// Create a Bitcoin address from the public key
const address = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network }).address;

// Fetch unspent transaction outputs (UTXOs) associated with the address
// In a real scenario, you would use an API like BlockExplorer or a local node.
const apiUrl = `https://api.blockcypher.com/v1/btc/test3/addrs/${address}/utxo`;
const utxoData = await fetch(apiUrl);
const utxos = await utxoData.json();

// Create a transaction builder
const txb = new bitcoin.TransactionBuilder(network);

// Add UTXOs as inputs to the transaction
utxos.forEach((utxo) => {
  txb.addInput(utxo.txid, utxo.vout);
});

// Add a simple pay-to-public-key-hash (P2PKH) output
const recipientAddress = 'mv1rnyY3su5q1i8UHxJZdwtX1YRkA16z2D'; // Replace with recipient's address
const amountToSend = 0.001; // BTC
txb.addOutput(recipientAddress, bitcoin.utils.toSatoshi(amountToSend));

// Sign the transaction with the private key
for (let i = 0; i < utxos.length; i++) {
  txb.sign(i, keyPair);
}

// Build and finalize the transaction
const tx = txb.build();
tx.finalize();

// Print the raw transaction hex
console.log('Raw Transaction:', tx.toHex());
