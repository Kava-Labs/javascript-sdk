const _ = require("lodash");

const defaultFee = { amount: [], gas: "200000" };

// newStdTx creates a new StdTx from some messages, with default values for fees, memo and sigs
function newStdTx(msgs, fee = defaultFee, memo = "", signatures = []) {
  return {
    msg: msgs,
    fee: fee,
    signatures: signatures,
    memo: memo
  };
}

/***************************************************
 *                Cosmos-SDK msgs
 ***************************************************/

// newMsgSend creates a new MsgSend
function newMsgSend(address, to, coins) {
  return {
    type: "cosmos-sdk/MsgSend",
    value: {
      from_address: address,
      to_address: to,
      amount: _.sortBy(coins, "denom")
    }
  };
}

/***************************************************
 *                   Kava msgs
 ***************************************************/

function newMsgPostPrice(from, marketID, price, expiry) {
  return {
    type: "pricefeed/MsgPostPrice",
    value: {
      from: from,
      market_id: marketID,
      price: price,
      expiry: expiry
    }
  };
}

function newMsgCreateCDP(sender, principal, collateral) {
  return {
    type: "cdp/MsgCreateCDP",
    value: {
      sender: sender,
      principal: principal,
      collateral: collateral
    }
  };
}

function newMsgDeposit(owner, depositor, collateral) {
  return {
    type: "cdp/MsgDeposit",
    value: {
      owner: owner,
      depositor: depositor,
      collateral: collateral
    }
  };
}

function newMsgWithdraw(owner, depositor, collateral) {
  return {
    type: "cdp/MsgWithdraw",
    value: {
      owner: owner,
      depositor: depositor,
      collateral: collateral
    }
  };
}

function newMsgDrawDebt(sender, cdpDenom, principal) {
  return {
    type: "cdp/MsgDrawDebt",
    value: {
      sender: sender,
      cdp_denom: cdpDenom,
      principal: principal
    }
  };
}

function newMsgRepayDebt(sender, payment, cdpDenom) {
  return {
    type: "cdp/MsgRepayDebt",
    value: {
      sender: sender,
      payment: payment,
      cdp_denom: cdpDenom
    }
  };
}

function newMsgPlaceBid(auctionID, bidder, amount) {
  return {
    type: "auction/MsgPlaceBid",
    value: {
      auction_id: auctionID,
      bidder: bidder,
      amount: amount
    }
  };
}

// newMsgCreateAtomicSwap creates a new MsgCreateAtomicSwap
function newMsgCreateAtomicSwap(
  sender,
  recipient,
  recipientOtherChain,
  senderOtherChain,
  randomNumberHash,
  timestamp,
  amount,
  expectedIncome,
  heightSpan,
  crossChain
) {
  return {
    type: "bep3/MsgCreateAtomicSwap",
    value: {
      from: sender,
      to: recipient,
      recipient_other_chain: recipientOtherChain,
      sender_other_chain: senderOtherChain,
      random_number_hash: randomNumberHash,
      timestamp: String(timestamp),
      amount: amount,
      expected_income: String(expectedIncome),
      height_span: String(heightSpan),
      cross_chain: crossChain
    }
  };
}

// newMsgClaimAtomicSwap creates a new MsgClaimAtomicSwap
function newMsgClaimAtomicSwap(sender, swapID, randomNumber) {
  return {
    type: "bep3/MsgClaimAtomicSwap",
    value: {
      from: sender,
      swap_id: swapID,
      random_number: randomNumber
    }
  };
}

// newMsgRefundAtomicSwap creates a new MsgRefundAtomicSwap
function newMsgRefundAtomicSwap(sender, swapID) {
  return {
    type: "bep3/MsgRefundAtomicSwap",
    value: {
      from: sender,
      swap_id: swapID
    }
  };
}

module.exports.msg = {
  newStdTx,
  newMsgSend,
  newMsgPostPrice,
  newMsgCreateCDP,
  newMsgDeposit,
  newMsgWithdraw,
  newMsgDrawDebt,
  newMsgRepayDebt,
  newMsgPlaceBid,
  newMsgCreateAtomicSwap,
  newMsgClaimAtomicSwap,
  newMsgRefundAtomicSwap
};
