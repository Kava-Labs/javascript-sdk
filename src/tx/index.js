const sig = require("@tendermint/sig");
const _ = require("lodash");
const axios = require("axios");
const URL = require("url").URL;

const api = {
  getAccount: "/auth/accounts",
  postTx: "/txs"
};

/**
 * Sends an HTTP GET request to Kava
 * @param {String} path the request's url extension
 * @param {String} base the request's base url
 * @return {Promise}
 */
async function getTx(path, base) {
  try {
    return await axios.get(new URL(path, base).toString());
  } catch (error) {
    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Status text:", error.response.statusText);
      if (error.response.data && error.response.data.error) {
        console.log("Error:", error.response.data.error);
      }
    } else {
      console.log("network error:", error);
    }
  }
}

/**
 * Loads an account's account number and sequence from Kava
 * @param {String} address the address to be fetched
 * @param {String} base the request's base url
 * @return {Promise}
 */
async function loadMetaData(address, base) {
  const path = api.getAccount + "/" + address;
  const res = await getTx(path, base);

  accNum = _.get(res, "data.result.value.account_number");
  seqNum = _.get(res, "data.result.value.sequence");
  if (!(accNum || seqNum)) {
    throw new Error(
      "account number or sequence number from rest server are undefined"
    );
  }

  const signMetaData = {
    account_number: accNum,
    sequence: seqNum
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
    throw new Error("problem signing tx, generated signature is invalid");
  }
  return tx;
}

/**
 * Sends an HTTP POST request containing a signed transaction to Kava
 * @param {Object} tx a signed tx
 * @param {String} base the request's base url
 * @return {Promise}
 */
async function broadcastTx(tx, base) {
  let txRes;
  try {
    const url = new URL(api.postTx, base).toString();
    txRes = await axios.post(url, sig.createBroadcastTx(tx, "block"));
  } catch (err) {
    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Status text:", error.response.statusText);
      if (error.response.data && error.response.data.error) {
        console.log("Error:", error.response.data.error);
      }
    } else {
      console.log("network error:", error);
    }
  }

  // Check for and handle any tendermint errors
  try {
    if (_.get(txRes, "data.code")) {
      throw new Error(
        `tx not accepted by chain: ${_.get(txRes, "data.raw_log")}`
      );
    }
  } catch (err) {
    return err;
  }

  return _.get(txRes, "data.txhash");
}

module.exports.tx = {
  getTx,
  loadMetaData,
  signTx,
  broadcastTx
};
