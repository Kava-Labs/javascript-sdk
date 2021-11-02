const Env = require("./static/env").env;
const KavaClient = require("../src/client").KavaClient;

var main = async () => {
    // Start new Kava client
    kavaClient = new KavaClient(Env.KavaEndpoints.Testnet);
    kavaClient.setWallet(Env.KavaAccount.Testnet.Mnemonic);
    kavaClient.setBroadcastMode("async");
    await kavaClient.initChain();

    // Query all CDPs
    const allCdps = await kavaClient.getCDPs();
    console.log("All CDPs:", allCdps);

    // Query only CDPs that meet our filter
    const args = {
        collateral_type: 'bnb-a',
        id: '52',
        ratio: '3.15',
        owner: 'kava1g0qywkx6mt5jmvefv6hs7c7h333qas5ks63a6t',
        page: 1,
        limit: 1000
    };
    const filteredCDPs = await kavaClient.getCDPs(args);
    console.log("Filtered CDPs:", filteredCDPs);
}

main();
