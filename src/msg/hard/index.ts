import { Coin } from '../../types/Coin';

function Deposit(depositor: string, amount: Coin[]) {
  return {
    type: 'hard/MsgDeposit',
    value: {
      depositor: depositor,
      amount: amount,
    },
  };
}

function Withdraw(depositor: string, amount: Coin[]) {
  return {
    type: 'hard/MsgWithdraw',
    value: {
      depositor: depositor,
      amount: amount,
    },
  };
}

function Borrow(borrower: string, amount: Coin[]) {
  return {
    type: 'hard/MsgBorrow',
    value: {
      borrower: borrower,
      amount: amount,
    },
  };
}

function Repay(sender: string, owner: string, amount: Coin[]) {
  return {
    type: 'hard/MsgRepay',
    value: {
      sender: sender,
      owner: owner,
      amount: amount,
    },
  };
}

function Liquidate(keeper: string, borrower: string) {
  return {
    type: 'hard/MsgLiquidate',
    value: {
      keeper: keeper,
      borrower: borrower,
    },
  };
}

export const hard = {
  Deposit,
  Withdraw,
  Borrow,
  Repay,
  Liquidate,
};
