const sig = require('@kava-labs/sig');
const _ = require('lodash');
const axios = require('axios');
const URL = require('url').URL;

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
async function getTx(path, base, timeout = 5000, args = {}) {
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
    throw new Error(err);
  }
}

/**
 * Apply args to an HTTP GET request's url
 * @param {String} url the request's url (base + path extension)
 * @param {String} args the request's http arguments in JSON e.g. {status: 'Open'}
 * @return {String}
 */
function applyRequestArgs(url, args = {}) {
  const search = []
  for (let k in args) {
    search.push(`${k}=${args[k]}`)
  }
  return `${url}?${search.join("&")}`
}

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
async function retry(
  fn,
  thisArg,
  args,
  retriesLeft = 5,
  interval = 1000,
  exponential = false
) {
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
}

/**
 * Loads an account's account number and sequence from Kava
 * @param {String} address the address to be fetched
 * @param {String} base the request's base url
 * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
 * @return {Promise}
 */
async function loadMetaData(address, base, timeout = 2000) {
  const path = api.getAccount + '/' + address;
  const res = await getTx(path, base, timeout);
  accNum = _.get(res, 'data.result.value.account_number');
  seqNum = _.get(res, 'data.result.value.sequence');
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
function signTx(tx, signMetaData, wallet) {
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
async function broadcastTx(tx, base, mode) {
  let txRes;
  try {
    const url = new URL(api.postTx, base).toString();
    txRes = await axios.post(url, sig.createBroadcastTx(tx.value, mode));
  } catch (err) {
    logErr(err);
  }

  // Check for and handle any tendermint errors
  try {
    if (_.get(txRes, 'data.code')) {
      throw new Error(
        `tx not accepted by chain: ${_.get(txRes, 'data.raw_log')}`
      );
    }
  } catch (err) {
    return err;
  }

  return _.get(txRes, 'data.txhash');
}

/**
 * Parses and logs tx-related errors
 * @param {object} err an error resulting from a tx-related action
 */
const logErr = (err) => {
  // Load status, status text, and error
  const status = _.get(err, 'response.status');
  const statusText = _.get(err, 'response.statusText');
  const error = _.get(err, 'response.data.error');

  // Log status, status text, and error, or if unidentified, log network error
  status ? console.log('Status:', status) : null;
  statusText ? console.log('Status text:', statusText) : null;
  error ? console.log('Error:', error) : null;
  if (!status && !statusText && !error) {
    console.log('Network error:', err);
  }
};

module.exports.tx = {
  getTx,
  loadMetaData,
  signTx,
  broadcastTx,
  logErr,
};
