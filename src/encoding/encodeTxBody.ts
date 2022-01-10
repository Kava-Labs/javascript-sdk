import { TxBody } from '../proto/cosmos/tx/v1beta1/tx';

export const encodeTxBody = (txBody: TxBody) => {
  return TxBody.encode(txBody);
};
