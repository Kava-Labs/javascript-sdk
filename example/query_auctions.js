const Env = require("./static/env").env;
const KavaClient = require("../src/client").KavaClient;

var main = async () => {
    // Start new Kava client
    kavaClient = new KavaClient(Env.KavaEndpoints.Testnet);
    kavaClient.setWallet(Env.KavaAccount.Testnet.Mnemonic);
    kavaClient.setBroadcastMode("async");
    await kavaClient.initChain();

    // Query all Auctions
    const allAuctions = await kavaClient.getAuctions();
    console.log("All Auctions:", allAuctions);

    // Query only Auctions that meet our filter
    const args = {
        type: 'collateral',
        phase: 'forward',
        denom: 'bnb',
        owner: 'kava1g0qywkx6mt5jmvefv6hs7c7h333qas5ks63a6t',
        page: 1,
        limit: 1000
    };
    const filteredAuctions = await kavaClient.getAuctions(args);
    console.log("Filtered Auctions:", filteredAuctions);
}

main();
