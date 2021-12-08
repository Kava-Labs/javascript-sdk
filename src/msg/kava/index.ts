import { Coin } from '../../types/Coin';
import { DenomToClaim } from '../../types/DenomToClaim';
import { VoteType } from '../../types/VoteType';

/***************************************************
 *                   Auction
 ***************************************************/

function PlaceBid(auctionID: string, bidder: string, amount: Coin) {
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

// CreateAtomicSwap creates a new MsgCreateAtomicSwap
function CreateAtomicSwap(
  sender: string,
  recipient: string,
  recipientOtherChain: string,
  senderOtherChain: string,
  randomNumberHash: string,
  timestamp: number,
  amount: Coin,
  heightSpan: number
) {
  return {
    type: 'bep3/MsgCreateAtomicSwap',
    value: {
      from: sender,
      to: recipient,
      recipient_other_chain: recipientOtherChain,
      sender_other_chain: senderOtherChain,
      random_number_hash: randomNumberHash,
      timestamp: String(timestamp),
      amount: amount,
      height_span: String(heightSpan),
    },
  };
}

// ClaimAtomicSwap creates a new MsgClaimAtomicSwap
function ClaimAtomicSwap(
  sender: string,
  swapID: string,
  randomNumber: string
) {
  return {
    type: 'bep3/MsgClaimAtomicSwap',
    value: {
      from: sender,
      swap_id: swapID,
      random_number: randomNumber,
    },
  };
}

// RefundAtomicSwap creates a new MsgRefundAtomicSwap
function RefundAtomicSwap(sender: string, swapID: string) {
  return {
    type: 'bep3/MsgRefundAtomicSwap',
    value: {
      from: sender,
      swap_id: swapID,
    },
  };
}

/***************************************************
 *                       CDP
 ***************************************************/

function CreateCDP(
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

function Deposit(
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

function Withdraw(
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

function DrawDebt(
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

function RepayDebt(
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

function Liquidate(
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

function SubmitProposal(
  proposal: string,
  proposer: string,
  committeeID: string
) {
  return {
    type: 'kava/MsgSubmitProposal',
    value: {
      pub_proposal: proposal,
      proposer: proposer,
      committee_id: String(committeeID),
    },
  };
}

function Vote(proposalID: string, voter: string, voteType: VoteType) {
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

function ClaimUSDXMintingReward(sender: string, multiplierName: string) {
  return {
    type: 'incentive/MsgClaimUSDXMintingReward',
    value: {
      sender: sender,
      multiplier_name: multiplierName,
    },
  };
}

function ClaimUSDXMintingRewardVVesting(
  sender: string,
  receiver: string,
  multiplierName: string
) {
  return {
    type: 'incentive/MsgClaimUSDXMintingRewardVVesting',
    value: {
      sender: sender,
      receiver: receiver,
      multiplierName: multiplierName,
    },
  };
}

function ClaimHardReward(sender: string, denomsToClaim: any[]) {
  return {
    type: 'incentive/MsgClaimHardReward',
    value: {
      sender: sender,
      denoms_to_claim: denomsToClaim,
    },
  };
}

function ClaimHardRewardVVesting(
  sender: string,
  receiver: string,
  denomsToClaim: DenomToClaim[]
) {
  return {
    type: 'incentive/MsgClaimHardRewardVVesting',
    value: {
      sender: sender,
      receiver: receiver,
      denoms_to_claim: denomsToClaim,
    },
  };
}

function ClaimDelegatorReward(
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

function ClaimDelegatorRewardVVesting(
  sender: string,
  receiver: string,
  denomsToClaim: any[]
) {
  return {
    type: 'incentive/MsgClaimDelegatorRewardVVesting',
    value: {
      sender: sender,
      receiver: receiver,
      denoms_to_claim: denomsToClaim,
    },
  };
}

function ClaimSwapReward(sender: string, denomsToClaim: DenomToClaim[]) {
  return {
    type: 'incentive/MsgClaimSwapReward',
    value: {
      sender: sender,
      denoms_to_claim: denomsToClaim,
    },
  };
}

function ClaimSwapRewardVVesting(
  sender: string,
  receiver: string,
  denomsToClaim: DenomToClaim[]
) {
  return {
    type: 'incentive/MsgClaimSwapRewardVVesting',
    value: {
      sender: sender,
      receiver: receiver,
      denoms_to_claim: denomsToClaim,
    },
  };
}

/***************************************************
 *                   Issuance
 ***************************************************/

function IssueTokens(sender: string, tokens: any[], receiver: string) {
  return {
    type: 'issuance/MsgIssueTokens',
    value: {
      sender: sender,
      tokens: tokens,
      receiver: receiver,
    },
  };
}

function RedeemTokens(sender: string, tokens: any[]) {
  return {
    type: 'issuance/MsgRedeemTokens',
    value: {
      sender: sender,
      tokens: tokens,
    },
  };
}

function BlockAddress(
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

function UnblockAddress(sender: string, denom: string, address: string) {
  return {
    type: 'issuance/MsgUnblockAddress',
    value: {
      sender: sender,
      denom: denom,
      address: address,
    },
  };
}

function SetPauseStatus(sender: string, denom: string, status: string) {
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

function PostPrice(
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
  PlaceBid,
  CreateAtomicSwap,
  ClaimAtomicSwap,
  RefundAtomicSwap,
  CreateCDP,
  Deposit,
  Withdraw,
  DrawDebt,
  RepayDebt,
  Liquidate,
  SubmitProposal,
  Vote,
  ClaimUSDXMintingReward,
  ClaimUSDXMintingRewardVVesting,
  ClaimHardReward,
  ClaimHardRewardVVesting,
  ClaimDelegatorReward,
  ClaimDelegatorRewardVVesting,
  ClaimSwapReward,
  ClaimSwapRewardVVesting,
  IssueTokens,
  RedeemTokens,
  BlockAddress,
  UnblockAddress,
  SetPauseStatus,
  PostPrice,
};
