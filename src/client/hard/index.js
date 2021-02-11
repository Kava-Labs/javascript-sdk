const tx = require('../../tx').tx;
const msg = require('../../msg').msg;

const DEFAULT_GAS = 300000;

const api = {
    getParams: '/hard/parameters',
    getModAccounts: 'hard/accounts',
    getDeposits: 'hard/deposits',
    getTotalDeposited: 'hard/total-deposited',
    getBorrows: 'hard/borrows',
    getTotalBorrowed: 'hard/total-borrowed',
  };

class Hard {

  /**
   * @param {Object} kavaClient
   */
  constructor(kavaClient) {
    if (!Hard.instance) {
      this.kavaClient = kavaClient;
      Hard.instance = this;
    }
    return Hard.instance;
  }

  /**
   * Get the params of the hard module
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getParams(timeout = 2000) {
    const res = await tx.getTx(api.getParams, this.kavaClient.baseURI, timeout);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Get module accounts associated with the hard module
   * @param {Object} args optional arguments {name: "hard"|"hard_lp_distribution"}
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getModAccounts(args = {}, timeout = 2000) {
    const res = await tx.getTx(api.getModAccounts, this.kavaClient.baseURI, timeout, args);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Get hard deposits
   * @param {Object} args optional arguments {deposit_denom: "btc", deposit_type: "btc-a", owner: "kava1l0xsq2z7gqd7yly0g40y5836g0appumark77ny"}
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getDeposits(args = {}, timeout = 2000) {
    const res = await tx.getTx(api.getDeposits, this.kavaClient.baseURI, timeout, args);
    if (res && res.data) {
      return res.data.result;
    }
  }

    /**
   * Get hard total-deposited
   * @param {Object} args optional arguments {denom: "btc"}
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getTotalDeposited(args = {}, timeout = 2000) {
    const res = await tx.getTx(api.getTotalDeposited, this.kavaClient.baseURI, timeout, args);
    if (res && res.data) {
      return res.data.result;
    }
  }

   /**
   * Get hard borrows
   * @param {Object} args optional arguments {owner: "kava1l0xsq2z7gqd7yly0g40y5836g0appumark77ny" denom: "btc" }
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getBorrows(args = {}, timeout = 2000) {
    const res = await tx.getTx(api.getBorrows, this.kavaClient.baseURI, timeout, args);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Get hard total-borrowed
   * @param {Object} args optional arguments {denom: "btc"}
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getTotalBorrowed(args = {}, timeout = 2000) {
    const res = await tx.getTx(api.getTotalBorrowed, this.kavaClient.baseURI, timeout, args);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Deposit funds to a liquidity pool
   * @param {Object} amount the coins to be deposited
   * @param {Number} gas optional gas amount
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async deposit(amount, gas = DEFAULT_GAS, sequence = null) {
    const msgDeposit = msg.hard.newMsgDeposit(
      this.kavaClient.wallet.address,
      amount,
    );
    const fee = { amount: [], gas: String(gas) };
    return await this.kavaClient.sendTx([msgDeposit], fee, sequence);
  }

  /**
   * Withdraw funds from a liquidity pool
   * @param {Object} amount the coins to be deposited
   * @param {Number} gas optional gas amount
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async withdraw(amount, gas = DEFAULT_GAS, sequence = null) {
    const msgWithdraw = msg.hard.newMsgWithdraw(
      this.kavaClient.wallet.address,
      amount,
    );
    const fee = { amount: [], gas: String(gas) };
    return await this.kavaClient.sendTx([msgWithdraw], fee, sequence);
  }

  /**
   * Borrow available funds from a liquidity pool
   * @param {Object} amount the coins to be deposited
   * @param {Number} gas optional gas amount
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async borrow(amount, gas = DEFAULT_GAS, sequence = null) {
    const msgBorrow = msg.hard.newMsgBorrow(
      this.kavaClient.wallet.address,
      amount,
    );
    const fee = { amount: [], gas: String(gas) };
    return await this.kavaClient.sendTx([msgBorrow], fee, sequence);
  }

  /**
   * Repay funds borrowed from a liquidity pool
   * @param {Object} amount the coins to be deposited
   * @param {Number} gas optional gas amount
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async repay(amount, gas = DEFAULT_GAS, sequence = null) {
    const msgRepay = msg.hard.newMsgRepay(
      this.kavaClient.wallet.address,
      amount,
    );
    const fee = { amount: [], gas: String(gas) };
    return await this.kavaClient.sendTx([msgRepay], fee, sequence);
  }

  /**
   * Attempt to liquidate a borrower that's over their loan-to-value ratio
   * @param {String} borrower the borrower to be liquidated
   * @param {Number} gas optional gas amount
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async liquidate(borrower, gas = DEFAULT_GAS, sequence = null) {
    const msgLiquidate = msg.hard.newMsgLiquidate(
      this.kavaClient.wallet.address,
      borrower,
    );
    const fee = { amount: [], gas: String(gas) };
    return await this.kavaClient.sendTx([msgLiquidate], fee, sequence);
  }
}

module.exports.Hard = Hard;
