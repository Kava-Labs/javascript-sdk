/***************************************************
 *                   Auction
 ***************************************************/

function newMsgPlaceBid(auctionID, bidder, amount) {
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
  sender,
  recipient,
  recipientOtherChain,
  senderOtherChain,
  randomNumberHash,
  timestamp,
  amount,
  heightSpan
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

// newMsgClaimAtomicSwap creates a new MsgClaimAtomicSwap
function newMsgClaimAtomicSwap(sender, swapID, randomNumber) {
  return {
    type: 'bep3/MsgClaimAtomicSwap',
    value: {
      from: sender,
      swap_id: swapID,
      random_number: randomNumber,
    },
  };
}

// newMsgRefundAtomicSwap creates a new MsgRefundAtomicSwap
function newMsgRefundAtomicSwap(sender, swapID) {
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

function newMsgCreateCDP(sender, principal, collateral, collateralType) {
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

function newMsgDeposit(owner, depositor, collateral, collateralType) {
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

function newMsgWithdraw(owner, depositor, collateral, collateralType) {
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

function newMsgDrawDebt(sender, collateralType, principal) {
  return {
    type: 'cdp/MsgDrawDebt',
    value: {
      sender: sender,
      collateral_type: collateralType,
      principal: principal,
    },
  };
}

function newMsgRepayDebt(sender, collateralType, payment) {
  return {
    type: 'cdp/MsgRepayDebt',
    value: {
      sender: sender,
      collateral_type: collateralType,
      payment: payment,
    },
  };
}

function newMsgLiquidate(keeper, borrower, collateralType) {
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

function newMsgSubmitProposal(proposal, proposer, committeeID) {
  return {
    type: 'kava/MsgSubmitProposal',
    value: {
      pub_proposal: proposal,
      proposer: proposer,
      committee_id: String(committeeID),
    },
  };
}

function newMsgVote(proposalID, voter) {
  return {
    type: 'kava/MsgVote',
    value: {
      proposal_id: String(proposalID),
      voter: voter,
    },
  };
}


/***************************************************
 *                   Incentive
 ***************************************************/

function newMsgClaimUSDXMintingReward(sender, multiplierName) {
  return {
    type: 'incentive/MsgClaimUSDXMintingReward',
    value: {
      sender: sender,
      multiplier_name: multiplierName
    }
  }
}

function newMsgClaimHardReward(sender, multiplierName) {
  return {
    type: 'incentive/MsgClaimHardReward',
    value: {
      sender: sender,
      multiplier_name: multiplierName
    }
  }
}

/***************************************************
 *                   Issuance
 ***************************************************/

function newMsgIssueTokens(sender, tokens, receiver) {
  return {
    type: 'issuance/MsgIssueTokens',
    value: {
      sender: sender,
      tokens: tokens,
      receiver: receiver,
    },
  };
}

function newMsgRedeemTokens(sender, tokens) {
  return {
    type: 'issuance/MsgRedeemTokens',
    value: {
      sender: sender,
      tokens: tokens,
    },
  };
}

function newMsgBlockAddress(sender, denom, blockedAddress) {
  return {
    type: 'issuance/MsgBlockAddress',
    value: {
      sender: sender,
      denom: denom,
      blocked_address: blockedAddress,
    },
  };
}

function newMsgUnblockAddress(sender, denom, address) {
  return {
    type: 'issuance/MsgUnblockAddress',
    value: {
      sender: sender,
      denom: denom,
      address: address,
    },
  };
}

function newMsgSetPauseStatus(sender, denom, status) {
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

function newMsgPostPrice(from, marketID, price, expiry) {
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

module.exports.kava = {
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
  newMsgIssueTokens,
  newMsgRedeemTokens,
  newMsgBlockAddress,
  newMsgUnblockAddress,
  newMsgSetPauseStatus,
  newMsgPostPrice
};
