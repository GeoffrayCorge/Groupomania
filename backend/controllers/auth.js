const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    console.log(req.body);
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const file = req.files ? req.files[0] : undefined 
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
                picture: file? (`${req.protocol}://${req.get('host')}/images/${file.filename}`):"../../../assets/images.png",
                role: req.body.role
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    console.log(req.body);
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id, role: user.role },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        ),
                        role: user.role
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.logout = (req, res, next) => {  
    res.status(200).json("Utilisateur déconnecté");
};

