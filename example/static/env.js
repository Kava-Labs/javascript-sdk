const KavaAccount = {
    Local: {
        Address: "",
        Mnemonic: ""   
    },
    Testnet: {
        Address: "",
        Mnemonic: "",  
    },
    Mainnet: {
        Address: "",
        Mnemonic: "",  
    }
}

const KavaEndpoints = {
    Local: "http://localhost:1317",
    Testnet: "https://kava-testnet-8000.kava.io",
    Mainnet: "https://kava3.data.kava.io",
}

const KavaDeputy = {
    Testnet: "kava1tfvn5t8qwngqd2q427za2mel48pcus3z9u73fl",
    Mainnet: "kava1r4v2zdhdalfj2ydazallqvrus9fkphmglhn6u6",
}

const BinanceAccount = {
    Testnet: {
        Address: "",
        Mnemonic: "",
    },
    Mainnet: {
        Address: "",
        Mnemonic: ""
    }
}

const BinanceEndpoints = {
    Testnet: "https://testnet-dex.binance.org",
    Mainnet: "https://dex.binance.org/",
}

const BinanceDeputy = {
    Testnet: "tbnb1et8vmd0dgvswjnyaf73ez8ye0jehc8a7t7fljv",
    Mainnet: "bnb1jh7uv2rm6339yue8k4mj9406k3509kr4wt5nxn"
}

module.exports.env = {
    KavaAccount,
    KavaEndpoints,
    KavaDeputy,
    BinanceAccount,
    BinanceEndpoints,
    BinanceDeputy
}