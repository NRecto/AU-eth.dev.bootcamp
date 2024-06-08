const { secp256k1: secp } = require("ethereum-cryptography/secp256k1");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const hashMessage = require("./utils/hashMessage");
app.use(cors());
app.use(express.json());

const balances = {
  "02ca7a9b46fdfde00b49e89388ca9903b8c2229e9e48f26e4330d81d6872ea2009": 100, // 1068772156ca08de05cef9122ae2c936257bd7886df30cc99afd547ecbb28c54
  "035a71d6430f4b9c2f64331aa8bb505cc157fc13983e78f5e021b9134310f854f8": 50, // 9fcee683f096f0c4dd273b3680a5875ccab357f3c7285b4985f1f436db77c56b
  "025fbc5c98920246e2e9e05accaa69f9164da5500cddde4ea21ad0b162e9877c2d": 75, // d6a6c00bf4a84b197c554edbad91d5348f0b0d30c7ccee3dcf94a6a2e59512fd
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { signature, sender, recipient, amount } = req.body;
  const { r, s, recovery } = signature;

  if (amount < 0 || amount == "" || !amount)
    res.status(400).send({ message: "Please input a valid Amount!" });

  const newSig = {
    r: BigInt(r),
    s: BigInt(s),
    recovery,
  };
  const exist = balances[recipient];
  if (!exist) res.status(400).send({ message: "Recipient does not exist!" });

  if (
    !secp.verify(
      newSig,
      hashMessage("EITHER USER GENERATED / VENDOR GENERATED"),
      sender
    )
  )
    res.status(400).send({ message: "Invalid Signature." });

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
