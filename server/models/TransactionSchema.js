const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  addr: {type: String, required: true},
  network: {type: String, required: true},
  source: { type: Number, required: true },
  title: { type: String, required: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
  flag: { type: Boolean, required: true, default: false },
  date: { type: Date, required: true, default: Date.now },
  remark: { type: String, default: ""},
  boardID: { type: String}
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
