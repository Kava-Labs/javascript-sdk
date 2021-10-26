const Env = require("./static/env").env;
const KavaClient = require("../src/client").KavaClient;

var main = async () => {
    // Start new Kava client
    kavaClient = new KavaClient(Env.KavaEndpoints.Testnet);
    kavaClient.setWallet(Env.KavaAccount.Testnet.Mnemonic);
    kavaClient.setBroadcastMode("async");
    await kavaClient.initChain();

    // Query all swaps
    const allSwaps = await kavaClient.getSwaps();
    console.log("All swaps:", allSwaps);

    // Query only swaps that meet our filter
    const args = {
        direction: 'Incoming',
        status: 'Completed',
        involve: '',
        expiration: '1273092',
        page: 1,
        limit: 1000
    }
    const filteredSwaps = await kavaClient.getSwaps(args);
    console.log("Filtered swaps:", filteredSwaps)
}

main()
