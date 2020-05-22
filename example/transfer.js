const _ = require("lodash");
const Env = require("./static/env").env
const kavaUtils = require("../src/utils").utils;
const KavaClient = require("../src/client").KavaClient;

var main = async () => {
    const recipient = "kava1g0qywkx6mt5jmvefv6hs7c7h333qas5ks63a6t";

    // Start new Kava client
    kavaClient = new KavaClient(Env.KavaEndpoints.Testnet6000);
    kavaClient.setWallet(Env.KavaAccount.Testnet6000.Mnemonic);
    kavaClient.setBroadcastMode("async"); // Default broadcast mode is 'sync'
    await kavaClient.initChain();

    // Load coins and transfer to recipient's address
    const coins = kavaUtils.formatCoins(1, "ukava");
    const txHash = await kavaClient.transfer(recipient, coins);
    console.log("Tx hash:", txHash);

    await sleep(10000); // 10 seconds

    // Check the resulting tx hash
    const txRes = await kavaClient.checkTxHash(txHash)
    console.log("Tx result:", txRes);
}

// Sleep is a wait function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
main()