var createBEP3Swap = async () => {
    // Start new Kava client (as the Kava deputy)
    let kavaClient = new KavaClient(Env.KavaEndpoints.Local);
    kavaClient.setWallet(Env.KavaDeputy.Local.Mnemonic);
    kavaClient.setBroadcastMode('async');
    await kavaClient.initChain();

    // -------------------------------------------------------------------------------
    //                           Kava blockchain interaction
    // -------------------------------------------------------------------------------

    const recipient = Env.KavaAccount.Local.Address; // user's address on Kava
    const recipientOtherChain = Env.BinanceDeputy.Local; // deputy's address on bnbchain
    const senderOtherChain = Env.BinanceAccount.Local.Address; // user's address on bnbchain

    // Set up params
    const asset = 'bnb';
    const amount = 10000000;

    const coins = kavaUtils.formatCoins(amount, asset);
    const heightSpan = '12';

    // Generate random number hash from timestamp and hex-encoded random number
    const randomNumber = kavaUtils.generateRandomNumber();
    const timestamp = Math.floor(Date.now() / 1000);
    const randomNumberHash: string = kavaUtils.calculateRandomNumberHash(
        randomNumber,
        timestamp
    );
    console.log('\nSecret random number:', randomNumber.toUpperCase());

    const txHash = await kavaClient.createSwap(
        recipient,
        recipientOtherChain,
        senderOtherChain,
        randomNumberHash,
        timestamp,
        coins,
        heightSpan
    );

    console.log('\nTx hash (Create swap on Kava):', txHash);
}

var main = async () => {
    await createBEP3Swap();
};

main();
