import server from "./server";
import { secp256k1 as seph } from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  privateKey,
  setPrivateKey,
}) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);

    const publicKey = toHex(seph.getPublicKey(privateKey));
    setAddress(publicKey);

    if (publicKey) {
      const {
        data: { balance },
      } = await server.get(`balance/${publicKey}`);

      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input
          placeholder="Type an address, for example: 0x1"
          value={privateKey}
          onChange={onChange}
        ></input>
      </label>
      <p>Wallet Address: {address}</p>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
