import { tx } from './tx';
import { msg } from './msg';
import { utils } from './utils';
import { crypto } from './crypto';
import { KavaClient } from './client';
import * as encoding from './encoding';
export * from './types';

const Kava = {
  tx,
  msg,
  utils,
  crypto,
  KavaClient,
};

export { tx, msg, utils, crypto, encoding, KavaClient };

export default Kava;
