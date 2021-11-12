import SHA256 from 'crypto-js/sha256';
import hexEncoding from 'crypto-js/enc-hex';
import Big from 'big.js';
import cryptoRand from 'crypto';
import { crypto } from '../crypto';

const RandomNumberLength = 64;

// Precision is relative to KAVA or 10**6
const precision: Record<string, number> = {
  kava: 1,
  ukava: Math.pow(10, 6),
};

/**
 * Computes a single SHA256 digest.
 * @param {string} hex message to hash
 * @returns {string} hash output
 */
const sha256 = (hex: string) => {
  if (typeof hex !== 'string') throw new Error('sha256 expects a hex string');
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
    .toString('hex')
    .slice(0, RandomNumberLength);
};

/**
 * Computes sha256 of random number and timestamp
 * @param {String} randomNumber
 * @param {Number} timestamp
 * @returns {string} sha256 result
 */
const calculateRandomNumberHash = (randomNumber: string, timestamp: number) => {
  const timestampHexStr = timestamp.toString(16);
  let timestampHexStrFormat = timestampHexStr;
  for (let i = 0; i < 16 - timestampHexStr.length; i++) {
    timestampHexStrFormat = '0' + timestampHexStrFormat;
  }
  const timestampBytes = Buffer.from(timestampHexStrFormat, 'hex');
  const newBuffer = Buffer.concat([
    Buffer.from(randomNumber, 'hex'),
    timestampBytes,
  ]);
  return sha256(newBuffer.toString('hex'));
};

/**
 * Computes swapID
 * @param {String} randomNumberHash
 * @param {String} sender
 * @param {String} senderOtherChain
 * @returns {string} sha256 result
 */
const calculateSwapID = (
  randomNumberHash: string,
  sender: string,
  senderOtherChain: string
) => {
  const randomNumberHashBytes = Buffer.from(randomNumberHash, 'hex');
  const senderBytes = crypto.decodeAddress(sender);
  const sendOtherChainBytes = Buffer.from(
    senderOtherChain.toLowerCase(),
    'utf8'
  );
  const newBuffer = Buffer.concat([
    randomNumberHashBytes,
    senderBytes,
    sendOtherChainBytes,
  ]);
  return sha256(newBuffer.toString('hex'));
};

/**
 * Converts coin decimals between kava and ukava
 * @param {String} inputAmount value of the input asset
 * @param {String} inputDenom denom of the input asset
 * @param {String} outputDenom denom of the output asset
 * @return {object} coins result
 */
const convertCoinDecimals = (
  inputAmount: string,
  inputDenom: string,
  outputDenom: string
) => {
  const amount = new Big(inputAmount);

  try {
    if (!precision[inputDenom] || !precision[outputDenom]) {
      throw new Error('Invalid asset pairing for decimal conversion.');
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log('Error:', err.message);
    }
    return;
  }

  const amountString = amount
    .mul(precision[outputDenom])
    .div(precision[inputDenom])
    .toString();

  return formatCoins(amountString, outputDenom);
};

/**
 * Formats a denom and amount into Cosmos-SDK compatible sdk.Coin object
 * @param {String} amount value of the asset
 * @param {String} denom name of the asset
 * @return {object} resulting formatted coin
 */
const formatCoin = (amount: string | number, denom: string) => {
  return {
    denom: String(denom),
    amount: String(amount),
  };
};

/**
 * Formats a denom and amount into Cosmos-SDK compatible sdk.Coins object
 * @param {String} amount value of the asset
 * @param {String} denom name of the asset
 * @return {object} resulting formatted coins
 */
const formatCoins = (amount: string | number, denom: string) => {
  return [
    {
      denom: String(denom),
      amount: String(amount),
    },
  ];
};

/**
 * Formats an array of denoms and amounts into Cosmos-SDK compatible sdk.Coins object
 * @param {String} amounts an array of asset amounts
 * @param {String} denoms an array of asset denoms
 * @return {object} resulting formatted coins
 */
const formatMultiCoins = (amounts: string[], denoms: string[]) => {
  try {
    if (amounts.length != denoms.length) {
      throw new Error('Every amount must have exactly 1 corresponding denom.');
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log('Error:', err.message);
    }
    return;
  }

  var coins = [];
  for (var i = 0; i < amounts.length; i++) {
    let coin = formatCoin(amounts[i], denoms[i]);
    coins.push(coin);
  }
  return coins;
};

/**
 * Takes current day and adds desired amount of seconds and converts to unix time
 * @param {number} seconds for the transaction to process
 * @return {object} resulting in a unix timestring, defaulting to 1 day
 */

const calculateUnixTime = (seconds = 86400) => {
  var myDate = new Date(2021, 6, 20, 14, 30, 15);
  myDate.setSeconds(myDate.getSeconds() + seconds);
  return String(Math.floor(new Date(myDate).getTime() / 1000));
};

export const utils = {
  generateRandomNumber,
  calculateRandomNumberHash,
  calculateSwapID,
  calculateUnixTime,
  convertCoinDecimals,
  formatCoin,
  formatCoins,
  formatMultiCoins,
};
