// const ethers = require("ethers");
// const path = require("path");
require("dotenv").config();
const fs = require("fs");
const Moralis = require("moralis");
const Moralis2 = Moralis.default;
const moralisKey = process.env.MORALIS_KEY;

async function saveFile(path) {
  try {
    await Moralis2.start({
      apiKey: moralisKey,
    });
    console.log(path);
    const data = fs.readFileSync(path, { encoding: "base64" });
    const uploadArray = [
      {
        path: "file",
        content: data,
      },
    ];
    const response = await Moralis2.EvmApi.ipfs.uploadFolder({
      abi: uploadArray,
    });
    var filePath = response.jsonResponse[0].path;
    // filePath = encrypt(Buffer.from(filePath));
    // const url_res = await interactWithContract(name, filePath);
    // const storedhash = { iv: iv.toString("hex"), encryptedData: filePath };
    // const decrypted_hash = decrypt(storedhash);
    console.log(`IPFS hash is stored in the smart contract: ${filePath}`);
    const url_link = filePath.toString();
    console.log("SaveFile Stored Hash : ", url_link);
    return url_link;
  } catch (error) {
    console.error("Error saving file to IPFS:", error);
  }
}

module.exports = saveFile;
