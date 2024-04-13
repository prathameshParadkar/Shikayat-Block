const axios = require("axios");
const fs = require("fs");

require('dotenv').config();

fetchAddressInfo = async (address, network) => {
    if (address === undefined) {
        return;
    }
    const addressInfo = await axios.get(`https://services.tokenview.io/vipapi/${network}/address/${address.toLowerCase()}?apikey=${process.env.vTOKEN}`);
    return addressInfo.data.data;
}

fetchAndAppendTransactions = async (transactions, network, depth) => {
    if (depth === 0) {
        return transactions;
    }

    for (let transaction of transactions) {
        const newTransactions = await fetchAddressInfo(transaction.to, network);
        transaction.txs = await fetchAndAppendTransactions(newTransactions.txs, network, depth - 1);
    }

    return transactions;
}

createFile = async (id, depth) => {
    try {
        if (id === undefined) {
            return;
        }
        const nw = "eth";
        const data = await axios.get(`https://services.tokenview.io/vipapi/${nw}/address/${id.toLowerCase()}?apikey=${process.env.vTOKEN}`);
        const firstTx = await axios.get(`https://services.tokenview.io/vipapi/firsttx/${nw}/${id.toLowerCase()}?apikey=${process.env.vTOKEN}`);
        const firstTxTime = firstTx.data.data.time;

        const transaction = {
            addr: id,
            network: nw,
            first: firstTxTime,
            data: data.data
        };

        transaction.data.data.txs = await fetchAndAppendTransactions(transaction.data.data.txs, nw, depth);

        // Save the transaction JSON to a file
        fs.writeFileSync('transaction.json', JSON.stringify(transaction, null, 2));
    } catch (e) {
        console.log('Error saving transaction', e);
    }
}

createFile("0x96e453250bb2e5c452834f3cd2ca2b86d3f21a9b", 1)