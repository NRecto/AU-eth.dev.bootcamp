const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
  // TODO: how do we prove to the server we're on the nice list?

  const idx = Math.floor(Math.random() * (niceList.length - 0) + 0);
  const name = niceList[idx];
  const merkleTree = new MerkleTree(niceList);
  const root = merkleTree.getRoot();
  const proof = merkleTree.getProof(idx);
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    proof,
    name,
    root,
  });

  console.log({ gift });
}

main();
