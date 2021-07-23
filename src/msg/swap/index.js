function newMsgDeposit(despositor, tokenA, tokenB, slippage, deadline) {
  return {
    type: 'swap/MsgDeposit',
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

function newMsgSwapExactForTokens(requester, exactTokenA, tokenB, slippage, deadline) {
  return {
    type: 'swap/MsgSwapExactForTokens',
    value: {
      requester: requester,
      exact_token_a: exactTokenA,
      token_b: tokenB,
      slippage: slippage,
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
      exact_token_b: exactTokenB,
      slippage: slippage,
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
