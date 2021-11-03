import Kava from './';
import { utils, crypto, msg, tx } from './';

describe('SDK exports', () => {
    it('should export Kava as a default', () => {
        expect(Kava).toBeDefined();
    })
    it('should contain expected modules', () => {
        expect(Kava.utils).toBeDefined();
        expect(Kava.tx).toBeDefined();
        expect(Kava.msg).toBeDefined();
        expect(Kava.crypto).toBeDefined();
    })
    it('should export each module individually', () => {
        expect(utils).toBeDefined();
        expect(tx).toBeDefined();
        expect(msg).toBeDefined();
        expect(crypto).toBeDefined();
    })
});