const sig = require('@kava-labs/sig');
const _ = require('lodash');
const tx = require('../tx').tx;
const msg = require('../msg').msg;

const defaultPrefix = 'kava';
const defaultDerivationPath = "m/44'/459'/0'/0/0";

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
  getAccount: '/auth/accounts',
  // getBalances: '/bank/balances', TODO: Will be supported soon.
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
  getCDPs: '/cdp/cdps/denom',
  getAuction: '/auction/auctions',
  getAuctions: '/auction/auctions',
  getClaims: '/incentive/claims',
  getRewardPeriods: '/incentive/rewardperiods',
  getClaimPeriods: '/incentive/claimperiods',
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
   * @param {String} prefix optional param for custom address prefix
   * @param {String} derivationPath optional param for custom derivation path
   * @return {Promise}
   */
  setWallet(
    mnemonic,
    password = '',
    prefix = defaultPrefix,
    derivationPath = defaultDerivationPath
  ) {
    if (!mnemonic) {
      throw new Error('mnemonic cannot be undefined');
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

  // /**  TODO: Will be supported soon.
  //  * Get an account's balances
  //  * @param {String} address account to query
  //  * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
  //  * @return {Promise}
  //  */
  // async getBalances(address, timeout = 2000) {
  //   const path = api.getBalances + '/' + address;
  //   const res = await tx.getTx(path, this.baseURI, timeout);
  //   if (res && res.data) {
  //     return res.data.result;
  //   }
  // }

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
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async transfer(recipient, coins, sequence = null) {
    const msgSend = msg.newMsgSend(this.wallet.address, recipient, coins);
    const rawTx = msg.newStdTx([msgSend]);
    const signInfo = await this.prepareSignInfo(sequence);
    const signedTx = tx.signTx(rawTx, signInfo, this.wallet);
    return await tx.broadcastTx(signedTx, this.baseURI, this.broadcastMode);
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
    return await tx.broadcastTx(signedTx, this.baseURI, this.broadcastMode);
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
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @param {Object} args request args as JSON. Example: {type: "collateral", denom: "btc"}
   * @return {Promise}
   */
  async getAuctions(timeout = 2000, args = {}) {
    const res = await tx.getTx(api.getAuctions, this.baseURI, timeout, args);
    if (res && res.data) {
      return res.data.result;
    }
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
    return await tx.broadcastTx(signedTx, this.baseURI, this.broadcastMode);
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
   * @param {String} collateralDenom denom of the CDP's collateral asset
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getCDP(owner, collateralDenom, timeout = 2000) {
    const path = api.getCDP + '/' + owner + '/' + collateralDenom;
    const res = await tx.getTx(path, this.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Get all CDPs for an asset
   * @param {String} collateralDenom denom of the CDP's collateral asset
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getCDPs(collateralDenom, timeout = 2000) {
    const path = api.getCDPs + '/' + collateralDenom;
    const res = await tx.getTx(path, this.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
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
    const fee = { amount: [], gas: '250000' };
    const rawTx = msg.newStdTx([msgCreateCDP], fee);
    const signInfo = await this.prepareSignInfo(sequence);
    const signedTx = tx.signTx(rawTx, signInfo, this.wallet);
    return await tx.broadcastTx(signedTx, this.baseURI, this.broadcastMode);
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
    const fee = { amount: [], gas: '250000' };
    const rawTx = msg.newStdTx([msgDeposit], fee);
    const signInfo = await this.prepareSignInfo(sequence);
    const signedTx = tx.signTx(rawTx, signInfo, this.wallet);
    return await tx.broadcastTx(signedTx, this.baseURI, this.broadcastMode);
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
    const fee = { amount: [], gas: '250000' };
    const rawTx = msg.newStdTx([msgWithdraw], fee);
    const signInfo = await this.prepareSignInfo(sequence);
    const signedTx = tx.signTx(rawTx, signInfo, this.wallet);
    return await tx.broadcastTx(signedTx, this.baseURI, this.broadcastMode);
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
    const fee = { amount: [], gas: '250000' };
    const rawTx = msg.newStdTx([msgDrawDebt], fee);
    const signInfo = await this.prepareSignInfo(sequence);
    const signedTx = tx.signTx(rawTx, signInfo, this.wallet);
    return await tx.broadcastTx(signedTx, this.baseURI, this.broadcastMode);
  }

  /**
   * Repay debt by returning principal to a collateralized debt position
   * @param {String} cdpDenom the denom of this CDP's collateral asset
   * @param {String} payment the amount of pricipal to be repaid
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async repayDebt(cdpDenom, payment, sequence = null) {
    const msgRepayDebt = msg.newMsgRepayDebt(
      this.wallet.address,
      payment,
      cdpDenom
    );
    const fee = { amount: [], gas: '250000' };
    const rawTx = msg.newStdTx([msgRepayDebt], fee);
    const signInfo = await this.prepareSignInfo(sequence);
    const signedTx = tx.signTx(rawTx, signInfo, this.wallet);
    return await tx.broadcastTx(signedTx, this.baseURI, this.broadcastMode);
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
  async getSwaps(timeout = 2000, args = {}) {
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
      heightSpan
    );
    const rawTx = msg.newStdTx([msgCreateAtomicSwap]);
    const signInfo = await this.prepareSignInfo(sequence);
    const signedTx = tx.signTx(rawTx, signInfo, this.wallet);
    return await tx.broadcastTx(signedTx, this.baseURI, this.broadcastMode);
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
    return await tx.broadcastTx(signedTx, this.baseURI, this.broadcastMode);
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
    return await tx.broadcastTx(signedTx, this.baseURI, this.broadcastMode);
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
   * Get the params of the incentive module
   * @param {String} address the address to be queried
   * @param {String} denom name of the asset to be queried
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getClaims(address, denom, timeout = 2000) {
    const path = api.getClaims + '/' + address + '/' + denom;
    const res = await tx.getTx(api.getClaims, this.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Get all incentive reward periods
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getRewardPeriods(timeout = 2000) {
    const res = await tx.getTx(api.getRewardPeriods, this.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Get all incentive claim periods
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getClaimPeriods(timeout = 2000) {
    const res = await tx.getTx(api.getClaimPeriods, this.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Claim a reward by denom
   * @param {String} denom the name of the asset to be claimed
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async claimReward(denom, sequence = null) {
    const msgClaimReward = msg.newMsgClaimReward(
      this.wallet.address,
      denom
    );
    const rawTx = msg.newStdTx([msgClaimReward]);
    const signInfo = await this.prepareSignInfo(sequence);
    const signedTx = tx.signTx(rawTx, signInfo, this.wallet);
    return await tx.broadcastTx(signedTx, this.baseURI, this.broadcastMode);
  }

 /***************************************************
   *                    Committee
   ***************************************************/
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
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async submitCommitteeProposal(proposal, committeeID, sequence = null) {
    const msgSubmitProposal = msg.newMsgSubmitProposal(
      proposal,
      this.wallet.address,
      committeeID
    );
    const rawTx = msg.newStdTx([msgSubmitProposal]);
    const signInfo = await this.prepareSignInfo(sequence);
    const signedTx = tx.signTx(rawTx, signInfo, this.wallet);
    return await tx.broadcastTx(signedTx, this.baseURI, this.broadcastMode);
  }

  /**
   * Vote on a public proposal by ID
   * @param {String} proposalID the unique identifier of the proposal
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async voteOnCommitteeProposal(proposalID, sequence = null) {
    const msgVote = msg.newMsgVote(
      proposalID,
      this.wallet.address
    );
    const rawTx = msg.newStdTx([msgVote]);
    const signInfo = await this.prepareSignInfo(sequence);
    const signedTx = tx.signTx(rawTx, signInfo, this.wallet);
    return await tx.broadcastTx(signedTx, this.baseURI, this.broadcastMode);
  }
}

module.exports.KavaClient = KavaClient;