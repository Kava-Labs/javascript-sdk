import { Tx } from '../proto/cosmos/tx/v1beta1/tx';

export const encodeTransaction = (transaction: Tx) => {
  return Tx.encode(transaction);
};
