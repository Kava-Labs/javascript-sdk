import { cosmos } from '.';

describe('Cosmos messages', () => {
  describe('newMsgSend', () => {
    it('should sort the coins passed in by denom', () => {
      const coins = [
        {
          denom: 'ukava',
          amount: '30000000',
        },
        {
          denom: 'btcb',
          amount: '10000000',
        },
        {
          denom: 'xrpb',
          amount: '40000000',
        },
        {
          denom: 'swp',
          amount: '20000000',
        },
      ];
      const message = cosmos.newMsgSend('kavafrom', 'kavato', coins);
      expect(message).toStrictEqual({
        type: 'cosmos-sdk/MsgSend',
        value: {
          from_address: 'kavafrom',
          to_address: 'kavato',
          amount: [
            {
              denom: 'btcb',
              amount: '10000000',
            },
            {
              denom: 'swp',
              amount: '20000000',
            },
            {
              denom: 'ukava',
              amount: '30000000',
            },
            {
              denom: 'xrpb',
              amount: '40000000',
            },
          ],
        },
      });
    });
  });
});
