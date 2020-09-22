const Env = require("./static/env").env;
const KavaClient = require("../src/client").KavaClient;
const kavaUtils = require('../src/utils').utils;

var main = async () => {
    // Start new Kava client
    kavaClient = new KavaClient(Env.KavaEndpoints.Testnet);
    kavaClient.setWallet(Env.KavaAccount.Testnet.Mnemonic);
    await kavaClient.initChain();

    // Deposit coins into harvest's BNB liquidity pool
    const despoitCoins = kavaUtils.formatCoin(100, "bnb");
    const depositRes = await kavaClient.harvest.deposit(despoitCoins, "lp");
    console.log("Deposit tx:", depositRes);

    await sleep(5000); // Wait 5 seconds

    // Withdraw coins from harvest's BNB liquidity pool
    const withdrawCoins = kavaUtils.formatCoin(20, "bnb");
    const withdrawRes = await kavaClient.harvest.withdraw(withdrawCoins, "lp");
    console.log("Withdraw tx:", withdrawRes);

    await sleep(5000); // Wait 5 seconds

    // Claim harvest rewards
    const args = {"owner": Env.KavaAccount.Testnet.Address, "deposit_denom": "bnb"};
    const claim = await kavaClient.harvest.getClaims(args);
    if(claim) {
        const claimRes = await kavaClient.harvest.claim(Env.KavaAccount.Testnet.Address, "bnb", "lp", "small");
        console.log("Claim tx:", claimRes);
    }
}

// Sleep is a wait function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

main();
