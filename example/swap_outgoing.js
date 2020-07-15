const Env = require("./static/env").env
const kavaUtils = require("../src/utils").utils;
const KavaClient = require("../src/client").KavaClient;
const BnbApiClient = require("@binance-chain/javascript-sdk");
const bnbCrypto = BnbApiClient.crypto;

var main = async () => {
  await outgoingSwap();
}

var outgoingSwap = async () => {
  // Start new Kava client
  kavaClient = new KavaClient(Env.KavaEndpoints.Testnet);
  kavaClient.setWallet(Env.KavaAccount.Testnet.Mnemonic);
  kavaClient.setBroadcastMode("async");
  await kavaClient.initChain();

  // Start Binance Chain client
  const bnbClient = await new BnbApiClient(Env.BinanceEndpoints.Testnet);
  bnbClient.chooseNetwork("testnet");
  const privateKey = bnbCrypto.getPrivateKeyFromMnemonic(Env.BinanceAccount.Testnet.Mnemonic);
  bnbClient.setPrivateKey(privateKey);
  await bnbClient.initChain();

  // -------------------------------------------------------------------------------
  //                           Kava blockchain interaction
  // -------------------------------------------------------------------------------
  const sender = Env.KavaAccount.Testnet.Address; // user's address on Binance Chain
  const recipient = Env.KavaDeputy.Testnet; // deputy's address on kava
  const recipientOtherChain = Env.BinanceAccount.Testnet.Address; // user's address on bnbchain
  const senderOtherChain = Env.BinanceDeputy.Testnet; // deputy's address on bnbchain
  
  // Set up params
  const asset = "bnb";
  const amount = 10000000;

  const coins = kavaUtils.formatCoins(amount, asset);
  const heightSpan = "250";

  // Generate random number hash from timestamp and hex-encoded random number
  const randomNumber = kavaUtils.generateRandomNumber();
  const timestamp = Math.floor(Date.now() / 1000);
  const randomNumberHash = kavaUtils.calculateRandomNumberHash(
    randomNumber,
    timestamp
  );
  console.log("\nSecret random number:", randomNumber.toUpperCase());

  printSwapIDs(randomNumberHash, sender, senderOtherChain)

  const txHash = await kavaClient.createSwap(
    recipient,
    recipientOtherChain,
    senderOtherChain,
    randomNumberHash,
    timestamp,
    coins,
    heightSpan
  );

  console.log("\nTx hash (Create swap on Kava):", txHash);

  // Wait for deputy to see the new swap on Kava and relay it to Binance Chain
  console.log("Waiting for deputy to witness and relay the swap...")
  await sleep(45000); // 45 seconds

  // -------------------------------------------------------------------------------
  //                       Binance Chain blockchain interaction
  // -------------------------------------------------------------------------------
  //  Calculate the expected swap ID on Bnbchain
   const expectedBnbchainSwapID = kavaUtils.calculateSwapID(
    randomNumberHash,
    senderOtherChain,
    sender
  );

  const res = await bnbClient.swap.claimHTLT(Env.BinanceAccount.Testnet.Address, expectedBnbchainSwapID, randomNumber); // Binance-chain
  if (res && res.status == 200) {
    console.log(
      "Claim swap tx hash (Binance Chain): ",
      res.result[0].hash
    );
  } else {
    console.log("Tx error:", res);
    return;
  }
};

// Print swap IDs
var printSwapIDs = (randomNumberHash, sender, senderOtherChain) => {
  // Calculate the expected swap ID on origin chain
  const originChainSwapID = kavaUtils.calculateSwapID(
    randomNumberHash,
    sender,
    senderOtherChain
  );

  // Calculate the expected swap ID on destination chain
  const destChainSwapID = kavaUtils.calculateSwapID(
    randomNumberHash,
    senderOtherChain,
    sender
  );

  console.log("Expected Kava swap ID:", originChainSwapID.toUpperCase());
  console.log("Expected BnbChain swap ID:", destChainSwapID.toUpperCase());
};

// Sleep is a wait function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

main();