const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        const role = decodedToken.role;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Utilisateur invalide';
          } else {
            req.auth = {
                userId: userId,
                role: role
            };
              }
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};
