function newMsgDeposit(depositor: string, amount: number) {
  return {
    type: 'hard/MsgDeposit',
    value: {
      depositor: depositor,
      amount: amount
    },
  };
};

function newMsgWithdraw(depositor: string, amount: number) {
  return {
    type: 'hard/MsgWithdraw',
    value: {
      depositor: depositor,
      amount: amount
    },
  };
};

function newMsgBorrow(borrower: string, amount: number) {
  return {
    type: 'hard/MsgBorrow',
    value: {
      borrower: borrower,
      amount: amount
    },
  };
};

function newMsgRepay(sender: string, owner: string, amount: number) {
  return {
    type: 'hard/MsgRepay',
    value: {
      sender: sender,
      owner: owner,
      amount: amount
    },
  };
};

function newMsgLiquidate(keeper: string, borrower: string) {
  return {
    type: 'hard/MsgLiquidate',
    value: {
      keeper: keeper,
      borrower: borrower
    }
  }
}

export const hard = {
  newMsgDeposit,
  newMsgWithdraw,
  newMsgBorrow,
  newMsgRepay,
  newMsgLiquidate
};
