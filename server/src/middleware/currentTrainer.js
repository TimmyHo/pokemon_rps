const jwt = require('jsonwebtoken');

const Trainer = require('../models/trainer');

const currentTrainer = async (req, res, next) => {
    try {
        if (!req.cookies) {
            return next();
        }
        
        const token = req.cookies['jwt'];
        if (!token) {
            return next();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const trainer = await Trainer.findOne({ _id: decoded.id, 'tokens': token});
        req.trainer = trainer;

        next();
    } catch (e) {
        console.log(e);
        res.status(401).send({message: 'Please authenticate'});
    }
}

module.exports = currentTrainer;