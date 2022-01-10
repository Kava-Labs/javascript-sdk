import { AuthInfo } from '../proto/cosmos/tx/v1beta1/tx';

export const encodAuthInfo = (authInfo: AuthInfo) => {
  return AuthInfo.encode(authInfo);
};
