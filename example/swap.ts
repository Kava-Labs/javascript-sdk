const Env = require('./static/env').env;
const KavaClient = require('../src/client').KavaClient;
const kavaUtils = require('../src/utils').utils;

var main = async () => {
  // Start new Kava client
  kavaClient = new KavaClient(Env.KavaEndpoints.Testnet);
  kavaClient.setWallet(Env.KavaAccount.Testnet.Mnemonic);
  await kavaClient.initChain();

  // deposit coins to the swap bnb:usdx pool
  const tokenA = kavaUtils.formatCoins(20, 'bnb');
  const tokenB = kavaUtils.formatCoins(10, 'usdx');
  const slippage = '0.010000000000000000';
  // create a deadline of 30 seconds from now for the max amount of time to wait
  // for the transaction to be processed
  const deadline = kavaUtils.calculateUnixTime(30);
  const depositRes = await kavaClient.swap.deposit(
    tokenA,
    tokenB,
    slippage,
    deadline
  );
  console.log('Deposit tx:', depositRes);

  await sleep(5000); // Wait 5 seconds

  // withdraw coins from the swap bnb:usdx pool
  const shares = 100;
  const minTokenA = kavaUtils.formatCoins(20, 'bnb');
  const minTokenB = kavaUtils.formatCoins(10, 'usdx');
  const deadline = kavaUtils.calculateUnixTime(30);
  const withdrawRes = await kavaClient.swap.withdraw(tokenA, tokenB, deadline);
  console.log('Withdraw tx:', withdrawRes);

  await sleep(5000); // Wait 5 seconds

  // Attempt a swap to a valid tradable pool with an exact tokenA
  // coins to deposit to the pool
  const exactTokenA = kavaUtils.formatCoins(100, 'bnb');
  // coins to withdraw from the pool
  const tokenB = kavaUtils.formatCoins(10, 'usdx');
  const slippage = '0.010000000000000000';
  const deadline = kavaUtils.calculateUnixTime(30);

  const swapExactForRes = await kavaClient.swap.newMsgSwapExactForTokens(
    exactTokenA,
    tokenB,
    slippage,
    deadline
  );
  console.log('Swap Exact For tx:', swapExactForRes);

  await sleep(5000); // Wait 5 seconds

  // Attempt a swap to a valid tradable pool with an exact tokenB
  // coins to deposit to the pool
  const tokenA = kavaUtils.formatCoins(100, 'bnb');
  // coins to withdraw from the pool
  const exactTokenB = kavaUtils.formatCoins(10, 'usdx');
  const slippage = '0.010000000000000000';
  const deadline = kavaUtils.calculateUnixTime(30);

  const swapForExactRes = await kavaClient.swap.newMsgSwapForExactTokens(
    tokenA,
    exactTokenB,
    slippage,
    deadline
  );
  console.log('Swap For Exact tx:', swapForExactRes);

  await sleep(5000); // Wait 5 seconds

  // claim swap rewards
  const multiplierName = 'large';
  const denomsToClaim = ['swp'];

  const args = { owner: Env.KavaAccount.Testnet.Address, type: 'swap' };
  const claims = await kavaClient.getRewards(args);
  if (claims) {
    const claimRes = await kavaClient.claimSwapReward(
      multiplierName,
      denomsToClaim
    );
    console.log('Claim tx:', claimRes);
  }

  await sleep(5000); // Wait 5 seconds
};

// Sleep is a wait function
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main();
