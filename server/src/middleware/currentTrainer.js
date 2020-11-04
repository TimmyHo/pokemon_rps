const jwt = require('jsonwebtoken');

const Trainer = require('../models/trainer');

const currentTrainer = async (req, res, next) => {
    try {
        console.log('CURRENT TRAINER REQUEST', req.cookies)

        if (!req.cookies) {
            // console.log('no cookie defined')
            return next();
        }


        const token = req.cookies['jwt'];


        // console.log('token: ', token);

        if (!token) {
            // console.log('no token');
            return next();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log('DECODED AFTER VERIFY', decoded)
        // console.log('before trainer check');
        const trainer = await Trainer.findOne({ _id: decoded.id, 'tokens': token});


        req.trainer = trainer;

        console.log('CURRENT TRAINER is', req.trainer);
        next();
    } catch (e) {
        console.log(e);
        res.status(401).send({message: 'Please authenticate'});
    }
}

module.exports = currentTrainer;