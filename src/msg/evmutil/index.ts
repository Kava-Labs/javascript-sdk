function newMsgConvertERC20ToCoin(
  initiator: string,
  receiver: string,
  kavaErc20Address: string,
  amount: string
) {
  return {
    type: 'evmutil/MsgConvertERC20ToCoin',
    value: {
      initiator,
      receiver,
      kavaErc20Address,
      amount
    },
  };
}

function newMsgConvertCoinToERC20(
  initiator: string,
  receiver: string,
  kavaErc20Address: string,
  amount: string
) {
  return {
    type: 'evmutil/MsgConvertCoinToERC20',
    value: {
      initiator,
      receiver,
      kavaErc20Address,
      amount
    },
  };
};

export const evmutil = {
  newMsgConvertERC20ToCoin,
  newMsgConvertCoinToERC20
};
