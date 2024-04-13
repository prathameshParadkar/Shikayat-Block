const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    // image: {type: String, required: true}
    boardId: {type: String, required: true},
    graphData: { type: mongoose.Schema.Types.Mixed, required: true }
});

const Board = mongoose.model('board', boardSchema);

module.exports = Board;