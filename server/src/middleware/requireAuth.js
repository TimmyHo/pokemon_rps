
// Assume it comes after a call to the currentTrainer middleware
const requireAuth = (req, res, next) => {
    if (!req.trainer) {
        return res.status(401).send({error: 'Please authenticate'});
    }

    next();
}

module.exports = requireAuth;