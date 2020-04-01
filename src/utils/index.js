const SHA256 = require("crypto-js/sha256");
const hexEncoding = require("crypto-js/enc-hex");
const Big = require("big.js");
const cryptoRand = require("crypto");
const crypto = require("../crypto").crypto;

const RandomNumberLength = 64;
const precision = {
  kava: Math.pow(10, 6),
  ukava: Math.pow(10, 6),
  usdx: Math.pow(10, 6),
  bnb: Math.pow(10, 8)
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
 * Loads a Cosmos-SDK compatible sdk.Coins object
 * @param {String} denom name of the asset
 * @param {String} amount value of the asset
 * @return {object} coins result
 */
const loadCoins = (denom, amount) => {
  amount = new Big(amount);
  let decimals;
  switch (denom) {
    case "kava":
      decimals = precision.kava;
      break;
    case "ukava":
      decimals = precision.ukava;
      break;
    case "usdx":
      decimals = precision.usdx;
      break;
    case "bnb":
      decimals = precision.bnb;
      break;
  }
  amount = amount.mul(decimals).toString();
  // TODO: validate that the number is within reasonable bounds
  // validate.checkNumber(amount, "amount");

  const coins = [
    {
      denom: String(denom),
      amount: String(amount)
    }
  ];

  return coins;
};

module.exports.utils = {
  generateRandomNumber,
  calculateRandomNumberHash,
  calculateSwapID,
  loadCoins
};
