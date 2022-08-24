import { InternalEVMAddress, Coin } from '../../types';

function newMsgConvertERC20ToCoin(
  initiator: InternalEVMAddress,
  receiver: string,
  contractAddr: InternalEVMAddress,
  amount: string
) {
  return {
    type: 'evmutil/MsgConvertERC20ToCoin',
    value: {
      initiator,
      receiver,
      contractAddr,
      amount,
    },
  };
}

function newMsgConvertCoinToERC20(
  initiator: InternalEVMAddress,
  receiver: string,
  amount: Coin
) {
  return {
    type: 'evmutil/MsgConvertCoinToERC20',
    value: {
      initiator,
      receiver,
      amount,
    },
  };
}

export const evmutil = {
  newMsgConvertERC20ToCoin,
  newMsgConvertCoinToERC20,
};
