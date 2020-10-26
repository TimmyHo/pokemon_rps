const jwt = require('jsonwebtoken');

const Trainer = require('../models/trainer');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const trainer = await Trainer.findOne({ _id: decoded._id, 'tokens': token});

        if (!trainer) {
            throw new Error('Trainer not found');
        }

        req.trainer = trainer;
        req.token = token;
        next();
    } catch (e) {
        res.status(401).send({error: 'Please authenticate'});
    }
}

module.exports = auth;