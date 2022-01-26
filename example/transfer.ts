import { utils } from '../src/utils';
import { env } from './static/env';
import { KavaClient } from '../src/client';
 
const KAVA_CONVERSION_FACTOR = 10 ** 6;

var main = async () => {
  const recipient = 'kava1g0qywkx6mt5jmvefv6hs7c7h333qas5ks63a6t';

  // Start new Kava client
  const kavaClient = new KavaClient(env.KavaEndpoints.Testnet);
  kavaClient.setWallet(env.KavaAccount.Testnet.Mnemonic);
  kavaClient.setBroadcastMode('async');
  await kavaClient.initChain();

  // First let's check our account balances
  let balances = await kavaClient.getBalances(env.KavaAccount.Testnet.Address);
  console.log('Balances:', balances);
  // Print our KAVA balance (if we have one)
  let kavaBalance = balances?.find(
    (item) => item.denom.toUpperCase() === 'UKAVA'
  );
  if (kavaBalance) {
    console.log(
      '\tBalance (kava):',
      Number(kavaBalance.amount) / KAVA_CONVERSION_FACTOR
    );
  }

  // Transfer 1 kava to recipient's address
  const coins = utils.formatCoins(1 * KAVA_CONVERSION_FACTOR, 'ukava');
  const txHash = await kavaClient.transfer(recipient, coins);
  console.log('Tx hash:', txHash);

  // Check the resulting tx hash
  const txRes = await kavaClient.checkTxHash(txHash, 15000); // 15 seconds
  console.log('Tx result:', txRes);
};

main();
