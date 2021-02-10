function newMsgDeposit(depositor, amount) {
  return {
    type: 'hard/MsgDeposit',
    value: {
      depositor: depositor,
      amount: amount
    },
  };
};

function newMsgWithdraw(depositor, amount) {
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

function newMsgRepay(sender, owner, amount) {
  return {
    type: 'hard/MsgRepay',
    value: {
      sender: sender,
      owner: owner,
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
