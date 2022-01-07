const Env = require('../static/env').env;
const KavaClient = require('../../src/client').KavaClient;

// TODO: must plug in manually
const refundKavaSwapID="";

var testFx = async () => {
    // Start new Kava client
    let kavaClient = new KavaClient(Env.KavaEndpoints.Local);
    kavaClient.setWallet(Env.KavaAccount.Local.Mnemonic);
    await kavaClient.initChain();

    // Get swap by ID
    const kavaStateSwap = await kavaClient.getSwap(refundKavaSwapID);
    const kavaExpiresAt = Number(kavaStateSwap.expire_height)
    console.log("\nCurrent Kava height:", await getKavaHeight(kavaClient))
    console.log("Can be refunded at height:", kavaExpiresAt)

    // Wait until swap has expired on Kava
    let kavaCurrBlockHeight = await getKavaHeight(kavaClient);
    while(kavaCurrBlockHeight < Number(kavaExpiresAt)) {
        await sleep(1000 * 1)
        kavaCurrBlockHeight = await getKavaHeight(kavaClient);
    }

    // Refund swap on Kava
    console.log("Refunding swap on Kava...")
    const kavaRefundTxHash = await kavaClient.refundSwap(refundKavaSwapID);
    console.log("kavaRefundTxHash:", kavaRefundTxHash)

    // Check the claim tx hash
    const txRes = await kavaClient.checkTxHash(kavaRefundTxHash, 15000);
    console.log('\nTx result:', txRes.raw_log);
}

// Sleep is a wait function
function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

var main = async () => {
    await testFx();
}

var getKavaHeight = async (kavaClient: any) => {
    let currBlockInfo = await kavaClient.getLatestBlock();
    return Number(currBlockInfo.block.last_commit.height)
}

main();
