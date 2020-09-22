function newMsgDeposit(depositor, amount, depositType) {
  return {
    type: 'hvt/MsgDeposit',
    value: {
      depositor: depositor,
      amount: amount,
      deposit_type: depositType,
    },
  };
};

function newMsgWithdraw(depositor, amount, depositType) {
  return {
    type: 'hvt/MsgWithdraw',
    value: {
      depositor: depositor,
      amount: amount,
      deposit_type: depositType,
    },
  };
};

function newMsgClaimReward(sender, receiver, depositDenom, rewardMultiplier, depositType) {
  return {
    type: 'hvt/MsgClaimReward',
    value: {
      sender: sender,
      receiver: receiver,
      deposit_denom: depositDenom,
      reward_multiplier: rewardMultiplier,
      deposit_type: depositType,
    },
  };
};

module.exports.harvest = {
  newMsgDeposit,
  newMsgWithdraw,
  newMsgClaimReward
};
