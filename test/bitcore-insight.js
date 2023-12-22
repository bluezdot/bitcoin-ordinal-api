// https://www.linkedin.com/pulse/how-create-bitcoin-transactions-javascript-claudio-atilano/

const bitcore = require('bitcore-lib');
const Insight = require('bitcore-insight').Insight;


// Step 1: Create private key 

let insight = new Insight('testnet');

// randomly
const privateKey = new bitcore.PrivateKey();

// sha256 hash
// let value = Buffer.from('cat horse shoe lightning awesome bitcoin');
// let hash = bitcore.crypto.Hash.sha256(value);
// let bn = bitcore.crypto.BN.fromBuffer(hash);
// const privateKey = new bitcore.PrivateKey(bn);

// import from wif
// const wif = 'xBtatQED9H44gCmp6HAdmemAzU3n84H3dGkuWTKvE23JgHMW8gct';
// const privateKey = new bitcore.PrivateKey(wif);


// Step 2: Get testnet coins from faucet
const myAddress = privateKey.toPublicKey();
console.log(privateKey.toString());
// log publickey
// console.log(privateKey.toPublicKey());

// const bitcore = require('bitcore-lib');
// const Insight = require('bitcore-insight').Insight;

// let insight = new Insight('testnet');

// // Our private key and address
// const wif = 'xBtatQED9H44gCmp6HAdmemAzU3n84H3dGkuWTKvE23JgHMW8gct';
// const privateKey = new bitcore.PrivateKey(wif, insight);
// const myAddress = privateKey.toAddress();
// console.log(myAddress.toString());
// // Address we are sending Bitcoin to
// const addressTo = 'moCEHE5fJgb6yHtF9eLNnS52UQVUkHjnNm';

// // Start the creating our transaction
// const amount = 50000; // Sending amount must be in satoshis
// const fee = 50000; // Fee is in satoshis

// // Get the UTXOs of your Bitcoin address
// insight.getUtxos(myAddress, (err, utxos) => {
//         if(err){ 
//           //Handle errors
//           return err;
//         }else { 
//             // Use the UTXOs to create transaction with a
//             // bitcore Transaction object
//             let tx = bitcore.Transaction();
//             tx.from(utxos);
//             tx.to(addressTo, amount);
//             tx.change(myAddress);
//             tx.fee(fee);
//             tx.sign(privateKey);
//             tx.serialize();
            
//             // Broadcast your transaction to the Bitcoin network
//             insight.broadcast(tx.toString(), (error, txid) => {
//                 if (error) {
//                     return error;
//                 } else {
//                   // Your Transaction Id
//                     console.log(txid)
//                 }
//             })
//         }
//     });