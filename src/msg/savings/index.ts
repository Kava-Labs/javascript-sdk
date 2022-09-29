import { Coin } from '../../types/Coin';

function newMsgDeposit(depositor: string, amount: Coin[]) {
  return {
    type: 'savings/MsgDeposit',
    value: {
      depositor,
      amount,
    },
  };
}

function newMsgWithdraw(depositor: string, amount: Coin[]) {
  return {
    type: 'savings/MsgWithdraw',
    value: {
      depositor,
      amount,
    },
  };
}

export const savings = {
  newMsgDeposit,
  newMsgWithdraw,
};
