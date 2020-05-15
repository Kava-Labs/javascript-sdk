const KavaAccount = {
    Local: {
        Address: "",
        Mnemonic: ""   
    },
    Testnet5000: {
        Address: "kava1g0qywkx6mt5jmvefv6hs7c7h333qas5ks63a6t",
        Mnemonic: "lecture draw addict sea prefer erupt army someone album liquid sadness manual fence vintage obey shrimp figure retreat kick refuse verify alien east brand",  
    },
    Testnet6000Internal: {
        Address: "kava1g0qywkx6mt5jmvefv6hs7c7h333qas5ks63a6t",
        Mnemonic: "lecture draw addict sea prefer erupt army someone album liquid sadness manual fence vintage obey shrimp figure retreat kick refuse verify alien east brand",  
    }
}

const KavaEndpoints = {
    Local: "http://localhost:1317",
    Testnet5000: "http://kava-testnet-5000.kava.io:1317",
    Testnet6000Internal: "http://54.196.2.124:1317",
    Mainnet: "",
}

const KavaDeputy = {
    Local: "",
    Testnet5000: "kava1aphsdnz5hu2t5ty2au6znprug5kx3zpy6zwq29",
    Testnet6000Internal: "kava1aphsdnz5hu2t5ty2au6znprug5kx3zpy6zwq29",
}

const BinanceAccount = {
    Testnet: {
        Address: "tbnb17vwyu8npjj5pywh3keq2lm7d4v76n434pwd8av",
        Mnemonic: "lawsuit margin siege phrase fabric matrix like picnic day thrive correct velvet stool type broom upon flee fee ten senior install wrestle soap sick",
    }
}

const BinanceEndpoints = {
    Testnet: "https://testnet-dex.binance.org",
    Mainnet: "https://dex.binance.org/",
}

const BinanceDeputy = {
    Testnet: "tbnb10uypsspvl6jlxcx5xse02pag39l8xpe7a3468h"
}

module.exports.env = {
    KavaAccount,
    KavaEndpoints,
    KavaDeputy,
    BinanceAccount,
    BinanceEndpoints,
    BinanceDeputy
}