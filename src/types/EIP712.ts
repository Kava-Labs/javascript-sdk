import { Coin } from './Coin';

type Fee = {
  feePayer: string;
  amount: Coin[];
  gas: string;
};

export type EIP712Fee = Fee[];

type Domain = {
  name: string;
  version: string;
  chainId: 'string';
  verifyingContract: string;
  salt: string;
};

export type EIP712Domain = Domain[];
