const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_SECRET_KEY');
        if (req.body.userID && decodedToken.userId !== req.body.userID ){
            throw 'Utilisateur non authentifié'
        }
        next();
        
    } catch (error) {
        return res.status(403).json({message : 'Requête non authentifié !!!'})
    }
}


module.exports = auth;