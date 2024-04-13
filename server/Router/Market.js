const express = require("express");

const marketR = express.Router(); // market router

let marketC = require("../controllers/Market");

marketC = new marketC();

marketR.get("/", marketC.marketInfoTotal);
marketR.get("/:nw", marketC.marketInfo);
marketR.get("/exchange", marketC.exchangeRate);

module.exports = marketR;