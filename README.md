# Kava JavaScript SDK

The Kava JavaScript SDK allows browsers and node.js clients to interact with Kava.

client - client that implements Kava transactions and messages.
tx - Kava transaction types.
msg - Kava message types.
crypto - core cryptographic functions.
utils - utility functions such as client-side secret generation

# Installation

Install dependencies via npm.

```bash
npm install
```

# Examples

The following examples demonstrate client initialization and usage.

## Client setup

```javascript
const KavaClient = require("./client").KavaClient;

var main = async () => {
  // Set up wallet mnemonic
  const mnemonic = "secret words that unlock a kava address";
  // Set up rest endpoint
  const testnetURL = "http://54.196.2.124:1317"; // kava-testnet-5000 endpoint
  const localURL = "http://localhost:1317"; // local testing endpoint

  // Declare a new Kava client, set wallet, and initialize chain
  client = new KavaClient(testnetURL);
  client.setWallet(mnemonic);
  await client.initChain();

  // ...transfer coins, bid on an auction, create a CDP, etc.
};
```

## Transfer coins

```javascript
// Import utils
const utils = require("./utils").utils;

// Load coins and transfer to recipient's address
const coins = utils.loadCoins("kava", 1);
const recipient = "kava1c84ezutjcgrsxarjq5mzsxxz2k9znn94zxmqjz";
const txHash = await client.transfer(recipient, coins);

// Check the resulting tx hash
console.log("Tx hash:", txHash);
```

## Create swap

```javascript
// Import utils
const utils = require("./utils").utils;

const recipient = "kava1vry5lhegzlulehuutcr7nmdlmktw88awp0a39p"; // user's address on kava
const recipientOtherChain = "tbnb17vwyu8npjj5pywh3keq2lm7d4v76n434pwd8av"; // user's address on bnbchain
const senderOtherChain = "tbnb10uypsspvl6jlxcx5xse02pag39l8xpe7a3468h"; // deputy's address on bnbchain

// Load coins and expected income
const asset = "bnb";
const amount = 1.75;
const coins = utils.loadCoins(asset, amount);
const expectedIncome = String(coins[0].amount).concat(coins[0].denom);

// Set up additional required params
const heightSpan = "500";
const crossChain = true;

// Generate random number hash from timestamp and hex-encoded random number
const randomNumber =
  "e8eae926261ab77d018202434791a335249b470246a7b02e28c3b2fb6ffad8f3";
const timestamp = Math.floor(Date.now() / 1000);
const randomNumberHash = utils.calculateRandomNumberHash(
  randomNumber,
  timestamp
);
console.log("Random number:", randomNumber);
console.log("Timestamp:", timestamp);
console.log("Random number hash:", randomNumberHash, "\n");

// Calculate the expected swap ID
const swapID = utils.calculateSwapID(
  randomNumberHash,
  client.wallet.address,
  senderOtherChain
);
console.log("Expected swap ID:", swapID, "\n");

// Create the swap
const txHash = await client.createSwap(
  recipient,
  recipientOtherChain,
  senderOtherChain,
  randomNumberHash,
  timestamp,
  coins,
  expectedIncome,
  heightSpan,
  crossChain
);

// Check the resulting tx hash
console.log("Tx hash:", txHash);
```

# Contributing

Kava is an open source project and contributions to the Kava JavaScript SDK are welcome. If you'd like contribute, please open an issue or pull request.
