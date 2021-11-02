import { Coin } from '../../types/Coin';

function newMsgDeposit(
  depositor: string,
  tokenA: Coin,
  tokenB: Coin,
  slippage: string,
  deadline: string
) {
  return {
    type: 'swap/MsgDeposit',
    value: {
      depositor: depositor,
      token_a: tokenA,
      token_b: tokenB,
      slippage: slippage,
      deadline: deadline,
    },
  };
}

function newMsgWithdraw(
  from: string,
  shares: any,
  minTokenA: Coin,
  minTokenB: Coin,
  deadline: string
) {
  return {
    type: 'swap/MsgWithdraw',
    value: {
      from: from,
      shares: shares,
      min_token_a: minTokenA,
      min_token_b: minTokenB,
      deadline: deadline,
    },
  };
}

function newMsgSwapExactForTokens(
  requester: string,
  exactTokenA: Coin,
  tokenB: Coin,
  slippage: string,
  deadline: string
) {
  return {
    type: 'swap/MsgSwapExactForTokens',
    value: {
      requester: requester,
      exact_token_a: exactTokenA,
      token_b: tokenB,
      slippage: slippage,
      deadline: deadline,
    },
  };
}

function newMsgSwapForExactTokens(
  requester: string,
  tokenA: Coin,
  exactTokenB: Coin,
  slippage: string,
  deadline: string
) {
  return {
    type: 'swap/MsgSwapForExactTokens',
    value: {
      requester: requester,
      token_a: tokenA,
      exact_token_b: exactTokenB,
      slippage: slippage,
      deadline: deadline,
    },
  };
}

export const swap = {
  newMsgDeposit,
  newMsgWithdraw,
  newMsgSwapExactForTokens,
  newMsgSwapForExactTokens,
};
