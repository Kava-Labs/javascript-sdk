const SHA256 = require("crypto-js/sha256");
const hexEncoding = require("crypto-js/enc-hex");
const Big = require("big.js");
const crypto = require("../crypto").crypto;

const percision = {
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

const loadCoins = (denom, amount) => {
  amount = new Big(amount);
  let decimals;
  switch (denom) {
    case "kava":
      decimals = percision.kava;
      break;
    case "ukava":
      decimals = percision.ukava;
      break;
    case "usdx":
      decimals = percision.usdx;
      break;
    case "bnb":
      decimals = percision.bnb;
      break;
  }
  amount = amount.mul(decimals).toString();
  // TODO: validate.checkNumber(amount, "amount");

  const coins = [
    {
      denom: denom,
      amount: String(amount)
    }
  ];
  return coins;
};

module.exports.utils = {
  calculateRandomNumberHash,
  calculateSwapID,
  loadCoins
};
