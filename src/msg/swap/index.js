function newMsgDeposit(despositor, tokenA, tokenB, slippage, deadline) {
  return {
    type: 'swap/MsgDeposit'.
    value: {
      depositor: depositor,
      token_a: tokenA,
      token_b: tokenB,
      slippage: slippage,
      deadline: deadline
    }
  }
}

function newMsgWithdraw(from, shares, minTokenA, minTokenB, deadline) {
  return {
    type: 'swap/MsgWithdraw',
    value: {
      from: from,
      shares: shares,
      min_token_a: minTokenA,
      min_token_b: minTokenB,
      deadline: deadline
    }
  }
}

function newMsgSwapExactForTokens(requester, extactTokenA, tokenB, slippage, deadline) {
  return {
    type: 'swap/MsgSwapExactForTokens',
    value: {
      requester: requester,
      extact_token_a: extactTokenA,
      token_b: tokenB,
      slippage: slippate,
      deadline: deadline
    }
  }
}

function newMsgSwapForExactTokens(requester, tokenA, exactTokenB, slippage, deadline) {
  return {
    type: 'swap/MsgSwapForExactTokens',
    value: {
      requester: requester,
      token_a: tokenA,
      extact_token_b: extactTokenB,
      slippage: slippate,
      deadline: deadline
    }
  }
}

module.exports.swap = {
  newMsgDeposit,
  newMsgWithdraw,
  newMsgSwapExactForTokens,
  newMsgSwapForExactTokens
};
