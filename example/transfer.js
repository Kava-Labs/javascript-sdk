const _ = require("lodash");

const kavaUtils = require("../src/utils").utils;
const KavaClient = require("../src/client").KavaClient;

const KAVA_API_TESTNET_6000_INTERNAL = "http://54.196.2.124:1317";
const kavaAddress = "kava1g0qywkx6mt5jmvefv6hs7c7h333qas5ks63a6t";
const kavaMnemonic =
  "lecture draw addict sea prefer erupt army someone album liquid sadness manual fence vintage obey shrimp figure retreat kick refuse verify alien east brand";

var main = async () => {
    const recipient = "kava1c84ezutjcgrsxarjq5mzsxxz2k9znn94zxmqjz";

    // Start new Kava client
    kavaClient = new KavaClient(KAVA_API_TESTNET_6000_INTERNAL);
    kavaClient.setWallet(kavaMnemonic);
    await kavaClient.initChain();

    // Check account balance
    let accountPre = await kavaClient.getAccount(recipient);
    console.log("Address:", _.get(accountPre, "value.address"));
    console.log("Balances:", _.get(accountPre, "value.coins"), "\n");

    // Load coins and transfer to recipient's address
    const coins = kavaUtils.formatCoins(1, "bnb");
    const txHash = await kavaClient.transfer(recipient, coins);

    // Check the resulting tx hash
    console.log("Tx hash:", txHash);

    await sleep(2000); // 2 seconds

    // Check account balance
    let accountPost = await kavaClient.getAccount(recipient);
    console.log("\nAddress:", _.get(accountPost, "value.address"));
    console.log("Balances:", _.get(accountPost, "value.coins"));
}

// Sleep is a wait function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
main()