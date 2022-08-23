import { Coin } from '../../types/Coin';

function newMsgDeposit(depositor: string, amount: Coin[]) {
  return {
    depositor,
    amount,
  };
}

function newMsgWithdraw(from: string, amount: Coin[]) {
  return {
    from,
    amount,
  };
}

export const earn = {
  newMsgDeposit,
  newMsgWithdraw,
};
