import { Coin } from '../../types/Coin';

function newMsgMintDerivative(sender: string, validator: string, amount: Coin) {
  return {
    type: 'liquid/MsgMintDerivative',
    value: {
      sender,
      validator,
      amount,
    },
  };
}

function newMsgBurnDerivative(sender: string, validator: string, amount: Coin) {
  return {
    type: 'liquid/MsgBurnDerivative',
    value: {
      sender,
      validator,
      amount,
    },
  };
}

export const liquid = {
  newMsgMintDerivative,
  newMsgBurnDerivative,
};
