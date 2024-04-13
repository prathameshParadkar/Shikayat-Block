const axios = require('axios');

class Market {
    constructor() { }

    marketInfoTotal = async (req, res) => {
        try {

            // https://services.tokenview.io/vipapi/market/marketCap?page=0&size=1000&apikey={apikey}
            const resp = await axios.get(`https://services.tokenview.io/vipapi/market/marketCap?page=0&size=1000&apikey=${process.env.vTOKEN}`);

            // console.log("resp", resp);

            const data = resp.data;
            // console.log("data", data);

            return res.status(200).json({ data });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Internal Server Error" });
        }
    }

    marketInfo = async (req, res) => {
        try {
            let {nw} = req.params;
            nw = nw.toLowerCase();

            // https://services.tokenview.io/vipapi/coin/marketInfo/btc?apikey={apikey}
            const resp = await axios.get(`https://services.tokenview.io/vipapi/coin/marketInfo/${nw}?apikey=${process.env.vTOKEN}`);

            const data = resp.data;

            return res.status(200).json({ data });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Internal Server Error" });
        }
    }

    exchangeRate = async (req, res) => {
        // against usd
        console.log("exchangeRate")
        try {
            // https://services.tokenview.io/vipapi/market/exchange?apikey={apikey}
            const resp = await axios.get(`https://services.tokenview.io/vipapi/market/exchange?apikey=${process.env.vTOKEN}`);
            console.log("resp", resp)
            const data = resp.data;
            return res.status(200).json({ data });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Internal Server Error" });
        }
    }

}

module.exports = Market;