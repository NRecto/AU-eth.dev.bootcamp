const { secp256k1: secp } = require("ethereum-cryptography/secp256k1.js");
const { toHex } = require("ethereum-cryptography/utils.js");

const privateKey = secp.utils.randomPrivateKey();

const publicKey = secp.getPublicKey(privateKey);
console.log({ privateKey: toHex(privateKey), publicKey: toHex(publicKey) });
