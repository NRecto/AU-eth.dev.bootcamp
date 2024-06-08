import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils";

function hashMessage(message) {
  const bytes = utf8ToBytes(message);
  return toHex(keccak256(bytes));
}

export default hashMessage;
