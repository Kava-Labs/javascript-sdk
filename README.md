# Kava JavaScript SDK

The Kava JavaScript SDK allows browsers and node.js clients to interact with Kava.

client - contains implementations of Kava transactions and messages
tx - Kava transaction types.
msg - Kava msg types.
crypto - core cryptographic functions.
utils - utility functions such as client-side secret generation

# Installation

Install dependencies via npm

```bash
npm install
```

# Example

```javascript
const KavaClient = require("./client").KavaClient;

var main = async () => {
  // Set up wallet mnemonic and rest endpoint
  const mnemonic = "secret words that unlock a kava address";
  const testnetURL = "http://54.196.2.124:1317"; // kava-testnet-5000 endpoint
  const localURL = "http://localhost:1317"; // local testing endpoint

  // Declare a new Kava client, set wallet, and initialize chain
  client = new KavaClient(testnetURL);
  client.setWallet(mnemonic);
  await client.initChain();

  // Transfer funds to a user
  const recipient = "kava1c84ezutjcgrsxarjq5mzsxxz2k9znn94zxmqjz";
  const asset = "kava";
  const amount = "1";
  const txHash = await client.transfer(recipient, asset, amount);

  // Check the resulting tx hash
  console.log(txHash);
};

main();
```

# Contributing

Kava is an open source project and contributions to the Kava JavaScript SDK are welcome. If you'd like contribute, please open an issue or pull request.
