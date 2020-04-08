const SHA256 = require("crypto-js/sha256");
const hexEncoding = require("crypto-js/enc-hex");
const Big = require("big.js");
const cryptoRand = require("crypto");
const crypto = require("../crypto").crypto;

const RandomNumberLength = 64;

// Precision is relative to KAVA or 10**6
const precision = {
  kava: 1,
  ukava: Math.pow(10, 6),
  usdx: 1,
  bnb: Math.pow(10, 2)
};

/**
 * Computes a single SHA256 digest.
 * @param {string} hex message to hash
 * @returns {string} hash output
 */
const sha256 = hex => {
  if (typeof hex !== "string") throw new Error("sha256 expects a hex string");
  if (hex.length % 2 !== 0)
    throw new Error(`invalid hex string length: ${hex}`);
  const hexEncoded = hexEncoding.parse(hex);
  return SHA256(hexEncoded).toString();
};

/**
 * Generates a hex-encoded 256-bit random number
 * @returns {string} the hex-encoded number
 */
const generateRandomNumber = () => {
  return cryptoRand
    .randomBytes(Math.ceil(RandomNumberLength / 2))
    .toString("hex")
    .slice(0, RandomNumberLength);
};

/**
 * Computes sha256 of random number and timestamp
 * @param {String} randomNumber
 * @param {Number} timestamp
 * @returns {string} sha256 result
 */
const calculateRandomNumberHash = (randomNumber, timestamp) => {
  const timestampHexStr = timestamp.toString(16);
  let timestampHexStrFormat = timestampHexStr;
  for (let i = 0; i < 16 - timestampHexStr.length; i++) {
    timestampHexStrFormat = "0" + timestampHexStrFormat;
  }
  const timestampBytes = Buffer.from(timestampHexStrFormat, "hex");
  const newBuffer = Buffer.concat([
    Buffer.from(randomNumber, "hex"),
    timestampBytes
  ]);
  return sha256(newBuffer.toString("hex"));
};

/**
 * Computes swapID
 * @param {String} randomNumberHash
 * @param {String} sender
 * @param {String} senderOtherChain
 * @returns {string} sha256 result
 */
const calculateSwapID = (randomNumberHash, sender, senderOtherChain) => {
  const randomNumberHashBytes = Buffer.from(randomNumberHash, "hex");
  const senderBytes = crypto.decodeAddress(sender);
  const sendOtherChainBytes = Buffer.from(
    senderOtherChain.toLowerCase(),
    "utf8"
  );
  const newBuffer = Buffer.concat([
    randomNumberHashBytes,
    senderBytes,
    sendOtherChainBytes
  ]);
  return sha256(newBuffer.toString("hex"));
};

/**
 *
 * @param {String} inputAmount value of the input asset
 * @param {String} inputDenom denom of the input asset
 * @param {String} outputDenom denom of the output asset
 * @return {object} coins result
 */
const convertCoinDecimals = (inputAmount, inputDenom, outputDenom) => {
  let amount = new Big(inputAmount);

  try {
    if (!precision[inputDenom] || !precision[outputDenom]) {
      throw new Error("Invalid asset pairing for decimal conversion.");
    }
  } catch (err) {
    console.log("Error:", err.message);
    return;
  }

  amount = amount
    .mul(precision[outputDenom])
    .div(precision[inputDenom])
    .toString();

  return formatCoins(outputDenom, amount);
};

/**
 * Formats a denom and amount into Cosmos-SDK compatible sdk.Coins object
 * @param {String} amount value of the asset
 * @param {String} denom name of the asset
 * @return {object} resulting formatted coins
 */
const formatCoins = (amount, denom) => {
  return [
    {
      denom: String(denom),
      amount: String(amount)
    }
  ];
};

module.exports.utils = {
  generateRandomNumber,
  calculateRandomNumberHash,
  calculateSwapID,
  convertCoinDecimals,
  formatCoins
};
