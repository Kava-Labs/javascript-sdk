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

module.exports.harvest = {
  newMsgDeposit,
  newMsgWithdraw,
  newMsgClaimReward
};
