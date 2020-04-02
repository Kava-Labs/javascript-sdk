# Kava JavaScript SDK

The Kava JavaScript SDK allows browsers and node.js clients to interact with Kava.

- client - client that implements Kava transactions and messages.
- tx - Kava transaction types.
- msg - Kava message types.
- crypto - core cryptographic functions.
- utils - utility functions such as client-side secret generation.

# Installation

Install the package via npm.

```bash
npm install @kava-labs/javascript-sdk
```

# Client setup

The client requires an address mnemonic and the url of a Kava api endpoint.

```javascript
const kava = require("@kava-labs/javascript-sdk");
const KavaClient = kava.KavaClient;

var main = async () => {
  const mnemonic = "secret words that unlock a kava address";
  const testnetURL = "http://3.216.191.96:1317"; // kava-testnet-5000 endpoint
  const localURL = "http://localhost:1317"; // local testing endpoint

  // Declare a new Kava client, set wallet, and initialize chain
  client = new KavaClient(testnetURL);
  client.setWallet(mnemonic);
  await client.initChain();

  // ...transfer coins, bid on an auction, create a CDP, etc.
};
```

## Testnet-5000 key information

Testnet-5000 introduces support for cross-chain transfers between Binance Chain and Kava.

- Kava's official testnet-5000 api endpoint is http://3.216.191.96:1317.
- The deputy's address on Kava is **kava1aphsdnz5hu2t5ty2au6znprug5kx3zpy6zwq29**.
- The deputy's address on the Binance Chain testnet is **tbnb1et8vmd0dgvswjnyaf73ez8ye0jehc8a7t7fljv**.

# Examples

The following examples demonstrate client usage.

## Transfer coins

```javascript
const utils = kava.utils;

// Load coins and transfer to recipient's address
const coins = utils.loadCoins("kava", 1);
const recipient = "kava1c84ezutjcgrsxarjq5mzsxxz2k9znn94zxmqjz";
const txHash = await client.transfer(recipient, coins);

// Check the resulting tx hash
console.log("Tx hash:", txHash);
```

## Swaps

Kava's testnet-5000 supports secure transfers of BNB from Binance Chain to Kava and back via swaps. The [bep3-deputy](https://github.com/binance-chain/bep3-deputy) process sits between the two blockchains and services swaps by relaying information back and forth.

Swaps use a simple secret sharing scheme. A secret random number is generated on the client and hashed with a timestamp in order to create a random number hash that's stored with the swap. The swap can be securely claimed on the opposite chain using the secret random number. Swaps expire after n blocks, a duration that can be modified via the height span parameter. Once expired, the swap can be refunded.

## Create swap

In order for an address to submit a swap on Kava it must hold pegged bnb tokens. The Binance Chain [docs](https://docs.binance.org/atomic-swap.html) describe how to create a swap on Binance Chain with BNB. Make sure to use the deputy's address as the swap's the deputy will not relay the swap.

Users create outgoing swaps on Kava by entering the deputy's Kava address in the recipient field. The deputy's address on kava-testnet-5000 is **kava1aphsdnz5hu2t5ty2au6znprug5kx3zpy6zwq29**.

```javascript
// Import utils
const utils = kava.utils;

const recipient = "kava1aphsdnz5hu2t5ty2au6znprug5kx3zpy6zwq29"; // deputy's address on kava
const recipientOtherChain = "tbnb17vwyu8npjj5pywh3keq2lm7d4v76n434pwd8av"; // user's address on bnbchain
const senderOtherChain = "tbnb1et8vmd0dgvswjnyaf73ez8ye0jehc8a7t7fljv"; // deputy's address on bnbchain

// Load coins and expected income
const asset = "bnb";
const amount = 1.75;
const coins = utils.loadCoins(asset, amount);
const expectedIncome = String(coins[0].amount).concat(coins[0].denom);

// Set up additional required params
const heightSpan = "500";
const crossChain = true;

// Generate random number hash from timestamp and hex-encoded random number
const randomNumber = utils.generateRandomNumber();
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
```

## Claim swap

Only active swaps can be claimed. Anyone can send the claim request, but funds will only be released to the intended recipient if the secret random number matches the random number hash. A successful claim sends funds exclusively to the intended recipient's address.

```javascript
// Use the secret random number from swap creation
const randomNumber =
  "e8eae926261ab77d018202434791a335249b470246a7b02e28c3b2fb6ffad8f3";
const swapID =
  "e897e4ee12b4d6ec4776a5d30300a7e3bb1f62b0c49c3e05ad2e6aae1279c940";

const txHash = await client.claimSwap(randomNumber, swapID);
```

## Refund swap

Only expired swaps can be refunded. Anyone can send the refund request, but funds are always returned to the swap's original creator.

```javascript
const swapID =
  "e897e4ee12b4d6ec4776a5d30300a7e3bb1f62b0c49c3e05ad2e6aae1279c940";

const txHash = await client.refundSwap(swapID);
```

# Contributing

Kava is an open source project and contributions to the Kava JavaScript SDK are welcome. If you'd like contribute, please open an issue or pull request.
