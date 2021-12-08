import { Coin } from '../../types/Coin';
import { Message } from '../../types/Message';
import { VoteType } from '../../types/VoteType';

const FEE_DEFAULT = { amount: [], gas: '300000' };

/**
 * Creates a new StdTx from some messages with a default fee
 * @param {Object} msgs an array of msgs to be included in the transaction
 * @param {Object} fee optional fee
 * @param {Object} memo optional memo
 * @param {Object} signatures generated when an address signs a data package, required for tx confirmation
 * @return {Promise}
 */
function newStdTx<T = unknown>(
  msgs: Message<T>[],
  fee = FEE_DEFAULT,
  memo = '',
  signatures = null
) {
  return {
    type: 'cosmos-sdk/StdTx',
    value: {
      msg: msgs,
      fee: fee,
      signatures: signatures,
      memo: memo,
    },
  };
}

// newMsgSend creates a new MsgSend
function newMsgSend(address: string, to: string, coins: Coin[]) {
  const sendTx = {
    type: 'cosmos-sdk/MsgSend',
    value: {
      from_address: address,
      to_address: to,
      amount: coins.sort((coinA, coinB) =>
        coinA.denom > coinB.denom ? 1 : -1
      ),
    },
  };
  return sendTx;
}

function newMsgVoteGovernance(
  proposalID: string,
  voter: string,
  voteType: VoteType
) {
  return {
    type: 'cosmos-sdk/MsgVote',
    value: {
      voter: voter,
      proposal_id: proposalID,
      option: voteType,
    },
  };
}

// func NewMsgTransfer(
// 	sourcePort, sourceChannel string,
// 	token sdk.Coin, sender, receiver string,
// 	timeoutHeight clienttypes.Height, timeoutTimestamp uint64,
// ) *MsgTransfer {
// 	return &MsgTransfer{
// 		SourcePort:       sourcePort,
// 		SourceChannel:    sourceChannel,
// 		Token:            token,
// 		Sender:           sender,
// 		Receiver:         receiver,
// 		TimeoutHeight:    timeoutHeight,
// 		TimeoutTimestamp: timeoutTimestamp,
// 	}
// }

function newMsgTransfer(
  sourcePort: string,
  sourceChannel: string,
  token: Coin,
  sender: string,
  receiver: string,
  timeoutHeight: number,
  timeoutTimestamp: number
) {
  return {
    type: 'cosmos-sdk/MsgTransfer',
    value: {
      source_port: sourcePort,
      source_channel: sourceChannel,
      token: token,
      sender: sender,
      receiver: receiver,
      timeoutHeight: timeoutHeight,
      timeoutTimestamp: timeoutTimestamp,
    },
  };
}

export const cosmos = {
  newStdTx,
  newMsgSend,
  newMsgVoteGovernance,
  newMsgTransfer,
};
