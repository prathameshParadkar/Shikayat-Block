const mongoose = require('mongoose');

const addrSchema = new mongoose.Schema({
    data: { type: mongoose.Schema.Types.Mixed, required: true },
});

const AddressTracker = mongoose.model('addr', addrSchema);

module.exports = AddressTracker;