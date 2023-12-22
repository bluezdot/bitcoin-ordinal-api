// // https://blog.logrocket.com/sending-bitcoin-with-javascript/
// // https://sochain.com/api/

// // private key: 92bbQ6VEd5cQ7Ux9rZ7PLemsR7UcgJ2u2om8Tpxm6mU6wk3wgnj
// // public key: n3R8FsKTsJKFTouifuXjRWi7W7xTywQwQW

const axios = require("axios");
const bitcore = require("bitcore-lib");

// // CONFIG
const sochain_network = 'BTCTEST'
const sourceAddress = 'n3R8FsKTsJKFTouifuXjRWi7W7xTywQwQW'


//  /** 
//   @receiverAddress - Address of the person you want to send bitcoin to
//   @amountToSend - This is the amount of bitcoin you want to send to someone from your wallet. This amount will be deducted from your wallet and sent to this address.
// */

// let sendBitcoin = (receiverAddress, amountToSend)=>{
//     const sochain_network = "BTCTEST"; // the Testnet network for sochain
//     const privateKey = `92bbQ6VEd5cQ7Ux9rZ7PLemsR7UcgJ2u2om8Tpxm6mU6wk3wgnj`; // your privateKey -- the one we just generated
  
//   /* your bitcoin address. The one you want to send funds from -- the one we just generated */
//     const sourceAddress = `n3R8FsKTsJKFTouifuXjRWi7W7xTywQwQW`; 
//   /**
//   because the outputs come in satoshis, and 1 Bitcoin is equal to 100,000,000 satoshies, we'll multiply the amount of bitcoin by 100,000,000 to get the value in satoshis.
//   */
//     const satoshiToSend = amountToSend * 100000000; 
//     let fee = 0; 
//     let inputCount = 0;
//     let outputCount = 2; // we are going to use 2 as the output count because we'll only send the bitcoin to 2 addresses the receiver's address and our change address.
//   }

// const utxos = await axios.get(`https://chain.so/api/v3/unspent_outputs/${sochain_network}/${sourceAddress}`);

// console.log(utxos);

const sendBitcoin = async (recieverAddress, amountToSend) => {
    const sochain_network = "BTCTEST";
    const privateKey = "";
    const sourceAddress = "";
    const satoshiToSend = amountToSend * 100000000;
    let fee = 0;
    let inputCount = 0;
    let outputCount = 2;
    const utxos = await axios.get(`https://chain.so/api/v3/unspent_outputs/${sochain_network}/${sourceAddress}`);
    const transaction = new bitcore.Transaction();
    let totalAmountAvailable = 0;
    
     let inputs = [];
     let utxos = response.data.data.txs;
  
     for (const element of utxos) {
       let utxo = {};
       utxo.satoshis = Math.floor(Number(element.value) * 100000000);
       utxo.script = element.script_hex;
       utxo.address = response.data.data.address;
       utxo.txId = element.txid;
       utxo.outputIndex = element.output_no;
       totalAmountAvailable += utxo.satoshis;
       inputCount += 1;
       inputs.push(utxo);
     }
  
    transactionSize = inputCount * 146 + outputCount * 34 + 10 - inputCount;
    // Check if we have enough funds to cover the transaction and the fees assuming we want to pay 20 satoshis per byte
  
    fee = transactionSize * 20
    if (totalAmountAvailable - satoshiToSend - fee  < 0) {
      throw new Error("Balance is too low for this transaction");
    }
  
    //Set transaction input
    transaction.from(inputs);
  
    // set the recieving address and the amount to send
    transaction.to(recieverAddress, satoshiToSend);
  
    // Set change address - Address to receive the left over funds after transfer
    transaction.change(sourceAddress);
  
     //manually set transaction fees: 20 satoshis per byte
    transaction.fee(fee);
  
    // Sign transaction with your private key
    transaction.sign(privateKey);
  
    // serialize Transactions
    const serializedTransaction = transaction.serialize();
    // Send transaction
    const result = await axios({
      method: "POST",
      url: `https://sochain.com/api/v2/send_tx/${sochain_network}`,
      data: {
        tx_hex: serializedTX,
      },
    });
    return result.data.data;
  };