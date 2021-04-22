# Kava JavaScript SDK

The Kava JavaScript SDK allows browsers and node.js clients to interact with Kava. Core functionality and query examples are in the `examples` folder.

- client - client that implements Kava transactions and messages.
- tx - Kava transaction types.
- msg - Kava message types.
- crypto - core cryptographic functions.
- utils - utility functions such as client-side secret generation.

## Installation

Install the package via npm.

```bash
npm install @kava-labs/javascript-sdk
```

## Network Information

### Mainnet

- Chain ID: kava-7
- REST API endpoint: https://api.kava.io
- Binance Chain mainnet REST API endpoint: https://dex.binance.org/


### Testnet

- Chain ID: kava-testnet-12000
- REST API endpoint: https://api.data-testnet-12000.kava.io
- Binance Chain testnet REST API endpoint: https://testnet-dex.binance.org/


### Binance Chain

- Chain ID: Binance-Chain-Tigris
- Binance Chain mainnet REST API endpoint: https://dex.binance.org/

### Deputy Addresses

**BNB**

- bnb1jh7uv2rm6339yue8k4mj9406k3509kr4wt5nxn
- kava1r4v2zdhdalfj2ydazallqvrus9fkphmglhn6u6

**BTCB**

- bnb1xz3xqf4p2ygrw9lhp5g5df4ep4nd20vsywnmpr
- kava14qsmvzprqvhwmgql9fr0u3zv9n2qla8zhnm5pc

**BUSD**

- bnb10zq89008gmedc6rrwzdfukjk94swynd7dl97w8
- kava1hh4x3a4suu5zyaeauvmv7ypf7w9llwlfufjmuu

**XRPB**

- bnb15jzuvvg2kf0fka3fl2c8rx0kc3g6wkmvsqhgnh
- kava1c0ju5vnwgpgxnrktfnkccuth9xqc68dcdpzpas


## Client Setup

The client requires an address mnemonic and the url of Kava's REST api endpoint.

```javascript
const Kava = require("@kava-labs/javascript-sdk");

var main = async () => {
  const mnemonic = "secret words that unlock a kava address";
  const testnetUrl = "https://api.data-testnet-12000.kava.io"; // testnet REST api endpoint

  // Declare a new Kava client, set wallet, and initialize
  let client = new Kava.KavaClient(testnetUrl);
  client.setWallet(mnemonic);
  client.setBroadcastMode("async");
  await client.initChain();

  // ...transfer coins, bid on an auction, create a CDP, etc.
};
```

## Client Usage

The following selected examples demonstrate basic client usage. Detailed examples can be found in the `examples` directory of the repository. It contains complete code examples for transferring funds from Binance Chain to Kava, opening a CDP, and transferring funds back to Binance Chain.

### Transfer coins

```javascript
// Import Kava and initialize client...

// Load coins and transfer to recipient's address
const coins = Kava.utils.formatCoins(1, "kava");
const recipient = "kava1c84ezutjcgrsxarjq5mzsxxz2k9znn94zxmqjz";
const txHash = await client.transfer(recipient, coins);

// Check the resulting tx hash
const txRes = await client.checkTxHash(txHash, 15000); // 15 second timeout
console.log('Tx result:', txRes.raw_log);
```

### Create CDP

Collateralized debt positions have a minimum value of 10 USD and must be overcollateralized above a certain percentage threshold. Supported collateral coin types, their supply limits, and their minimum overcollateralization ratios can be checked at https://kava3.data.kava.io/cdp/parameters.

While USDX has 6 decimals, our example collateral coin BNB has 8. We'll need to apply each asset's conversion factor before sending the transaction.

```javascript
const BNB_CONVERSION_FACTOR = 10 ** 8;
const USDX_CONVERSION_FACTOR = 10 ** 6;

// Apply conversion factor
const principalAmount = 10 * USDX_CONVERSION_FACTOR;
const collateralAmount = 2 * BNB_CONVERSION_FACTOR;

// Load principal, collateral as formatted coins and set up collateral type
const principal = Kava.utils.formatCoin(principalAmount, "usdx");
const collateral = Kava.utils.formatCoin(collateralAmount, "bnb");
const collateralType = "bnb-a";

// Send create CDP tx using Kava client
const txHashCDP = await client.createCDP(principal, collateral, collateralType);
console.log("Create CDP tx hash (Kava): ".concat(txHashCDP));

// Check the tx hash
const txRes = await client.checkTxHash(txHashCDP, 15000);
console.log('\nTx result:', txRes);
```

### Transferring funds to Kava

Kava supports secure transfers of BNB from Binance Chain to Kava and back via atomic swaps. The [bep3-deputy](https://github.com/binance-chain/bep3-deputy) process sits between the two blockchains and services swaps by relaying information back and forth.

Swaps use a simple secret sharing scheme. A secret random number is generated on the client and hashed with a timestamp in order to create a random number hash that's stored with the swap. The swap can be securely claimed on the opposite chain using the secret random number. Swaps expire after n blocks, a duration that can be modified via the height span parameter. Once expired, the swap can be refunded.

BEP3 transfer user steps
1. Create an atomic swap on Binance Chain (note: atomic swaps are called HTLTs on Binance Chain)
The deputy will automatically relay the swap from Kava to Binance Chain
2a. Claim the atomic swap on Kava within swap's height span. Users have about 30 minutes to claim a swap after it is created.
2b. Refund the atomic swap on Kava after the swap's height span - this happens if the swap is not claimed in time.

### Create swap

In order for an address to submit a swap on Kava it must hold pegged bnb tokens. The Binance Chain [docs](https://docs.binance.org/atomic-swap.html) describe how to create a swap on Binance Chain with BNB. When creating the swap on Binance Chain make sure to use the deputy's Binance Chain address as the swap's `recipient` and the deputy's Kava address as the swap's `senderOtherChain` or the deputy will not relay the swap.

Users create outgoing swaps on Kava by entering the deputy's Kava address in the recipient field. The following example is for the testnet. See full code examples for creating and claiming a swap between Kava and Binance Chain, see `incoming_swap.js` and `outgoing_swap.js` in the examples folder.

```javascript
// Import utils
const utils = kava.utils;

// Declare addresses involved in the swap
const recipient = "kava1tfvn5t8qwngqd2q427za2mel48pcus3z9u73fl"; // deputy's address on kava testnet
const recipientOtherChain = "tbnb1hc0gvpxgw78ky9ay6xfql8jw9lry9ftc5g7ddj"; // user's address on bnbchain testnet
const senderOtherChain = "tbnb1mdvtph9y0agm4nx7dcl86t7nuvt5mtcul8zld6"; // deputy's address on bnbchain testnet

// Set up swap parameters
const amount = 1000000;
const asset = "bnb";
const coins = utils.formatCoins(amount, asset);
const heightSpan = "250";

// Generate random number hash from timestamp and hex-encoded random number
const randomNumber = utils.generateRandomNumber();
const timestamp = Math.floor(Date.now() / 1000);
const randomNumberHash = utils.calculateRandomNumberHash(
  randomNumber,
  timestamp
);
console.log("\nSecret random number:", randomNumber.toUpperCase());

// Calculate the expected swap ID on Kava
const kavaSwapID = utils.calculateSwapID(
  randomNumberHash,
  client.wallet.address,
  senderOtherChain
);
console.log("Expected Kava swap ID:", kavaSwapID);

// Calculate the expected swap ID on Bnbchain
const bnbchainSwapID = utils.calculateSwapID(
    randomNumberHash,
    senderOtherChain,
    client.wallet.address
  );
console.log("Expected Bnbchain swap ID:", bnbchainSwapID);

// Create the swap
console.log("Sending createSwap transaction...");
const txHash = await client.createSwap(
  recipient,
  recipientOtherChain,
  senderOtherChain,
  randomNumberHash,
  timestamp,
  coins,
  heightSpan
);

// Check the claim tx hash
const txRes = await client.checkTxHash(txHash, 15000);
console.log('\nTx result:', txRes.raw_log);
```

Note: swap height span must be within range 220-270, you can check the current mainet BEP3 module parameters at https://kava3.data.kava.io/bep3/parameters.

### Claim swap

Only active swaps can be claimed. Anyone can send the claim request, but funds will only be released to the intended recipient if the secret random number matches the random number hash. A successful claim sends funds exclusively to the intended recipient's address.

```javascript
// Use the secret random number from swap creation
const randomNumber =
  "e8eae926261ab77d018202434791a335249b470246a7b02e28c3b2fb6ffad8f3";
const swapID =
  "e897e4ee12b4d6ec4776a5d30300a7e3bb1f62b0c49c3e05ad2e6aae1279c940";

const txHash = await client.claimSwap(swapID, randomNumber);
```

### Refund swap

Only expired swaps can be refunded. Anyone can send the refund request, but funds are always returned to the swap's original creator.

```javascript
const swapID =
  "e897e4ee12b4d6ec4776a5d30300a7e3bb1f62b0c49c3e05ad2e6aae1279c940";

const txHash = await client.refundSwap(swapID);
```

## Contributing

Kava is an open source project and contributions to the Kava JavaScript SDK are welcome. If you'd like contribute, please open an issue or pull request.
