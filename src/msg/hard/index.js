function newMsgDeposit(depositor, amount, depositType) {
  return {
    type: 'hard/MsgDeposit',
    value: {
      depositor: depositor,
      amount: amount
    },
  };
};

function newMsgWithdraw(depositor, amount, depositType) {
  return {
    type: 'hard/MsgWithdraw',
    value: {
      depositor: depositor,
      amount: amount
    },
  };
};

function newMsgBorrow(borrower, amount) {
  return {
    type: 'hard/MsgBorrow',
    value: {
      borrower: borrower,
      amount: amount
    },
  };
};

function newMsgRepay(sender, amount) {
  return {
    type: 'hard/MsgRepay',
    value: {
      sender: sender,
      amount: amount
    },
  };
};

function newMsgLiquidate(keeper, borrower) {
  return {
    type: 'hard/MsgLiquidate',
    value: {
      keeper: keeper,
      borrower: borrower
    }
  }
}

module.exports.hard = {
  newMsgDeposit,
  newMsgWithdraw,
  newMsgBorrow,
  newMsgRepay,
  newMsgLiquidate
};
