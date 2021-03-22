const sig = require('@kava-labs/sig');
const _ = require('lodash');
const tx = require('../tx').tx;
const msg = require('../msg').msg;
const Hard = require('./hard').Hard;

const KAVA_PREFIX = 'kava';
const DERIVATION_PATH = "m/44'/459'/0'/0/0";
const DERIVATION_PATH_LEGACY = "m/44'/118'/0'/0/0";
const DEFAULT_FEE = { amount: [], gas: String(300000) }
const DEFAULT_CDP_FEE = { amount: [], gas: String(650000) }


const api = {
  txs: '/txs',
  nodeInfo: '/node_info',
  getBlock: '/blocks',
  getLatestBlock: '/blocks/latest',
  getLatestValidatorSet: '/validatorsets/latest',
  getValidatorSet: '/validatorsets/',
  getParamsPricefeed: '/pricefeed/parameters',
  getParamsAuction: '/auction/parameters',
  getParamsCDP: '/cdp/parameters',
  getParamsBEP3: '/bep3/parameters',
  getParamsIncentive: '/incentive/parameters',
  getParamsCommittee: '/committee/parameters',
  getParamsIssuance: '/issuance/parameters',
  getAccount: '/auth/accounts',
  getBalances: '/bank/balances',
  getSupply: '/supply/total',
  getMarkets: 'pricefeed/markets',
  getOracles: 'pricefeed/oracles',
  getPrice: '/pricefeed/price',
  getRawPrices: '/pricefeed/rawprices',
  getSwap: 'bep3/swap',
  getSwaps: '/bep3/swaps',
  getAssetSupply: 'bep3/supply',
  getAssetSupplies: 'bep3/supplies',
  getCDP: 'cdp/cdps/cdp',
  getCDPs: '/cdp/cdps',
  getCDPsByCollateralType: '/cdp/cdps/collateralType',
  getCDPsRatio: '/cdp/cdps/ratio',
  getDeposits: '/cdp/cdps/deposits',
  getAuction: '/auction/auctions',
  getAuctions: '/auction/auctions',
  getRewards: '/incentive/rewards',
  getCommittee: '/committee/committees', // endpoint also used by getCommitteeProposals
  getCommittees: '/committee/committees',
  getProposal: '/committee/proposals', // endpoint also used by getProposer, getProposalTally, getProposalVotes
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
      throw new Error('Kava server should not be null');
    }
    this.baseURI = server;
    this.broadcastMode = 'sync'; // default broadcast mode
    this.hard = new Hard(this);
  }

  /**
   * Initialize the client with the chain's ID. Asynchronous.
   * @return {Promise}
   */
  async initChain() {
    if (!this.chainID) {
      const res = await tx.getTx(api.nodeInfo, this.baseURI);
      this.chainID = _.get(res, 'data.node_info.network');
    }
    return this;
  }

  /**
   * Manually set the chain's ID
   * @param {String} chainID Kava chain ID
   */
  setChainID(chainID) {
    if (!chainID) {
      throw new Error('chainID cannot be undefined');
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
      throw new Error('account number cannot be undefined');
    }
    this.accNum = String(accNum);
    return this;
  }

  /**
   * Set broadcast mode
   * @param {String} mode transaction broadcast mode
   */
  setBroadcastMode(mode) {
    if (!mode) {
      throw new Error('broadcast mode cannot be undefined');
    }
    if (mode != 'async' && mode != 'sync' && mode != 'block') {
      throw new Error(
        'invalid broadcast mode ',
        mode,
        ' - must be async, sync, or block'
      );
    }
    this.broadcastMode = String(mode);
    return this;
  }

  /**
   * Set the client's wallet which is used for signature generation
   * @param {String} mnemonic Kava address mnemonic
   * @param {String} password optional param for wallet password
   * @param {boolean} legacy optional param to use the legacy coin type
   * @return {Promise}
   */
  setWallet(
    mnemonic,
    password = '',
    legacy = false,
  ) {
    if (!mnemonic) {
      throw new Error('mnemonic cannot be undefined');
    }
    const derivationPath = legacy ? DERIVATION_PATH_LEGACY : DERIVATION_PATH
    this.wallet = sig.createWalletFromMnemonic(
      mnemonic,
      password,
      KAVA_PREFIX,
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
        account_number: String(this.accNum),
        sequence: String(sequence),
      };
    } else {
      // Load meta data from the account's chain state
      const meta = await tx.loadMetaData(this.wallet.address, this.baseURI);
      // Select manually set values over automatically pulled values
      signInfo = {
        chain_id: this.chainID,
        account_number:
          this.accNum != null
            ? String(this.accNum)
            : String(meta.account_number),
        sequence: sequence ? String(sequence) : String(meta.sequence),
      };
    }
    return signInfo;
  }

  /**
   * Sends messages to the Kava blockchain
   * @param {Array} msgs an array of msgs to be sent
   * @param {Object} fee the transaction's fee that includes gas amount
   * @param {String} sequence account sequence
   * @return {Promise}
   */
  async sendTx(msgs, fee, sequence) {
    const rawTx = msg.cosmos.newStdTx(msgs, fee);
    const signInfo = await this.prepareSignInfo(sequence);
    const signedTx = tx.signTx(rawTx, signInfo, this.wallet);
    return await tx.broadcastTx(signedTx, this.baseURI, this.broadcastMode);
  }

  /***************************************************
   *                   Tendermint
   ***************************************************/
  /**
   * Get the latest block
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getLatestBlock(timeout = 2000) {
      const res = await tx.getTx(api.getLatestBlock, this.baseURI, timeout);
      if (res && res.data) {
        return res.data;
      }
  }

  /**
   * Get a block at a specific height
   * @param {Number} height the block's height
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getBlock(height, timeout = 2000) {
    const path = api.getBlock + '/' + String(height);
    const res = await tx.getTx(path, this.baseURI, timeout);
    if (res && res.data) {
      return res.data;
    }
  }

  /**
   * Get the latest set of validators
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getLatestValidatorSet(timeout = 2000) {
    const res = await tx.getTx(api.getLatestValidatorSet, this.baseURI, timeout);
    if (res && res.data) {
      return res.data;
    }
  }

  /**
   * Get a set of validators at a specific block height
   * @param {Number} height the block's height
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getValidatorSet(height, timeout = 2000) {
    const path = api.getValidatorSet + '/' + String(height);
    const res = await tx.getTx(path, this.baseURI, timeout);
    if (res && res.data) {
      return res.data;
    }
  }

  /**
   * Checks a transaction hash for on-chain results
   * @param {String} txHash the transaction's hash
   * @param {Number} timeout milliseconds until the transaction will be considered not found
   * @return {Promise}
   */
  async checkTxHash(txHash, timeout = 10000) {
    const path = api.txs + '/' + txHash;
    let res;

    // Query the chain for a transaction with this hash
    try {
      res = await tx.getTx(path, this.baseURI, timeout);
    } catch (e) {
      throw new Error(`tx not found: ${e}`);
    }

    // If the transaction is found, check that it was accepted by the chain
    try {
      if (_.get(res, 'data.code')) {
        throw new Error(
          `tx not accepted by chain: "${_.get(res, 'data.raw_log')}"`
        );
      }
     } catch (e) {
       console.log("\n" + e)
     }

    return res.data;
  }

  /***************************************************
   *                   Cosmos SDK
   ***************************************************/
  /**
   * Get information about an account
   * @param {String} address account to query
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getAccount(address, timeout = 2000) {
    const path = api.getAccount + '/' + address;
    const res = await tx.getTx(path, this.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Get an account's balances
   * @param {String} address account to query
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getBalances(address, timeout = 2000) {
    const path = api.getBalances + '/' + address;
    const res = await tx.getTx(path, this.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Get the total supply of coins on the chain
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getSupply(timeout = 2000) {
    const res = await tx.getTx(api.getSupply, this.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Get the total supply of coins on the chain
   * @param {String} denom the name of the asset whose total supply will be queried
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getSupplyOf(denom, timeout = 2000) {
    const path = api.getSupply + '/' + denom;
    const res = await tx.getTx(path, this.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Sends coins to an address
   * @param {String} recipient address that will receive coins
   * @param {String} coins amount of coins to send
   * @param {Object} fee optional fee consisting of { amount: [Coins], gas: String(Number) }
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async transfer(recipient, coins, fee = DEFAULT_FEE, sequence = null) {
    const msgSend = msg.cosmos.newMsgSend(this.wallet.address, recipient, coins);
    return await this.sendTx([msgSend], fee, sequence);
  }

  /***************************************************
   *                   Pricefeed
   ***************************************************/
  /**
   * Get the params of the pricefeed module
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getParamsPricefeed(timeout = 2000) {
    const res = await tx.getTx(api.getParamsPricefeed, this.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Get the current system price of an asset
   * @param {String} market asset's market identifier
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getPrice(market, timeout = 2000) {
    const path = api.getPrice + '/' + market;
    const res = await tx.getTx(path, this.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Get all active oracle prices for an asset
   * @param {String} market asset's market identifier
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getRawPrices(market, timeout = 2000) {
    const path = api.getRawPrices + '/' + market;
    const res = await tx.getTx(path, this.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Get all active markets
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getMarkets(timeout = 2000) {
    const res = await tx.getTx(api.getMarkets, this.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Get all active oracles for an asset
   * @param {String} denom asset's name
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getOracles(denom, timeout = 2000) {
    const path = api.getOracles + '/' + denom;
    const res = await tx.getTx(path, this.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Allows oracles to post an asset's price to the pricefeed
   * @param {String} marketID the asset's on chain market ID, such as 'btc:usd'
   * @param {String} price the asset's price
   * @param {String} expiry time duration that this price is valid for
   * @param {Object} fee optional fee consisting of { amount: [Coins], gas: String(Number) }
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async postPrice(marketID, price, expiry, fee = DEFAULT_FEE, sequence = null) {
    const msgPostPrice = msg.kava.newMsgPostPrice(
      this.wallet.address,
      marketID,
      price,
      expiry
    );
    return await this.sendTx([msgPostPrice], fee, sequence);
  }

  /***************************************************
   *                    Auction
   ***************************************************/
  /**
   * Get the params of the auction module
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getParamsAuction(timeout = 2000) {
    const res = await tx.getTx(api.getParamsAuction, this.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Get auction by ID
   * @param {String} id auctions unique identifier
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getAuction(id, timeout = 2000) {
    const path = api.getAuction + '/' + id;
    const res = await tx.getTx(path, this.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Get auctions, filterable by args.
   * @param {Object} args request args as JSON. Example: {type: "collateral", denom: "btc", owner: "kava1l0xsq2z7gqd7yly0g40y5836g0appumark77ny"}
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getAuctions(args = {}, timeout = 2000) {
    const res = await tx.getTx(api.getAuctions, this.baseURI, timeout, args);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Place a bid on an auction
   * @param {String} auctionID the unique ID of the auction
   * @param {String} amount the coins amount to bid
   * @param {Object} fee optional fee consisting of { amount: [Coins], gas: String(Number) }
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async placeBid(auctionID, amount, fee = DEFAULT_FEE, sequence = null) {
    const msgPlaceBid = msg.kava.newMsgPlaceBid(
      auctionID,
      this.wallet.address,
      amount
    );
    return await this.sendTx([msgPlaceBid], fee, sequence);
  }

  /***************************************************
   *                     CDP
   ***************************************************/
  /**
   * Get the params of the cdp module
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getParamsCDP(timeout = 2000) {
    const res = await tx.getTx(api.getParamsCDP, this.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Get CDP if one exists for an owner and asset type
   * @param {String} owner address of the CDP's owner
   * @param {String} collateralType type of the CDP's collateral asset
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getCDP(owner, collateralType, timeout = 2000) {
    const path = api.getCDP + '/' + owner + '/' + collateralType;
    const res = await tx.getTx(path, this.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Get all CDPs by filterable args
   * @param {Object} args request args as JSON. Example: {collateral-type: "btc-a", id: "52", ratio: "2.75", owner: "kava1l0xsq2z7gqd7yly0g40y5836g0appumark77ny"}
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getCDPs(args = {}, timeout = 2000) {
    const res = await tx.getTx(api.getCDPs, this.baseURI, timeout, args);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Get all CDPs for an asset type
   * @param {String} collateralType type of the CDP's collateral asset
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getCDPsByCollateralType(collateralType, timeout = 2000) {
    const path = api.getCDPsByCollateralType + '/' + collateralType;
    const res = await tx.getTx(path, this.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Get all CDPs for an asset that are under the collateralization ratio specified
   * @param {String} collateralType type of the CDP's collateral asset
   * @param {String} ratio upper collateralization ratio limit of the query
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getCDPsByRatio(collateralType, ratio, timeout = 2000) {
    const path = api.getCDPsRatio + '/' + collateralType + '/' + ratio;
    const res = await tx.getTx(path, this.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Get all deposits for the CDP with the specified owner and collateral type
   * @param {String} owner the address that owns the CDP
   * @param {String} collateralType denom of the CDP's collateral asset
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getDeposits(owner, collateralType, timeout = 2000) {
    const path = api.getDeposits + '/' + owner + '/' + collateralType;
    const res = await tx.getTx(path, this.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Create a collateralized debt position
   * @param {String} principal the coins that will be drawn as debt
   * @param {String} collateral the coins that will be held as collateral
   * @param {String} collateralType the CDP's collateral type
   * @param {Object} fee optional fee consisting of { amount: [Coins], gas: String(Number) }
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async createCDP(principal, collateral, collateralType, fee = DEFAULT_CDP_FEE, sequence = null) {
    const msgCreateCDP = msg.kava.newMsgCreateCDP(
      this.wallet.address,
      principal,
      collateral,
      collateralType
    );
    return await this.sendTx([msgCreateCDP], fee, sequence);
  }

  /**
   * Deposit collateral into a collateralized debt position
   * @param {String} owner the owner of the CDP
   * @param {String} collateral the coins that will deposited as additional collateral
   * @param {String} collateralType the CDP's collateral type
   * @param {Object} fee optional fee consisting of { amount: [Coins], gas: String(Number) }
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async deposit(owner, collateral, collateralType, fee = DEFAULT_CDP_FEE, sequence = null) {
    const msgDeposit = msg.kava.newMsgDeposit(
      owner,
      this.wallet.address,
      collateral,
      collateralType
    );
    return await this.sendTx([msgDeposit], fee, sequence);
  }

  /**
   * Withdraw collateral from a collateralized debt position
   * @param {String} owner the owner of the CDP
   * @param {String} collateral the coins that will withdrawn from existing collateral
   * @param {String} collateralType the CDP's collateral type
   * @param {Object} fee optional fee consisting of { amount: [Coins], gas: String(Number) }
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async withdraw(owner, collateral, collateralType, fee = DEFAULT_CDP_FEE, sequence = null) {
    const msgWithdraw = msg.kava.newMsgWithdraw(
      owner,
      this.wallet.address,
      collateral,
      collateralType
    );
    return await this.sendTx([msgWithdraw], fee, sequence);
  }

  /**
   * Draw additional debt from a collateralized debt position
   * @param {String} collateralType the CDP's collateral type
   * @param {String} principal the coins that will be drawn as additional principal
   * @param {Object} fee optional fee consisting of { amount: [Coins], gas: String(Number) }
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async drawDebt(collateralType, principal, fee = DEFAULT_CDP_FEE, sequence = null) {
    const msgDrawDebt = msg.kava.newMsgDrawDebt(
      this.wallet.address,
      collateralType,
      principal
    );
    return await this.sendTx([msgDrawDebt], fee, sequence);
  }

  /**
   * Repay debt by returning principal to a collateralized debt position
   * @param {String} collateralType the CDP's collateral type
   * @param {String} payment the amount of pricipal to be repaid
   * @param {Object} fee optional fee consisting of { amount: [Coins], gas: String(Number) }
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async repayDebt(collateralType, payment, fee = DEFAULT_CDP_FEE, sequence = null) {
    const msgRepayDebt = msg.kava.newMsgRepayDebt(
      this.wallet.address,
      collateralType,
      payment
    );
    return await this.sendTx([msgRepayDebt], fee, sequence);
  }

  /**
   * Attempt to liquidate a borrower that's over their loan-to-value ratio
   * @param {String} borrower the borrower to be liquidated
   * @param {String} collateralType the collateral type to be liquidated
   * @param {Object} fee optional fee consisting of { amount: [Coins], gas: String(Number) }
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async liquidate(borrower, collateralType, fee = DEFAULT_CDP_FEE, sequence = null) {
    const msgLiquidate = msg.kava.newMsgLiquidate(
      this.wallet.address,
      borrower,
      collateralType,
    );
    return await this.sendTx([msgLiquidate], fee, sequence);
  }

  /***************************************************
   *                     BEP3
   ***************************************************/
  /**
   * Get the params of the bep3 module
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getParamsBEP3(timeout = 2000) {
    const res = await tx.getTx(api.getParamsBEP3, this.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Get a swap by its ID
   * @param {String} swapID the swap's unique identifier
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getSwap(swapID, timeout = 2000) {
    const path = api.getSwap + '/' + swapID;
    const res = await tx.getTx(path, this.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Get swaps, filterable by args.
   * @param {Object} args request args as JSON. Example: {status: "Open", direction: "Incoming"}
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getSwaps(args = {}, timeout = 2000) {
    const res = await tx.getTx(api.getSwaps, this.baseURI, timeout, args);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Get an asset's total supply by its denom
   * @param {String} assetDenom the asset's denom
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getAssetSupply(assetDenom, timeout = 2000) {
    const path = api.getAssetSupply + '/' + assetDenom;
    const res = await tx.getTx(path, this.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Get all supplies
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getAssetSupplies(timeout = 2000) {
    const res = await tx.getTx(api.getAssetSupplies, this.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Create an atomic swap
   * @param {String} recipient the receiver's address on kava
   * @param {String} recipientOtherChain the receiver's address on the other chain
   * @param {String} senderOtherChain the sender's address on the other chain
   * @param {String} randomNumberHash resulting hex-encoded hash from sha256(timestamp, random number)
   * @param {String} timestamp the timestamp in unix, must be within 15-30 minutes of current time
   * @param {String} amount the amount in coins to be transferred
   * @param {String} heightSpan the number of blocks that this swap will be active/claimable
   * @param {Object} fee optional fee consisting of { amount: [Coins], gas: String(Number) }
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
    heightSpan,
    fee = DEFAULT_FEE,
    sequence = null
  ) {
    const msgCreateAtomicSwap = msg.kava.newMsgCreateAtomicSwap(
      this.wallet.address,
      recipient,
      recipientOtherChain,
      senderOtherChain,
      randomNumberHash.toUpperCase(),
      timestamp,
      amount,
      heightSpan
    );
    return await this.sendTx([msgCreateAtomicSwap], fee, sequence);
  }

  /**
   * Claim an atomic swap
   * @param {String} swapID the swap's unique identifier
   * @param {String} randomNumber the secret random number used to generate this swap's random number hash
   * @param {Object} fee optional fee consisting of { amount: [Coins], gas: String(Number) }
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async claimSwap(swapID, randomNumber, fee = DEFAULT_FEE, sequence = null) {
    const msgClaimAtomicSwap = msg.kava.newMsgClaimAtomicSwap(
      this.wallet.address,
      swapID.toUpperCase(),
      randomNumber.toUpperCase()
    );
    return await this.sendTx([msgClaimAtomicSwap], fee, sequence);
  }

  /**
   * Refund an atomic swap
   * @param {String} swapID the swap's unique identifier
   * @param {Object} fee optional fee consisting of { amount: [Coins], gas: String(Number) }
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async refundSwap(swapID, fee = DEFAULT_FEE, sequence = null) {
    console.log(fee)
    const msgRefundAtomicSwap = msg.kava.newMsgRefundAtomicSwap(
      this.wallet.address,
      swapID.toUpperCase()
    );
    return await this.sendTx([msgRefundAtomicSwap], fee, sequence);
  }

  /***************************************************
   *                    Incentive
   ***************************************************/
  /**
   * Get the params of the incentive module
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getParamsIncentive(timeout = 2000) {
    const res = await tx.getTx(api.getParamsIncentive, this.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Get the claims of an address for a specific denom
   * @param {Number} args query arguments
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getRewards(args = {}, timeout = 2000) {
    const path = api.getRewards;
    const res = await tx.getTx(path, this.baseURI, timeout, args);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Claim USDX minting reward using a specific multiplier
   * @param {String} multiplierName the multiplier to claim with, such as 'small' or 'large'
   * @param {Object} fee optional fee consisting of { amount: [Coins], gas: String(Number) }
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async claimUSDXMintingReward(multiplierName, fee = DEFAULT_FEE, sequence = null) {
    const msgClaimUSDXMintingReward = msg.kava.newMsgClaimUSDXMintingReward(
      this.wallet.address,
      multiplierName
    );
    return await this.sendTx([msgClaimUSDXMintingReward], fee, sequence);
  }

  /**
   * Claim Hard protocol reward using a specific multiplier
   * @param {String} multiplierName the multiplier to claim with, such as 'small' or 'large'
   * @param {Object} fee optional fee consisting of { amount: [Coins], gas: String(Number) }
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async claimHardReward(multiplierName, fee = DEFAULT_FEE, sequence = null) {
    const msgClaimHardReward = msg.kava.newMsgClaimHardReward(
      this.wallet.address,
      multiplierName
    );
    return await this.sendTx([msgClaimHardReward], fee, sequence);
  }

 /***************************************************
   *                    Committee
   ***************************************************/
  /**
   * Get the params of the committee module
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getParamsCommittee(timeout = 2000) {
    const res = await tx.getTx(api.getParamsCommittee, this.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Get a committee by ID
   * @param {Number} committeeID unique identifier of the committee to be queried
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getCommittee(committeeID, timeout = 2000) {
    const path = api.getCommittee + '/' + committeeID
    const res = await tx.getTx(path, this.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Get all committees
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getCommittees(timeout = 2000) {
    const res = await tx.getTx(api.getCommittees, this.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Get all proposals by a committee
   * @param {Number} committeeID unique identifier of the committee whose proposals will be queried
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getCommitteeProposals(committeeID, timeout = 2000) {
    const path = api.getCommittee + '/' + committeeID + '/proposals'
    const res = await tx.getTx(path, this.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Get a proposal by ID
   * @param {Number} proposalID unique identifier of the proposal to be queried
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getProposal(proposalID, timeout = 2000) {
    const path = api.getProposal + '/' + proposalID
    const res = await tx.getTx(path, this.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Get a proposal's proposer by proposal ID
   * @param {Number} proposalID unique identifier of the proposal whose proposer will be queried
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getProposer(proposalID, timeout = 2000) {
    const path = api.getProposal + '/' + proposalID + "/proposer"
    const res = await tx.getTx(path, this.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Get a proposal's tally by proposal ID
   * @param {Number} proposalID unique identifier of the proposal whose tally will be queried
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getProposalTally(proposalID, timeout = 2000) {
    const path = api.getProposal + '/' + proposalID + "/tally"
    const res = await tx.getTx(path, this.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Get a proposal's votes by proposal ID
   * @param {Number} proposalID unique identifier of the proposal whose votes will be queried
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getProposalVotes(proposalID, timeout = 2000) {
    const path = api.getProposal + '/' + proposalID + "/votes"
    const res = await tx.getTx(path, this.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Submit a public proposal by a selected committee (must be a member)
   * @param {String} proposal the proposal to be submitted
   * @param {String} committeeID the unique identifier of the committee
   * @param {Object} fee optional fee consisting of { amount: [Coins], gas: String(Number) }
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async submitCommitteeProposal(proposal, committeeID, fee = DEFAULT_FEE, sequence = null) {
    const msgSubmitProposal = msg.kava.newMsgSubmitProposal(
      proposal,
      this.wallet.address,
      committeeID
    );
    return await this.sendTx([msgSubmitProposal], fee, sequence);
  }

  /**
   * Vote on a public proposal by ID
   * @param {String} proposalID the unique identifier of the proposal
   * @param {Object} fee optional fee consisting of { amount: [Coins], gas: String(Number) }
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async voteOnCommitteeProposal(proposalID,  fee = DEFAULT_FEE, sequence = null) {
    const msgVote = msg.kava.newMsgVote(
      proposalID,
      this.wallet.address
    );
    return await this.sendTx([msgVote], fee, sequence);
  }

  /***************************************************
   *                    Issuance
   ***************************************************/
  /**
   * Get the params of the issuance module
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getParamsIssuance(timeout = 2000) {
    const res = await tx.getTx(api.getParamsIssuance, this.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Issues (mints) coins to a recipient address
   * @param {String} tokens coins to be issued
   * @param {String} receiver the recipient of the newly issued coins
   * @param {Object} fee optional fee consisting of { amount: [Coins], gas: String(Number) }
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async issueTokens(tokens, receiver, fee = DEFAULT_FEE, sequence = null) {
    const msgIssueTokens = msg.kava.newMsgIssueTokens(
      this.wallet.address,
      tokens,
      receiver
    );
    return await this.sendTx([msgIssueTokens], fee, sequence);
  }

  /**
   * Redeems tokens
   * @param {String} tokens coins to be redeemed
   * @param {Object} fee optional fee consisting of { amount: [Coins], gas: String(Number) }
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async redeemTokens(tokens, fee = DEFAULT_FEE, sequence = null) {
    const msgRedeemTokens = msg.kava.newMsgRedeemTokens(
      this.wallet.address,
      tokens
    );
    return await this.sendTx([msgRedeemTokens], fee, sequence);
  }

  /**
   * Blocks an address from interacting with a specific token denom
   * @param {String} denom the asset denom the address will be blocked from using
   * @param {String} blockedAddress the address to be blocked
   * @param {Object} fee optional fee consisting of { amount: [Coins], gas: String(Number) }
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async blockAddress(denom, blockedAddress, fee = DEFAULT_FEE, sequence = null) {
    const msgBlockAddress = msg.kava.newMsgBlockAddress(
      this.wallet.address,
      denom,
      blockedAddress
    );
    return await this.sendTx([msgBlockAddress], fee, sequence);
  }

  /**
   * Unblocks an address that's blocked from interacting with a specific token denom
   * @param {String} denom the asset denom the address will be unblocked from using
   * @param {String} address the address to be unblocked
   * @param {Object} fee optional fee consisting of { amount: [Coins], gas: String(Number) }
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async unblockAddress(denom, blockedAddress, fee = DEFAULT_FEE, sequence = null) {
    const msgUnblockAddress = msg.kava.newMsgUnblockAddress(
      this.wallet.address,
      denom,
      blockedAddress
    );
    return await this.sendTx([msgUnblockAddress], fee, sequence);
  }

  /**
   * Updates the paused/unpaused status for a specific token denom
   * @param {String} denom the asset denom whose status will be updated
   * @param {String} status bool representing the token's new active/inactive status
   * @param {Object} fee optional fee consisting of { amount: [Coins], gas: String(Number) }
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async setPauseStatus(denom, status, fee = DEFAULT_FEE, sequence = null) {
    const msgSetPauseStatus = msg.kava.newMsgSetPauseStatus(
      this.wallet.address,
      denom,
      status
    );
    return await this.sendTx([msgSetPauseStatus], fee, sequence);
  }
}

module.exports.KavaClient = KavaClient;
