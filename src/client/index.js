const sig = require("@tendermint/sig");
const _ = require("lodash");
const tx = require("../tx").tx;
const msg = require("../msg").msg;

const defaultPrefix = "kava";
const defaultDerivationPath = "m/44'/459'/0'/0/0";

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
   * Manually set the chain's ID
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
   * @param {String} password optional param for wallet password
   * @param {String} prefix optional param for custom address prefix
   * @param {String} derivationPath optional param for custom derivation path
   * @return {Promise}
   */
  setWallet(
    mnemonic,
    password = "",
    prefix = defaultPrefix,
    derivationPath = defaultDerivationPath
  ) {
    if (!mnemonic) {
      throw new Error("mnemonic cannot be undefined");
    }
    this.wallet = sig.createWalletFromMnemonic(
      mnemonic,
      password,
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

  /***************************************************
   *                  Tx methods
   ***************************************************/

  /**
   * Sends coins to an address
   * @param {String} recipient address that will receive coins
   * @param {String} coins amount of coins to send
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async transfer(recipient, coins, sequence = null) {
    const msgSend = msg.newMsgSend(this.wallet.address, recipient, coins);
    const rawTx = msg.newStdTx([msgSend]);
    const signInfo = await this.prepareSignInfo(sequence);
    const signedTx = tx.signTx(rawTx, signInfo, this.wallet);
    return await tx.broadcastTx(signedTx, this.baseURI);
  }

  /**
   * Allows oracles to post an asset's price to the pricefeed
   * @param {String} marketID the asset's on chain market ID, such as 'btc:usd'
   * @param {String} price the asset's price
   * @param {String} expiry time duration that this price is valid for
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
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

  /**
   * Create a collateralized debt position
   * @param {String} principal the coins that will be drawn as debt
   * @param {String} collateral the coins that will be held as collateral
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
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

  /**
   * Deposit collateral into a collateralized debt position
   * @param {String} owner the owner of the CDP
   * @param {String} collateral the coins that will deposited as additional collateral
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
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

  /**
   * Withdraw collateral from a collateralized debt position
   * @param {String} owner the owner of the CDP
   * @param {String} collateral the coins that will withdrawn from existing collateral
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
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

  /**
   * Draw additional debt from a collateralized debt position
   * @param {String} cdpDenom the denom of this CDP's collateral asset
   * @param {String} principal the coins that will be drawn as additional principal
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
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

  /**
   * Repay debt by returning principal to a collateralized debt position
   * @param {String} payment the amount of pricipal to be repaid
   * @param {String} cdpDenom the denom of this CDP's collateral asset
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
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

  /**
   * Place a bid on an auction
   * @param {String} auctionID the unique ID of the auction
   * @param {String} amount the coins amount to bid
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
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

  /**
   * Create an atomic swap
   * @param {String} recipient the receiver's address on kava
   * @param {String} recipientOtherChain the receiver's address on the other chain
   * @param {String} senderOtherChain the sender's address on the other chain
   * @param {String} randomNumberHash resulting hex-encoded hash from sha256(timestamp, random number)
   * @param {String} timestamp the timestamp in unix, must be within 15-30 minutes of current time
   * @param {String} amount the amount in coins to be transferred
   * @param {String} expectedIncome the amount of coins expected to be received by the recipient
   * @param {String} heightSpan the number of blocks that this swap will be active/claimable
   * @param {String} crossChain denotes if this swap is a cross-chain swap or a same-chain swap
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
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

  /**
   * Claim an atomic swap
   * @param {String} swapID the swap's unique identifier
   * @param {String} randomNumber the secret random number used to generate this swap's random number hash
   * @return {Promise}
   */
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

  /**
   * Refund an atomic swap
   * @param {String} swapID the swap's unique identifier
   * @return {Promise}
   */
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
