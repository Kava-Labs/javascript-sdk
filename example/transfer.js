const _ = require("lodash");
const Env = require("./static/env").env
const kavaUtils = require("../src/utils").utils;
const KavaClient = require("../src/client").KavaClient;

var main = async () => {
    const recipient = "kava1c84ezutjcgrsxarjq5mzsxxz2k9znn94zxmqjz";

    // Start new Kava client
    kavaClient = new KavaClient(Env.KavaEndpoints.Testnet6000);
    kavaClient.setWallet(Env.KavaAccount.Testnet6000.Mnemonic);
    await kavaClient.initChain();

    // Load coins and transfer to recipient's address
    const coins = kavaUtils.formatCoins(1, "ukava");
    const txHash = await kavaClient.transfer(recipient, coins);

    // Check the resulting tx hash
    console.log("Tx hash:", txHash);
}
  
main()