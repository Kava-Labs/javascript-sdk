const sig = require('@kava-labs/sig');
import axios, { AxiosError } from 'axios';
import { URL } from 'url';

const api = {
  getAccount: '/auth/accounts',
  postTx: '/txs',
};

/**
 * Sends an HTTP GET request to Kava
 * @param {String} path the request's url extension
 * @param {String} base the request's base url
 * @return {Promise}
 */
async function getTx(path: string, base: string, timeout = 5000, args = {}) {
  const requestUrl = new URL(path, base).toString();

  try {
    return await retry(
      axios.get,
      axios,
      [applyRequestArgs(requestUrl, args)],
      Math.floor(timeout / 1000),
      1000,
      false
    );
  } catch (err) {
    throw err;
  }
}

/**
 * Apply args to an HTTP GET request's url
 * @param {String} url the request's url (base + path extension)
 * @param {String} args the request's http arguments in JSON e.g. {status: 'Open'}
 * @return {String}
 */
function applyRequestArgs(url: string, args: Record<string, string> = {}) {
  const search = [];
  for (let k in args) {
    search.push(`${k}=${args[k]}`);
  }
  return `${url}?${search.join('&')}`;
}

type RetryFunction = (
  fn: Function,
  thisArg: any,
  args: string[],
  retriesLeft: number,
  interval: number,
  exponential: boolean
) => Promise<any>;

/**
 * Retries the given function until it succeeds given a number of retries and an interval between them. They are set
 * by default to retry 5 times with 1sec in between. There's also a flag for exponential back-off.
 * source (with minor edits): https://gitlab.com/snippets/1775781
 * @param {Function} fn - Returns a promise
 * @param {Object} thisArg - the object that will be the 'this' argument to the input function
 * @param {Array} args - array of arguments to call the input function with
 * @param {Number} retriesLeft - Number of retries. If >1 will keep retrying
 * @param {Number} interval - milliseconds between retries. If exponential set to true will be doubled each retry
 * @param {Boolean} exponential - Flag for exponential back-off mode
 * @return {Promise<*>}
 */
const retry: RetryFunction = async (
  fn: Function,
  thisArg: any,
  args: string[],
  retriesLeft = 5,
  interval = 1000,
  exponential = false
) => {
  try {
    const result = await fn.apply(thisArg, args);
    return result;
  } catch (error) {
    if (retriesLeft) {
      await new Promise((r) => setTimeout(r, interval));
      return retry(
        fn,
        thisArg,
        args,
        retriesLeft - 1,
        exponential ? interval * 2 : interval,
        exponential
      );
    } else
      throw new Error(`Max retries reached:
    error: ${error}`);
  }
};

/**
 * Loads an account's account number and sequence from Kava
 * @param {String} address the address to be fetched
 * @param {String} base the request's base url
 * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
 * @return {Promise}
 */
async function loadMetaData(address: string, base: string, timeout = 2000) {
  const path = api.getAccount + '/' + address;
  const res = await getTx(path, base, timeout);
  let accNum: string;
  let seqNum: string;
  if (res?.data?.result?.type === 'cosmos-sdk/BaseAccount') {
    accNum = res?.data?.result?.value?.account_number;
    seqNum = res?.data?.result?.value?.sequence || '0';
  } else {
    accNum =
      res?.data?.result?.value?.base_vesting_account?.base_account
        ?.account_number;
    seqNum =
      res?.data?.result?.value?.base_vesting_account?.base_account?.sequence ||
      '0';
  }
  if (!(accNum || seqNum)) {
    throw new Error(
      'account number or sequence number from rest server are undefined'
    );
  }

  const signMetaData = {
    account_number: accNum,
    sequence: seqNum,
  };

  return signMetaData;
}

/**
 * Packages, signs, and verifies a transaction
 * @param {Object} tx an unsigned tx object
 * @param {Object} signMetaData contains account number, sequence, and chain ID
 * @param {Object} wallet the wallet that will be used to sign the tx
 * @return {Promise}
 */
function signTx(tx: any, signMetaData: any, wallet: any) {
  tx = sig.signTx(tx, signMetaData, wallet);
  if (!sig.verifyTx(tx, signMetaData)) {
    throw new Error('problem signing tx, generated signature is invalid');
  }
  return tx;
}

/**
 * Sends an HTTP POST request containing a signed transaction to Kava
 * @param {Object} tx a signed tx
 * @param {String} base the request's base url
 * @param {String} mode transaction broadcast mode
 * @return {Promise}
 */
async function broadcastTx(tx: any, base: string, mode: string) {
  let txRes;
  try {
    const url = new URL(api.postTx, base).toString();
    txRes = await axios.post(url, sig.createBroadcastTx(tx.value, mode));
  } catch (err) {
    if (axios.isAxiosError(err)) {
      logErr(err);
    }
  }

  // Check for and handle any tendermint errors
  try {
    if (txRes?.data?.code) {
      throw new Error(`tx not accepted by chain: ${txRes.data.raw_log}`);
    }
  } catch (err) {
    return err;
  }

  return txRes?.data?.txhash;
}

/**
 * Parses and logs tx-related errors
 * @param {AxiosError} err an error resulting from a tx-related action
 */
const logErr = (err: AxiosError) => {
  // Load status, status text, and error
  const status = err.response?.status;
  const statusText = err.response?.statusText;
  const error = err.response?.data.error;

  // Log status, status text, and error, or if unidentified, log network error
  status ? console.log('Status:', status) : null;
  statusText ? console.log('Status text:', statusText) : null;
  error ? console.log('Error:', error) : null;
  if (!status && !statusText && !error) {
    console.log('Network error:', err);
  }
};

export const tx = {
  getTx,
  loadMetaData,
  signTx,
  broadcastTx,
  logErr,
};
