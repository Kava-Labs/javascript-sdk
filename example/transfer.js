const Env = require("./static/env").env
const kavaUtils = require("../src/utils").utils;
const KavaClient = require("../src/client").KavaClient;

var main = async () => {
    const recipient = "kava1g0qywkx6mt5jmvefv6hs7c7h333qas5ks63a6t";

    // Start new Kava client
    kavaClient = new KavaClient(Env.KavaEndpoints.Testnet);
    kavaClient.setWallet(Env.KavaAccount.Testnet.Mnemonic);
    kavaClient.setBroadcastMode("async");
    await kavaClient.initChain();

    // Load coins and transfer to recipient's address
    const coins = kavaUtils.formatCoins(1, "ukava");
    const txHash = await kavaClient.transfer(recipient, coins);
    console.log("Tx hash:", txHash);

    // Check the resulting tx hash
    const txRes = await kavaClient.checkTxHash(txHash, 15000) // 15 seconds
    console.log("Tx result:", txRes);
}
  
main()