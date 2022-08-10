import Kava from './';
import { utils, crypto, msg, tx } from './';

describe('SDK exports', () => {
  it('should export Kava as a default', () => {
    expect(Kava).toBeDefined();
  });
  it('should contain expected modules', () => {
    expect(Kava.utils).toBeDefined();
    expect(Kava.tx).toBeDefined();
    expect(Kava.msg).toBeDefined();
    expect(Kava.crypto).toBeDefined();
  });
  it('should export each module individually', () => {
    expect(utils).toBeDefined();
    expect(tx).toBeDefined();
    expect(msg).toBeDefined();
    expect(crypto).toBeDefined();
  });

  it('derives the correct kava address from ox address', () => {
    expect(
      utils.kavaToEthAddress('kava1vlpsrmdyuywvaqrv7rx6xga224sqfwz3fyfhwq')
    ).toEqual('0x67C301eDA4E11Cce806Cf0CDa323aA556004b851');
  });

  it('derives the correct 0x address from a kava address', () => {
    expect(
      utils.ethToKavaAddress('0x7Bbf300890857b8c241b219C6a489431669b3aFA')
    ).toEqual('kava10wlnqzyss4accfqmyxwx5jy5x9nfkwh6qm7n4t');
  });
});
