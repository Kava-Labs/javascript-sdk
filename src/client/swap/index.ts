import { tx } from '../../tx';
import { msg } from '../../msg';
import { KavaClient } from '..';
import { Coin } from '../../types/Coin';

const DEFAULT_GAS = 300000;

const api = {
  getParams: '/swap/parameters',
  getDeposits: '/swap/deposits',
  getPool: '/swap/pool',
  getPools: '/swap/pools',
};

export class Swap {
  // @ts-ignore
  public kavaClient: KavaClient;
  public static instance: Swap;

  constructor(kavaClient: KavaClient) {
    if (!Swap.instance) {
      this.kavaClient = kavaClient;
      Swap.instance = this;
    }
    return Swap.instance;
  }

  /**
   * Get the params of the swap module
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
   * Get swap deposits
   * @param {Object} args optional arguments {owner: "kava1l0xsq2z7gqd7yly0g40y5836g0appumark77ny", pool: "bnb:usdx"}
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getDeposits(args = {}, timeout = 2000) {
    const res = await tx.getTx(
      api.getDeposits,
      this.kavaClient.baseURI,
      timeout,
      args
    );
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Get swap pool
   * @param {Object} args required arguments {pool: "bnb:usdx"}
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getPool(args = {}, timeout = 2000) {
    const res = await tx.getTx(
      api.getPool,
      this.kavaClient.baseURI,
      timeout,
      args
    );
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Get swap pools
   * @param {Number} timeout request is attempted every 1000 milliseconds until millisecond timeout is reached
   * @return {Promise}
   */
  async getPools(args = {}, timeout = 2000) {
    const res = await tx.getTx(
      api.getPools,
      this.kavaClient.baseURI,
      timeout,
      args
    );
    if (res && res.data) {
      return res.data.result;
    }
  }

  /**
   * Deposit funds to a liquidity pool
   * @param {Object} amount of token a coins to be deposited
   * @param {Object} amount of token b coins to be deposited
   * @param {string} max slippage you're willing to accept
   * @param {string} deadline time to complete the transaction (unix timestamp seconds, UTC timezone)
   * @param {Number} gas optional gas amount
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async deposit(
    tokenA: Coin,
    tokenB: Coin,
    slippage: string,
    deadline: string,
    gas = DEFAULT_GAS,
    sequence = null
  ) {
    if (!this.kavaClient.wallet) {
      throw Error('Wallet has not yet been initialized');
    }
    const msgDeposit = msg.swap.newMsgDeposit(
      this.kavaClient.wallet.address,
      tokenA,
      tokenB,
      slippage,
      deadline
    );
    const fee = { amount: [], gas: String(gas) };
    return await this.kavaClient.sendTx([msgDeposit], fee, sequence);
  }

  /**
   * Withdraw funds from a liquidity pool
   * @param {Object} amount the coins to be deposited
   * @param {Number} number of shares to be withdrawn
   * @param {Object} min amount of token a coins to be withdrawn
   * @param {Object} min amount of token b coins to be withdrawn
   * @param {string} deadline time to complete the transaction (unix timestamp seconds, UTC timezone)
   * @param {Number} gas optional gas amount
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async withdraw(
    shares: any,
    minTokenA: Coin,
    minTokenB: Coin,
    deadline: string,
    gas = DEFAULT_GAS,
    sequence = null
  ) {
    if (!this.kavaClient.wallet) {
      throw Error('Wallet has not yet been initialized');
    }
    const msgWithdraw = msg.swap.newMsgWithdraw(
      this.kavaClient.wallet.address,
      shares,
      minTokenA,
      minTokenB,
      deadline
    );
    const fee = { amount: [], gas: String(gas) };
    return await this.kavaClient.sendTx([msgWithdraw], fee, sequence);
  }

  /**
   * Swap an exact number of token a for an estimated amount of token b
   * @param {Object} amount of tokens to be be put into the system
   * @param {Object} expected amount of coins to be returned
   * @param {string} max slippage you're willing to accept
   * @param {string} deadline time to complete the transaction (unix timestamp seconds, UTC timezone)
   * @param {Number} gas optional gas amount
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async swapExactForTokens(
    exactTokenA: Coin,
    tokenB: Coin,
    slippage: string,
    deadline: string,
    gas = DEFAULT_GAS,
    sequence = null
  ) {
    if (!this.kavaClient.wallet) {
      throw Error('Wallet has not yet been initialized');
    }
    const msgSwapExactForTokens = msg.swap.newMsgSwapExactForTokens(
      this.kavaClient.wallet.address,
      exactTokenA,
      tokenB,
      slippage,
      deadline
    );
    const fee = { amount: [], gas: String(gas) };
    return await this.kavaClient.sendTx([msgSwapExactForTokens], fee, sequence);
  }

  /**
   * Swap an exact number of token b to be returned for an for an estimated amount of token a to input
   * @param {Object} expected amount of coins to be put into the system
   * @param {Object} amount of tokens to be returned from the system
   * @param {string} max slippage you're willing to accept
   * @param {string} deadline time to complete the transaction (unix timestamp seconds, UTC timezone)
   * @param {Number} gas optional gas amount
   * @param {String} sequence optional account sequence
   * @return {Promise}
   */
  async swapForExactTokens(
    tokenA: Coin,
    exactTokenB: Coin,
    slippage: string,
    deadline: string,
    gas = DEFAULT_GAS,
    sequence = null
  ) {
    if (!this.kavaClient.wallet) {
      throw Error('Wallet has not yet been initialized');
    }
    const msgSwapForExactTokens = msg.swap.newMsgSwapForExactTokens(
      this.kavaClient.wallet.address,
      tokenA,
      exactTokenB,
      slippage,
      deadline
    );
    const fee = { amount: [], gas: String(gas) };
    return await this.kavaClient.sendTx([msgSwapForExactTokens], fee, sequence);
  }
}

module.exports.Swap = Swap;
