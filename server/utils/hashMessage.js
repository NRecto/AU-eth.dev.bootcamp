const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");

function hashMessage(message) {
  const bytes = utf8ToBytes(message);
  return toHex(keccak256(bytes));
}

module.exports = hashMessage;
