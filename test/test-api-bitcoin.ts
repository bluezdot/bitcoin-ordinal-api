import { NewAddressParams, SignTxParams } from "@okxweb3/coin-base";
import { BtcWallet } from "@okxweb3/coin-bitcoin";
// import { getMnemonic } from "@okxweb3/coin-utils";

async function createPrivateKey() {
    let wallet = new BtcWallet();
    let privateKey = await wallet.getRandomPrivateKey();
    console.log(privateKey);
}

async function createPrivateKeyFromMnemonic() {
    let wallet = new BtcWallet()
    let mnemonic = await getMnemonic(128);
    let param = {
    mnemonic: mnemonic,
    hdPath: "m/44'/0'/0'/0/0"
    };
    let privateKey = await wallet.getDerivedPrivateKey(param);
    console.log(privateKey);
}

async function createAddressFromPrivateKey() {
    let wallet = new BtcWallet()

    // legacy address
    let params: NewAddressParams = {
    privateKey: "L22jGDH5pKE4WHb2m9r2MdiWTtGarDhTYRqMrntsjD5uCq5z9ahY"
    };
    let address = await wallet.getNewAddress(params);

    // native segwit address
    let params2: NewAddressParams = {
    privateKey: "L22jGDH5pKE4WHb2m9r2MdiWTtGarDhTYRqMrntsjD5uCq5z9ahY",
    addressType: "segwit_native",
    };
    let address2 = await wallet.getNewAddress(params2);

    // nested segwit address
    let params3: NewAddressParams = {
    privateKey: "L22jGDH5pKE4WHb2m9r2MdiWTtGarDhTYRqMrntsjD5uCq5z9ahY",
    addressType: "segwit_nested",
    };
    let address3 = await wallet.getNewAddress(params3);

    // taproot segwit address
    let params4: NewAddressParams = {
    privateKey: "L22jGDH5pKE4WHb2m9r2MdiWTtGarDhTYRqMrntsjD5uCq5z9ahY",
    addressType: "segwit_taproot",
    };
    let address4 = await wallet.getNewAddress(params4);
}

async function createAddressFromPublicKey() {
    let wallet = new BtcWallet()
    let params5 = {
    privateKey: "L22jGDH5pKE4WHb2m9r2MdiWTtGarDhTYRqMrntsjD5uCq5z9ahY",
    addressType: "segwit_taproot",
    }
    let address5 = await wallet.getAddressByPublicKey(params5);
}

async function signTransaction() {
    // TẠO INPUT, OUTPUT PARAMS
    let wallet = new BtcWallet()
    let btcTxParams = {
    inputs: [
        {
        txId: "a7edebed3f2e51a2ed99a3625fb408bd9db2ce61b1794880b3f214b26bf7a023",
        vOut: 0,
        amount: 250000
        },
    ],
    outputs: [
        {
        address: "tb1qtsq9c4fje6qsmheql8gajwtrrdrs38kdzeersc",
        amount: 150000
        },
        {
        address: "mouQtmBWDS7JnT65Grj2tPzdSmGKJgRMhE",
        amount: 50000
        },
    ],
    address: "2NF33rckfiQTiE5Guk5ufUdwms8PgmtnEdc",
    feePerB: 2
    };

    let signParams: SignTxParams = {
    privateKey: "L22jGDH5pKE4WHb2m9r2MdiWTtGarDhTYRqMrntsjD5uCq5z9ahY",
    data: btcTxParams
    };
    let tx = await wallet.signTransaction(signParams);

    // TẠO SIGN PARAMS

    // TẠO TX

    // sign tx - sign legacy ts
}

async function signLegacyTransaction() {
    let wallet = new BtcWallet()
    let btcTxParams = {
    inputs: [
        {
        txId: "1e0f92720ef34ab75eefc5d691b551fb2f783eac61503a69cdf63eb7305d2306",
        vOut: 0,
        amount: 2500000,
        address: "1GhLyRg4zzFixW3ZY5ViFzT4W5zTT9h7Pc",
        },
        {
        txId: "6a8187bcd23b820804312077d5bcfaae534bc2cf21a2e3854e558f099fa0401f",
        vOut: 1,
        amount: 2019431,
        address: "1GhLyRg4zzFixW3ZY5ViFzT4W5zTT9h7Pc",
        }
    ],
    outputs: [
        {
        address: "1GhLyRg4zzFixW3ZY5ViFzT4W5zTT9h7Pc",
        amount: 2500000
        }
    ],
    address: "1GhLyRg4zzFixW3ZY5ViFzT4W5zTT9h7Pc",
    feePerB: 2
    };

    let signParams: SignTxParams = {
    privateKey: "L22jGDH5pKE4WHb2m9r2MdiWTtGarDhTYRqMrntsjD5uCq5z9ahY",
    data: btcTxParams
    };
    let tx = await wallet.signTransaction(signParams);
}

createPrivateKeyFromMnemonic();