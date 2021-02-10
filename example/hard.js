const Env = require("./static/env").env;
const KavaClient = require("../src/client").KavaClient;
const kavaUtils = require('../src/utils').utils;

var main = async () => {
    // Start new Kava client
    kavaClient = new KavaClient(Env.KavaEndpoints.Testnet);
    kavaClient.setWallet(Env.KavaAccount.Testnet.Mnemonic);
    await kavaClient.initChain();

    // Deposit coins into hard's BNB pool
    const despoitCoins = kavaUtils.formatCoins(100, "bnb");
    const depositRes = await kavaClient.hard.deposit(despoitCoins);
    console.log("Deposit tx:", depositRes);

    await sleep(5000); // Wait 5 seconds

    // Withdraw coins from hard's BNB pool
    const withdrawCoins = kavaUtils.formatCoins(20, "bnb");
    const withdrawRes = await kavaClient.hard.withdraw(withdrawCoins);
    console.log("Withdraw tx:", withdrawRes);

    await sleep(5000); // Wait 5 seconds

    // Claim hard rewards
    const args = {"owner": Env.KavaAccount.Testnet.Address, "type": "hard"};
    const claim = await kavaClient.getRewards(args);
    if(claim) {
        const claimRes = await kavaClient.claimHardLiquidityProviderReward('small')
        console.log("Claim tx:", claimRes);
    }
}

// Sleep is a wait function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

main();
