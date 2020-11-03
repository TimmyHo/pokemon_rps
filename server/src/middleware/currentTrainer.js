const jwt = require('jsonwebtoken');

const Trainer = require('../models/trainer');

const currentTrainer = async (req, res, next) => {
    try {
        if (req.session === null || req.session.jwt === null) {
          return next();
        }

        const token = req.session.jwt;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const trainer = await Trainer.findOne({ _id: decoded._id, 'tokens': token});

        req.trainer = trainer;
        next();
    } catch (e) {
        res.status(401).send({error: 'Please authenticate'});
    }
}

module.exports = currentTrainer;