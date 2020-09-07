const mongoose = require('mongoose');

mongoDbUrl = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/pokemon-rps';

mongoose.connect(mongoDbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});