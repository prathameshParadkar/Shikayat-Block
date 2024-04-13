const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

const DB = process.env.MONGO;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`DB connected`);
}).catch((err) => console.log(`DB connection failed`));