const _ = require("lodash");
const BnbApiClient = require("@binance-chain/javascript-sdk");
const bnbCrypto = BnbApiClient.crypto;

const kavaUtils = require("../src/utils").utils;
const KavaClient = require("../src/client").KavaClient;

const BINANCE_CHAIN_API_TESTNET = "https://testnet-dex.binance.org";
const BINANCE_CHAIN_DEPUTY = "tbnb10uypsspvl6jlxcx5xse02pag39l8xpe7a3468h";
const bnbAddress = "tbnb17vwyu8npjj5pywh3keq2lm7d4v76n434pwd8av";
const bnbMnemonic =
  "lawsuit margin siege phrase fabric matrix like picnic day thrive correct velvet stool type broom upon flee fee ten senior install wrestle soap sick";

const KAVA_API_TESTNET_6000_INTERNAL = "http://54.196.2.124:1317";
const KAVA_DEPUTY = "kava1aphsdnz5hu2t5ty2au6znprug5kx3zpy6zwq29";
const kavaAddress = "kava1g0qywkx6mt5jmvefv6hs7c7h333qas5ks63a6t";
const kavaMnemonic =
  "lecture draw addict sea prefer erupt army someone album liquid sadness manual fence vintage obey shrimp figure retreat kick refuse verify alien east brand";

const BNB_CONVERSION_FACTOR = 10 ** 8;

var main = async () => {
  console.log("Sending from Bnbchain -> Kava...")
  await incomingSwap()
}

var incomingSwap = async () => {
  // Start new Kava client
  kavaClient = new KavaClient(KAVA_API_TESTNET_6000_INTERNAL);
  kavaClient.setWallet(kavaMnemonic);
  await kavaClient.initChain();

  // Start Binance Chain client
  const bnbClient = await new BnbApiClient(BINANCE_CHAIN_API_TESTNET);
  bnbClient.chooseNetwork("testnet");
  const privateKey = bnbCrypto.getPrivateKeyFromMnemonic(bnbMnemonic);
  bnbClient.setPrivateKey(privateKey);
  await bnbClient.initChain();

  // -------------------------------------------------------------------------------
  //                       Binance Chain blockchain interaction
  // -------------------------------------------------------------------------------
  // Assets involved in the swap
  const asset = "BNB";
  const amount = 1 * BNB_CONVERSION_FACTOR;

  // Addresses involved in the swap
  const sender = bnbAddress; // user's address on Binance Chain
  const recipient = BINANCE_CHAIN_DEPUTY; // deputy's address on Binance Chain
  const senderOtherChain = KAVA_DEPUTY; // deputy's address on Kava
  const recipientOtherChain = kavaAddress; // user's address on Kava

  // Format asset/amount parameters as tokens, expectedIncome
  const tokens = [
    {
      denom: asset,
      amount: amount
    }
  ];
  const expectedIncome = [String(amount), ":", asset].join("");

  // Number of blocks that swap will be active
  const heightSpan = 10005;

  // Generate random number hash from timestamp and hex-encoded random number
  const randomNumber = kavaUtils.generateRandomNumber();
  const timestamp = Math.floor(Date.now() / 1000);
  const randomNumberHash = kavaUtils.calculateRandomNumberHash(
    randomNumber,
    timestamp
  );
  console.log("Secret random number:", randomNumber);

  printSwapIDs(randomNumberHash, sender, senderOtherChain)

  // Send create swap tx using Binance Chain client
  const res = await bnbClient.swap.HTLT(
    sender,
    recipient,
    recipientOtherChain,
    senderOtherChain,
    randomNumberHash,
    timestamp,
    tokens,
    expectedIncome,
    heightSpan,
    true
  );

  if (res && res.status == 200) {
    console.log(
      "Create swap tx hash (Binance Chain): ",
      res.result[0].hash,
      "\n"
    );
  } else {
    console.log("Tx error:", res);
    return;
  }

  // Wait for deputy to see the new swap on Binance Chain and relay it to Kava
  await sleep(30000); // 30 seconds

  // -------------------------------------------------------------------------------
  //                           Kava blockchain interaction
  // -------------------------------------------------------------------------------
   // Calculate the expected swap ID on Kava
   const expectedKavaSwapID = kavaUtils.calculateSwapID(
    randomNumberHash,
    senderOtherChain,
    sender
  );

  // Send claim swap tx using Kava client
  const txHashClaim = await kavaClient.claimSwap(
    expectedKavaSwapID,
    randomNumber
  );
  console.log("Claim swap tx hash (Kava): ".concat(txHashClaim));
}

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

  console.log("Expected origin chain swap ID:", originChainSwapID);
  console.log("Expected destination chain swap ID:", destChainSwapID);
};

// Sleep is a wait function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

main();