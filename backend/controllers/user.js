const User = require('../models/user');

exports.getAllUsers = (req, res, next) => {
    User.find()     
        .then((users) => res.status(200).json(users))
        .catch((error) => res.status(404).json({ error }));
};

exports.getOneUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then((users) => res.status(200).json(users))
        .catch((error) => res.status(404).json({ message: 'Utilisateur inconnu !!' }));
}

exports.updateUser = (req, res, next) => {
    const file = req.files ? req.files[0] : undefined 
    const userObject = file ? {
        ...JSON.parse(req.body.user),
        picture: `${req.protocol}://${req.get('host')}/images/${file.filename}`
    } : { ...req.body };

    delete userObject._userId;
    User.findOne({ _id: req.params.id })
        .then((user) => {
            if (user == null)
            return res.status(404).json({ message: 'Utilisateur inconnu !' })
            if(user._id != req.auth.userId && req.auth.role != "ADMIN") {       // TODO : à compléter pour les posts et les comments
                res.status(403).json({ message: 'Utilisateur non authorisé' });
            } 
            if(file && user.picture) {
                const filename = user.picture.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {})
            }
          User.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Utilisateur modifié !' }))
                        .catch((error) => res.status(401).json({ error }));
                })
            
        .catch((error) => res.status(404).json({ error }));
};