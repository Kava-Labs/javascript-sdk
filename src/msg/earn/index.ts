import { Strategy, Coin } from '../../types';

function newMsgDeposit(depositor: string, amount: Coin, strategy: Strategy) {
  return {
    type: 'earn/MsgDeposit',
    value: {
      depositor,
      amount,
      strategy,
    },
  };
}

function newMsgWithdraw(from: string, amount: Coin, strategy: Strategy) {
  return {
    type: 'earn/MsgWithdraw',
    value: {
      from,
      amount,
      strategy,
    },
  };
}

export const earn = {
  newMsgDeposit,
  newMsgWithdraw,
};
