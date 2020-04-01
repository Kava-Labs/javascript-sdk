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
  constructor(server) {
    if (!server) {
      throw new Error("Kava server should not be null");
    }
    this.baseURI = server;
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

  /**
   * Manually the chain's ID
   * @param {String} chainID Kava chain ID
   */
  setChainID(chainID) {
    if (!chainID) {
      throw new Error("chainID cannot be undefined");
    }
    this.chainID = chainID;
    return this;
  }

  /**
   * Manually set the wallet's account number
   * @param {String} accNum Account number of the Kava address
   */
  setAccountNumber(accNum) {
    if (!accNum) {
      throw new Error("account number cannot be undefined");
    }
    this.accNum = String(accNum);
    return this;
  }

  /**
   * Set the client's wallet which is used for signature generation
   * @param {String} mnemonic Kava address mnemonic
   * @return {Promise}
   */
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

  /**
   * Load account number, sequence, and package with chain ID for signature
   * @param {String} sequence Kava address sequence
   * @return {Promise}
   */
  async prepareSignInfo(sequence) {
    let signInfo;
    if (sequence && this.accNum != null) {
      // Prepare signing info from manually set values
      signInfo = {
        chain_id: this.chainID,
        account_number: this.accNum,
        sequence: String(sequence)
      };
    } else {
      // Load meta data from the account's chain state
      const meta = await tx.loadMetaData(this.wallet.address, this.baseURI);
      // Select manually set values over automatically pulled values
      signInfo = {
        chain_id: this.chainID,
        account_number: this.accNum != null ? this.accNum : meta.account_number,
        sequence: sequence ? String(sequence) : meta.sequence
      };
    }
    return signInfo;
  }

  /************************
   *      Tx methods
   ************************/

  async transfer(recipient, coins, sequence = null) {
    const msgSend = msg.newMsgSend(this.wallet.address, recipient, coins);
    const rawTx = msg.newStdTx([msgSend]);
    const signInfo = await this.prepareSignInfo(sequence);
    const signedTx = tx.signTx(rawTx, signInfo, this.wallet);
    return await tx.broadcastTx(signedTx, this.baseURI);
  }

  async postPrice(marketID, price, expiry, sequence = null) {
    const msgPostPrice = msg.newMsgPostPrice(
      this.wallet.address,
      marketID,
      price,
      expiry
    );
    const rawTx = msg.newStdTx([msgPostPrice]);
    const signInfo = await this.prepareSignInfo(sequence);
    const signedTx = tx.signTx(rawTx, signInfo, this.wallet);
    return await tx.broadcastTx(signedTx, this.baseURI);
  }

  async createCDP(principal, collateral, sequence = null) {
    const msgCreateCDP = msg.newMsgCreateCDP(
      this.wallet.address,
      principal,
      collateral
    );
    const fee = { amount: [], gas: "250000" };
    const rawTx = msg.newStdTx([msgCreateCDP], fee);
    const signInfo = await this.prepareSignInfo(sequence);
    const signedTx = tx.signTx(rawTx, signInfo, this.wallet);
    return await tx.broadcastTx(signedTx, this.baseURI);
  }

  async deposit(owner, collateral, sequence = null) {
    const msgDeposit = msg.newMsgDeposit(
      owner,
      this.wallet.address,
      collateral
    );
    const rawTx = msg.newStdTx([msgDeposit]);
    const signInfo = await this.prepareSignInfo(sequence);
    const signedTx = tx.signTx(rawTx, signInfo, this.wallet);
    return await tx.broadcastTx(signedTx, this.baseURI);
  }

  async withdraw(owner, collateral, sequence = null) {
    const msgWithdraw = msg.newMsgWithdraw(
      owner,
      this.wallet.address,
      collateral
    );
    const rawTx = msg.newStdTx([msgWithdraw]);
    const signInfo = await this.prepareSignInfo(sequence);
    const signedTx = tx.signTx(rawTx, signInfo, this.wallet);
    return await tx.broadcastTx(signedTx, this.baseURI);
  }

  async drawDebt(cdpDenom, principal, sequence = null) {
    const msgDrawDebt = msg.newMsgDrawDebt(
      this.wallet.address,
      cdpDenom,
      principal
    );
    const rawTx = msg.newStdTx([msgDrawDebt]);
    const signInfo = await this.prepareSignInfo(sequence);
    const signedTx = tx.signTx(rawTx, signInfo, this.wallet);
    return await tx.broadcastTx(signedTx, this.baseURI);
  }

  async repayDebt(payment, cdpDenom, sequence = null) {
    const msgRepayDebt = msg.newMsgRepayDebt(
      this.wallet.address,
      payment,
      cdpDenom
    );
    const rawTx = msg.newStdTx([msgRepayDebt]);
    const signInfo = await this.prepareSignInfo(sequence);
    const signedTx = tx.signTx(rawTx, signInfo, this.wallet);
    return await tx.broadcastTx(signedTx, this.baseURI);
  }

  async placeBid(auctionID, amount, sequence = null) {
    const msgPlaceBid = msg.newMsgPlaceBid(
      auctionID,
      this.wallet.address,
      amount
    );
    const rawTx = msg.newStdTx([msgPlaceBid]);
    const signInfo = await this.prepareSignInfo(sequence);
    const signedTx = tx.signTx(rawTx, signInfo, this.wallet);
    return await tx.broadcastTx(signedTx, this.baseURI);
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
    crossChain,
    sequence = null
  ) {
    const msgCreateAtomicSwap = msg.newMsgCreateAtomicSwap(
      this.wallet.address,
      recipient,
      recipientOtherChain,
      senderOtherChain,
      randomNumberHash.toUpperCase(),
      timestamp,
      amount,
      expectedIncome,
      heightSpan,
      crossChain
    );
    const rawTx = msg.newStdTx([msgCreateAtomicSwap]);
    const signInfo = await this.prepareSignInfo(sequence);
    const signedTx = tx.signTx(rawTx, signInfo, this.wallet);
    return await tx.broadcastTx(signedTx, this.baseURI);
  }

  async claimSwap(swapID, randomNumber, sequence = null) {
    const msgClaimAtomicSwap = msg.newMsgClaimAtomicSwap(
      this.wallet.address,
      swapID.toUpperCase(),
      randomNumber.toUpperCase()
    );
    const rawTx = msg.newStdTx([msgClaimAtomicSwap]);
    const signInfo = await this.prepareSignInfo(sequence);
    const signedTx = tx.signTx(rawTx, signInfo, this.wallet);
    return await tx.broadcastTx(signedTx, this.baseURI);
  }

  async refundSwap(swapID, sequence = null) {
    const msgRefundAtomicSwap = msg.newMsgRefundAtomicSwap(
      this.wallet.address,
      swapID.toUpperCase()
    );
    const rawTx = msg.newStdTx([msgRefundAtomicSwap]);
    const signInfo = await this.prepareSignInfo(sequence);
    const signedTx = tx.signTx(rawTx, signInfo, this.wallet);
    return await tx.broadcastTx(signedTx, this.baseURI);
  }
}

module.exports.KavaClient = KavaClient;
