import { Coin } from '../../types/Coin';
import { DenomToClaim } from '../../types/DenomToClaim';
import { VoteType } from '../../types/VoteType';

/***************************************************
 *                   Auction
 ***************************************************/

function newMsgPlaceBid(auctionID: string, bidder: string, amount: Coin) {
  return {
    type: 'auction/MsgPlaceBid',
    value: {
      auction_id: auctionID,
      bidder: bidder,
      amount: amount,
    },
  };
}

/***************************************************
 *                     BEP3
 ***************************************************/

// newMsgCreateAtomicSwap creates a new MsgCreateAtomicSwap
function newMsgCreateAtomicSwap(
  from: string,
  to: string,
  recipientOtherChain: string,
  senderOtherChain: string,
  randomNumberHash: string,
  timestamp: number,
  amount: Coin[],
  heightSpan: number
) {
  return {
    type: 'bep3/MsgCreateAtomicSwap',
    value: {
      from,
      to,
      recipient_other_chain: recipientOtherChain,
      sender_other_chain: senderOtherChain,
      random_number_hash: randomNumberHash,
      timestamp: String(timestamp),
      amount: amount,
      height_span: String(heightSpan),
    },
  };
}

// newMsgClaimAtomicSwap creates a new MsgClaimAtomicSwap
function newMsgClaimAtomicSwap(
  from: string,
  swapID: string,
  randomNumber: string
) {
  return {
    type: 'bep3/MsgClaimAtomicSwap',
    value: {
      from,
      swap_id: swapID,
      random_number: randomNumber,
    },
  };
}

// newMsgRefundAtomicSwap creates a new MsgRefundAtomicSwap
function newMsgRefundAtomicSwap(from: string, swapID: string) {
  return {
    type: 'bep3/MsgRefundAtomicSwap',
    value: {
      from,
      swap_id: swapID,
    },
  };
}

/***************************************************
 *                       CDP
 ***************************************************/

function newMsgCreateCDP(
  sender: string,
  principal: Coin,
  collateral: Coin,
  collateralType: string
) {
  return {
    type: 'cdp/MsgCreateCDP',
    value: {
      sender: sender,
      principal: principal,
      collateral: collateral,
      collateral_type: collateralType,
    },
  };
}

function newMsgDeposit(
  owner: string,
  depositor: string,
  collateral: Coin,
  collateralType: string
) {
  return {
    type: 'cdp/MsgDeposit',
    value: {
      owner: owner,
      depositor: depositor,
      collateral: collateral,
      collateral_type: collateralType,
    },
  };
}

function newMsgWithdraw(
  owner: string,
  depositor: string,
  collateral: Coin,
  collateralType: string
) {
  return {
    type: 'cdp/MsgWithdraw',
    value: {
      owner: owner,
      depositor: depositor,
      collateral: collateral,
      collateral_type: collateralType,
    },
  };
}

function newMsgDrawDebt(
  sender: string,
  collateralType: string,
  principal: Coin
) {
  return {
    type: 'cdp/MsgDrawDebt',
    value: {
      sender: sender,
      collateral_type: collateralType,
      principal: principal,
    },
  };
}

function newMsgRepayDebt(
  sender: string,
  collateralType: string,
  payment: Coin
) {
  return {
    type: 'cdp/MsgRepayDebt',
    value: {
      sender: sender,
      collateral_type: collateralType,
      payment: payment,
    },
  };
}

function newMsgLiquidate(
  keeper: string,
  borrower: string,
  collateralType: string
) {
  return {
    type: 'cdp/MsgLiquidate',
    value: {
      keeper: keeper,
      borrower: borrower,
      collateral_type: collateralType,
    },
  };
}

/***************************************************
 *                   Committee
 ***************************************************/

function newMsgSubmitProposal(
  pubProposal: string,
  proposer: string,
  committeeID: string
) {
  return {
    type: 'kava/MsgSubmitProposal',
    value: {
      pub_proposal: pubProposal,
      proposer: proposer,
      committee_id: String(committeeID),
    },
  };
}

function newMsgVote(proposalID: string, voter: string, voteType: VoteType) {
  return {
    type: 'kava/MsgVote',
    value: {
      proposal_id: String(proposalID),
      voter: voter,
      vote_type: voteType,
    },
  };
}

/***************************************************
 *                   Incentive
 ***************************************************/

function newMsgClaimUSDXMintingReward(sender: string, multiplierName: string) {
  return {
    type: 'incentive/MsgClaimUSDXMintingReward',
    value: {
      sender: sender,
      multiplier_name: multiplierName,
    },
  };
}

function newMsgClaimHardReward(sender: string, denomsToClaim: DenomToClaim[]) {
  return {
    type: 'incentive/MsgClaimHardReward',
    value: {
      sender: sender,
      denoms_to_claim: denomsToClaim,
    },
  };
}

function newMsgClaimDelegatorReward(
  sender: string,
  denomsToClaim: DenomToClaim[]
) {
  return {
    type: 'incentive/MsgClaimDelegatorReward',
    value: {
      sender: sender,
      denoms_to_claim: denomsToClaim,
    },
  };
}

function newMsgClaimSwapReward(sender: string, denomsToClaim: DenomToClaim[]) {
  return {
    type: 'incentive/MsgClaimSwapReward',
    value: {
      sender: sender,
      denoms_to_claim: denomsToClaim,
    },
  };
}

function newMsgClaimSavingsReward(
  sender: string,
  denomsToClaim: DenomToClaim[]
) {
  return {
    type: 'incentive/MsgClaimSavingsReward',
    value: {
      sender: sender,
      denoms_to_claim: denomsToClaim,
    },
  };
}

function newMsgClaimEarnReward(sender: string, denomsToClaim: DenomToClaim[]) {
  return {
    type: 'incentive/MsgClaimEarnReward',
    value: {
      sender,
      denoms_to_claim: denomsToClaim,
    },
  };
}

/***************************************************
 *                   Issuance
 ***************************************************/

function newMsgIssueTokens(sender: string, tokens: Coin[], receiver: string) {
  return {
    type: 'issuance/MsgIssueTokens',
    value: {
      sender: sender,
      tokens: tokens,
      receiver: receiver,
    },
  };
}

function newMsgRedeemTokens(sender: string, tokens: Coin[]) {
  return {
    type: 'issuance/MsgRedeemTokens',
    value: {
      sender: sender,
      tokens: tokens,
    },
  };
}

function newMsgBlockAddress(
  sender: string,
  denom: string,
  blockedAddress: string
) {
  return {
    type: 'issuance/MsgBlockAddress',
    value: {
      sender: sender,
      denom: denom,
      blocked_address: blockedAddress,
    },
  };
}

function newMsgUnblockAddress(sender: string, denom: string, address: string) {
  return {
    type: 'issuance/MsgUnblockAddress',
    value: {
      sender: sender,
      denom: denom,
      address: address,
    },
  };
}

function newMsgSetPauseStatus(sender: string, denom: string, status: string) {
  return {
    type: 'issuance/MsgChangePauseStatus',
    value: {
      sender: sender,
      denom: denom,
      status: status,
    },
  };
}

/***************************************************
 *                   Pricefeed
 ***************************************************/

function newMsgPostPrice(
  from: string,
  marketID: string,
  price: string,
  expiry: string
) {
  return {
    type: 'pricefeed/MsgPostPrice',
    value: {
      from: from,
      market_id: marketID,
      price: price,
      expiry: expiry,
    },
  };
}

export const kava = {
  newMsgPlaceBid,
  newMsgCreateAtomicSwap,
  newMsgClaimAtomicSwap,
  newMsgRefundAtomicSwap,
  newMsgCreateCDP,
  newMsgDeposit,
  newMsgWithdraw,
  newMsgDrawDebt,
  newMsgRepayDebt,
  newMsgLiquidate,
  newMsgSubmitProposal,
  newMsgVote,
  newMsgClaimUSDXMintingReward,
  newMsgClaimHardReward,
  newMsgClaimDelegatorReward,
  newMsgClaimSwapReward,
  newMsgClaimSavingsReward,
  newMsgClaimEarnReward,
  newMsgIssueTokens,
  newMsgRedeemTokens,
  newMsgBlockAddress,
  newMsgUnblockAddress,
  newMsgSetPauseStatus,
  newMsgPostPrice,
};
