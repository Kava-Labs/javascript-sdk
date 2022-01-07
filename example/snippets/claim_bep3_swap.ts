// TODO: Must plug these in manually
const claimKavaSwapID = "";
const claimRandomNumber = "";

var claimBEP3Swap = async () => {
    // Start new Kava client
    let kavaClient = new KavaClient(Env.KavaEndpoints.Local);
    kavaClient.setWallet(Env.KavaAccount.Local.Mnemonic);
    kavaClient.setBroadcastMode('async');
    await kavaClient.initChain();

    const kavaStateSwap = await kavaClient.getSwap(claimKavaSwapID);
    const kavaExpiresAt = Number(kavaStateSwap.expire_height);
    console.log("\nCurrent Kava height:", await getKavaHeight(kavaClient));
    console.log("Can be claimed before height:", kavaExpiresAt);

    let kavaCurrBlockHeight = await getKavaHeight(kavaClient);
    if (kavaCurrBlockHeight >= kavaExpiresAt) {
        console.log("Swap has already expired and cannot be claimed.")
        return;
    }

    // Send claim swap tx using Kava client
    const txHashClaim = await kavaClient.claimSwap(
      claimKavaSwapID,
      claimRandomNumber
    );
    console.log('Claim swap tx hash (Kava): '.concat(txHashClaim));

    // Check the claim tx hash
    const txRes = await kavaClient.checkTxHash(txHashClaim, 15000);
    console.log('\nTx result:', txRes.raw_log);
};

var getKavaHeight = async (kavaClient: any) => {
  let currBlockInfo = await kavaClient.getLatestBlock();
  return Number(currBlockInfo.block.last_commit.height)
}

var main = async () => {
  await claimBEP3Swap();
};

main();
