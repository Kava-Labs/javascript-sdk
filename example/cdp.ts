const _ = require("lodash");
const Env = require("./static/env").env
const kavaUtils = require("../src/utils").utils;
const KavaClient = require("../src/client").KavaClient;

const BNB_CONVERSION_FACTOR = 10 ** 8;
const USDX_CONVERSION_FACTOR = 10 ** 6;

var main = async () => {
    // Start new Kava client
    kavaClient = new KavaClient(Env.KavaEndpoints.Testnet);
    kavaClient.setWallet(Env.KavaAccount.Testnet.Mnemonic);
    kavaClient.setBroadcastMode("async");
    await kavaClient.initChain();

    // Get minimum principal amount required for CDP creation
    const paramsCDP = await kavaClient.getParamsCDP();
    const debtParam = _.get(paramsCDP, "debt_param");
    const principalAmount = Number(debtParam.debt_floor);
    console.log("Minimum principal:", principalAmount + "usdx");

    // Calculate collateral required for this principal amount
    const bnbValuation = await kavaClient.getPrice("bnb:usd");
    const equivalentCollateral =
    Number(principalAmount) / Number(bnbValuation.price);

    // Assuming the collateralization ratio is 200%, we'll do 210%
    const rawRequiredAmount = equivalentCollateral * 2.1;
    const adjustedAmount =
    (rawRequiredAmount / USDX_CONVERSION_FACTOR) * BNB_CONVERSION_FACTOR;
    const collateralAmount = adjustedAmount.toFixed(0);
    console.log("Required collateral:", collateralAmount + "bnb");

    // Confirm that our account has sufficient funds
    try {
    account = await kavaClient.getAccount(kavaClient.wallet.address);
    const coins = _.get(account, "value.coins");
    const bnbBalance = coins.find(coin => coin.denom == "bnb").amount;
    if ((bnbBalance)* BNB_CONVERSION_FACTOR < collateralAmount) {
        throw { message: "Account only has " + bnbBalance + "bnb" };
    }
    } catch (err) {
        console.log("Error:", err.message);
        return;
    }

    // Load principal, collateral as formatted coins
    const principal = kavaUtils.formatCoin(principalAmount, "usdx");
    const collateral = kavaUtils.formatCoin(collateralAmount, "bnb");
    const collateralType = "bnb-a";

    // Send create CDP tx using Kava client
    const txHashCDP = await kavaClient.createCDP(principal, collateral, collateralType);
    console.log("Create CDP tx hash (Kava): ".concat(txHashCDP));

    // Check the claim tx hash
    const txRes = await kavaClient.checkTxHash(txHashCDP, 15000);
    console.log('\nTx result:', txRes);
};

main()
