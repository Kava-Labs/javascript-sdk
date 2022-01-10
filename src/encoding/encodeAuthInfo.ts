import { AuthInfo } from '../proto/cosmos/tx/v1beta1/tx';

export const encodeAuthInfo = (authInfo: AuthInfo) => {
  return AuthInfo.encode(authInfo).finish();
};
