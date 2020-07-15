const Env = require("./static/env").env
const KavaClient = require("../src/client").KavaClient;

var main = async () => {
    // Start new Kava client
    kavaClient = new KavaClient(Env.KavaEndpoints.Testnet);
    kavaClient.setWallet(Env.KavaAccount.Testnet.Mnemonic);
    kavaClient.setBroadcastMode("async");
    await kavaClient.initChain();

    // Query all swaps
    const allSwaps = await kavaClient.getSwaps(timeout);
    console.log("All swaps:", allSwaps)

    // Query only swaps that meet our filter
    const timeout = 5000;
    const args = {direction: 'Incoming', status: 'Completed', page: 1, limit: 1000}
    const filteredSwaps = await kavaClient.getSwaps(timeout, args);
    console.log("Filtered swaps:", filteredSwaps)
}

main()