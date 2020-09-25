const tx = require('../../tx').tx;
const msg = require('../../msg').msg;

const DEFAULT_GAS = 300000;

const api = {
    getParams: '/harvest/parameters',
    getModAccounts: 'harvest/accounts',
    getDeposits: 'harvest/deposits',
    getClaims: 'harvest/claims'
  };

class Harvest {

  /**
   * @param {Object} kavaClient
   */
  constructor(kavaClient) {
    if (!Harvest.instance) {
      this.kavaClient = kavaClient;
      Harvest.instance = this;
    }
    return Harvest.instance;
  }

  /**
   * Get the params of the harvest module
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
   * Get module accounts associated with the harvest module
   * @param {Object} args optional arguments {name: "harvest"|"harvest_lp_distribution"}
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
   * Get harvest deposits
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
   * Get harvest deposits
   * @param {Object} args optional arguments {deposit_denom: "btc", deposit_type: "btc-a", owner: "kava1l0xsq2z7gqd7yly0g40y5836g0appumark77ny"}
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getClaims(args = {}, timeout = 2000) {
    const res = await tx.getTx(api.getClaims, this.kavaClient.baseURI, timeout, args);
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Deposit funds to a liquidity pool
   * @param {Object} amount the coins to be deposited
   * @param {String} depositType type of deposit {"lp" | "stake"}
   * @param {Number} gas optional gas amount
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async deposit(amount, depositType, gas = DEFAULT_GAS, sequence = null) {
    const msgDeposit = msg.harvest.newMsgDeposit(
      this.kavaClient.wallet.address,
      amount,
      depositType,
    );
    const fee = { amount: [], gas: String(gas) };
    return await this.kavaClient.sendTx([msgDeposit], fee, sequence);
  }

  /**
   * Withdraw funds from a liquidity pool
   * @param {Object} amount the coins to be deposited
   * @param {String} depositType type of deposit {"lp" | "stake"}
   * @param {Number} gas optional gas amount
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async withdraw(amount, depositType, gas = DEFAULT_GAS, sequence = null) {
    const msgWithdraw = msg.harvest.newMsgWithdraw(
      this.kavaClient.wallet.address,
      amount,
      depositType,
    );
    const fee = { amount: [], gas: String(gas) };
    return await this.kavaClient.sendTx([msgWithdraw], fee, sequence);
  }

  /**
   * Claim a reward by denom and type
   * @param {String} receiver the recipient's Kava address
   * @param {String} depositDenom the denom of the asset to be claimed
   * @param {String} depositType type of deposit {"lp" | "stake"}
   * @param {String} multiplier the multiplier to apply {"high" | "medium" | "low"}
   * @param {Number} gas optional gas amount
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async claim(receiver, depositDenom, depositType, multiplier, gas = DEFAULT_GAS, sequence = null) {
    const msgClaimReward = msg.harvest.newMsgClaimReward(
      this.kavaClient.wallet.address,
      receiver,
      depositDenom,
      multiplier,
      depositType
    );
    const fee = { amount: [], gas: String(gas) };
    return await this.kavaClient.sendTx([msgClaimReward], fee, sequence);
  }
}

module.exports.Harvest = Harvest;
