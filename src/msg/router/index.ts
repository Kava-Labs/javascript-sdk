import { Coin } from '../../types/Coin';

function newMsgMintDeposit(
  depositor: string,
  validator: string,
  amount?: Coin
) {
  return {
    type: 'router/MsgMintDeposit',
    value: {
      depositor,
      validator,
      amount,
    },
  };
}

function newMsgDelegateMintDeposit(
  depositor: string,
  validator: string,
  amount?: Coin
) {
  return {
    type: 'router/MsgDelegateMintDeposit',
    value: {
      depositor,
      validator,
      amount,
    },
  };
}

function newMsgWithdrawBurn(from: string, validator: string, amount?: Coin) {
  return {
    type: 'router/MsgWithdrawBurn',
    value: {
      from,
      validator,
      amount,
    },
  };
}

function newMsgWithdrawBurnUndelegate(
  from: string,
  validator: string,
  amount?: Coin
) {
  return {
    type: 'router/MsgWithdrawBurnUndelegate',
    value: {
      from,
      validator,
      amount,
    },
  };
}

export const router = {
  newMsgMintDeposit,
  newMsgDelegateMintDeposit,
  newMsgWithdrawBurn,
  newMsgWithdrawBurnUndelegate,
};
