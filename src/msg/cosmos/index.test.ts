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

  describe('newMsgTransfer', () => {
    it('should generate a well-formed transfer', () => {
      const coin = {
        denom: 'ukava',
        amount: '10000000',
      };
      const message = cosmos.newMsgTransfer(
        'transfer',
        'channel-0',
        coin,
        'kava1w66puffhccjck70hw75wu3v92tshw5rmdxp8hb',
        'kava1a22puffhccjck70hw75wu3v92tshw5rmdxp6xz',
        1638988347480000
      );
      const expected = {
        type: 'cosmos-sdk/MsgTransfer',
        value: {
          source_port: 'transfer',
          source_channel: 'channel-0',
          token: {
            denom: 'ukava',
            amount: '10000000',
          },
          sender: 'kava1w66puffhccjck70hw75wu3v92tshw5rmdxp8hb',
          receiver: 'kava1a22puffhccjck70hw75wu3v92tshw5rmdxp6xz',
          timeoutHeight: 0,
          timeoutTimestamp: 1638988347480000,
        },
      };
      expect(message).toEqual(expected);
    });
  });
});
