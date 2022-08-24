import { Strategy, Coin } from '../../types';

function newMsgDeposit(depositor: string, amount: Coin[], strategy: Strategy) {
  return {
    depositor,
    amount,
    strategy,
  };
}

function newMsgWithdraw(from: string, amount: Coin[], strategy: Strategy) {
  return {
    from,
    amount,
    strategy,
  };
}

export const earn = {
  newMsgDeposit,
  newMsgWithdraw,
};
