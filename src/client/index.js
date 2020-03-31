const sig = require("@tendermint/sig");
const _ = require("lodash");
const tx = require("../tx").tx;
const msg = require("../msg").msg;
const utils = require("../utils").utils;

const prefix = "kava";
const derivationPath = "m/44'/459'/0'/0/0";

const api = {
  nodeInfo: "/node_info",
  getSwap: "bep3/swap",
  getSwaps: "/bep3/swaps",
  getCDP: "cdp/cdp",
  getCDPs: "/cdp/cdps",
  getAuction: "/auction/auction",
  getAuctions: "/auction/auctions"
};

/**
 * The Kava client.
 */
class KavaClient {
  /**
   * @param {String} server Kava public url
   */
  constructor(baseURI) {
    if (!baseURI) {
      throw new Error("Kava base URI should not be null");
    }
    this.baseURI = baseURI;
  }

  /**
   * Initialize the client with the chain's ID. Asynchronous.
   * @return {Promise}
   */
  async initChain() {
    if (!this.chainID) {
      const res = await tx.getTx(api.nodeInfo, this.baseURI);
      this.chainID = _.get(res, "data.node_info.network");
    }
    return this;
  }

  setWallet(mnemonic) {
    if (!mnemonic) {
      throw new Error("mnemonic cannot be undefined");
    }
    this.wallet = sig.createWalletFromMnemonic(
      mnemonic,
      "",
      prefix,
      derivationPath
    );
    return this;
  }

  async transfer(recipient, denom, amount) {
    const coins = utils.loadCoins(denom, amount);
    const msgSend = msg.newMsgSend(this.wallet.address, recipient, coins);
    let rawTx = msg.newStdTx([msgSend]);
    return tx.postTx(this.chainID, this.baseURI, this.wallet, rawTx);
  }

  async postPrice(marketID, price, expiry) {
    const msgPostPrice = msg.newMsgPostPrice(
      this.wallet.address,
      marketID,
      price,
      expiry
    );
    let rawTx = msg.newStdTx([msgPostPrice]);
    return tx.postTx(this.chainID, this.baseURI, this.wallet, rawTx);
  }

  async createCDP(principal, collateral) {
    const msgCreateCDP = msg.newMsgCreateCDP(
      this.wallet.address,
      principal,
      collateral
    );
    const fee = { amount: [], gas: "250000" };
    let rawTx = msg.newStdTx([msgCreateCDP], fee);
    return tx.postTx(this.chainID, this.baseURI, this.wallet, rawTx);
  }

  async deposit(owner, collateral) {
    const msgDeposit = msg.newMsgDeposit(
      owner,
      this.wallet.address,
      collateral
    );
    let rawTx = msg.newStdTx([msgDeposit]);
    return tx.postTx(this.chainID, this.baseURI, this.wallet, rawTx);
  }

  async withdraw(owner, collateral) {
    const msgWithdraw = msg.newMsgWithdraw(
      owner,
      this.wallet.address,
      collateral
    );
    let rawTx = msg.newStdTx([msgWithdraw]);
    return tx.postTx(this.chainID, this.baseURI, this.wallet, rawTx);
  }

  async drawDebt(cdpDenom, principal) {
    const msgDrawDebt = msg.newMsgDrawDebt(
      this.wallet.address,
      cdpDenom,
      principal
    );
    let rawTx = msg.newStdTx([msgDrawDebt]);
    return tx.postTx(this.chainID, this.baseURI, this.wallet, rawTx);
  }

  async repayDebt(payment, cdpDenom) {
    const msgRepayDebt = msg.newMsgRepayDebt(
      this.wallet.address,
      payment,
      cdpDenom
    );
    let rawTx = msg.newStdTx([msgRepayDebt]);
    return tx.postTx(this.chainID, this.baseURI, this.wallet, rawTx);
  }

  async placeBid(auctionID, amount) {
    const msgPlaceBid = msg.newMsgPlaceBid(
      auctionID,
      this.wallet.address,
      amount
    );
    let rawTx = msg.newStdTx([msgPlaceBid]);
    return tx.postTx(this.chainID, this.baseURI, this.wallet, rawTx);
  }

  async createSwap(
    recipient,
    recipientOtherChain,
    senderOtherChain,
    randomNumberHash,
    timestamp,
    amount,
    expectedIncome,
    heightSpan,
    crossChain
  ) {
    const msgCreateAtomicSwap = msg.newMsgCreateAtomicSwap(
      this.wallet.address,
      recipient,
      recipientOtherChain,
      senderOtherChain,
      randomNumberHash,
      timestamp,
      amount,
      expectedIncome,
      heightSpan,
      crossChain
    );
    let rawTx = msg.newStdTx([msgCreateAtomicSwap]);
    return tx.postTx(this.chainID, this.baseURI, this.wallet, rawTx);
  }

  async claimSwap(swapID, randomNumber) {
    const msgClaimAtomicSwap = msg.newMsgClaimAtomicSwap(
      this.wallet.address,
      swapID,
      randomNumber
    );
    let rawTx = msg.newStdTx([msgClaimAtomicSwap]);
    return tx.postTx(this.chainID, this.baseURI, this.wallet, rawTx);
  }

  async refundSwap(swapID) {
    const msgRefundAtomicSwap = msg.newMsgRefundAtomicSwap(
      this.wallet.address,
      swapID
    );
    let rawTx = msg.newStdTx([msgRefundAtomicSwap]);
    return tx.postTx(this.chainID, this.baseURI, this.wallet, rawTx);
  }
}

module.exports.KavaClient = KavaClient;
