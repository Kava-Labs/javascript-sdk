function newMsgDeposit(depositor, amount, depositType) {
  return {
    type: 'harvest/MsgDeposit',
    value: {
      depositor: depositor,
      amount: amount,
      deposit_type: depositType,
    },
  };
};

function newMsgWithdraw(depositor, amount, depositType) {
  return {
    type: 'harvest/MsgWithdraw',
    value: {
      depositor: depositor,
      amount: amount,
      deposit_type: depositType,
    },
  };
};

function newMsgClaimReward(sender, receiver, depositDenom, multiplierName, depositType) {
  return {
    type: 'harvest/MsgClaimReward',
    value: {
      sender: sender,
      receiver: receiver,
      deposit_denom: depositDenom,
      multiplier_name: multiplierName,
      deposit_type: depositType,
    },
  };
};

function newMsgBorrow(borrower, amount) {
  return {
    type: 'harvest/MsgBorrow',
    value: {
      borrower: borrower,
      amount: amount
    },
  };
};

function newMsgRepay(sender, amount) {
  return {
    type: 'harvest/MsgRepay',
    value: {
      sender: sender,
      amount: amount
    },
  };
};

module.exports.harvest = {
  newMsgDeposit,
  newMsgWithdraw,
  newMsgClaimReward,
  newMsgBorrow,
  newMsgRepay
};
