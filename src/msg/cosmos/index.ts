import _ from 'lodash';
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
function newStdTx(
  msgs: any[],
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
function newMsgSend(address: string, to: string, coins: any[]) {
  const sendTx = {
    type: 'cosmos-sdk/MsgSend',
    value: {
      from_address: address,
      to_address: to,
      amount: _.sortBy(coins, 'denom'),
    },
  };
  return sendTx;
}

function newMsgVoteGovernance(proposalID: string, voter: string, voteType: VoteType) {
  return {
    type: 'cosmos-sdk/MsgVote',
    value: {
      voter: voter,
      proposal_id: proposalID,
      option: voteType,
    },
  };
}

export const cosmos = {
  newStdTx,
  newMsgSend,
  newMsgVoteGovernance
};