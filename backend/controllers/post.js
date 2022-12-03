const Post = require('../models/post');
const fs = require('fs');
const { log } = require('console');


exports.getAllPosts = (req, res, next) => {
    Post.find().sort({dateSave : -1})        //permets d'ordonner les publications
        .then((posts) => res.status(200).json(posts))
        .catch((error) => res.status(404).json({ error }));
};

exports.getOnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => res.status(200).json(post))
        .catch((error) => res.status(404).json({ error }));
};

exports.createPost =  (req, res, next) => {
    console.log(req.files);
    console.log(JSON.stringify(req.body));
    const file = req.files ? req.files[0] : undefined;
    const postObject = file ? {
        ...JSON.parse(JSON.stringify(req.body)),
        picture: `${req.protocol}://${req.get('host')}/images/${file.filename}`,
    }: JSON.parse(JSON.stringify(req.body));
    delete postObject._id;
    delete postObject._userId;
    const post = new Post({
        ...postObject,
        userId: req.auth.userId,
        usersLiked: []
    });
    post.save()
        .then(() => res.status(200).json({ message: "Post enregistré" }))
        .catch((error) => res.status(404).json({ error }));
};

exports.modifyPost = (req, res, next) => {
    const file = req.files ? req.files[0] : undefined;

    const postObject = file ? {
        ...JSON.parse(JSON.stringify(req.body)),
        picture: `${req.protocol}://${req.get('host')}/images/${file.filename}`,
    } : { ...req.body };
    console.log(req.body);
    console.log(postObject);

    delete postObject._userId;
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (post.userId != req.auth.userId && req.auth.role != "ADMIN") {
                res.status(403).json({ message: 'Utilisateur non authorisé' });
            } else {
                if (file && post.picture) {
                    const filename = post.picture.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {});    
                }
                Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Post modifié !' }))
                .catch((error) => res.status(401).json({ error }));

            }
        })
        .catch((error) => res.status(404).json({ error }));
        
};

exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (post.userId != req.auth.userId && req.auth.role != "ADMIN") {
                res.status(403).json({ message: 'Utilisateur non authorisé' });
            } else {
                if (post.picture) {
                    const filename = post.picture.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {});    
                }
                    Post.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Post supprimé !' }))
                        .catch((error) => res.status(401).json({ error }));
            }
        })
        .catch((error) => res.status(404).json({ error }));
};

exports.likes = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (!post.usersLiked.includes(req.body.userId)) {
                Post.updateOne({ _id: req.params.id }, { $push: { usersLiked: req.body.userId } })
                    .then(() => res.status(200).json({ message: "J'aime" }))
                    .catch((error) => res.status(401).json({ error }));
            }
            else {
                Post.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId } })
                    .then(() => res.status(200).json({ message: "Je n'aime plus" }))
                    .catch((error) => res.status(401).json({ error }));
            }
        })
        .catch((error) => res.status(401).json({ error }));
}


exports.addComment = (req, res, next) => {
    console.log(req.body);
    Post.findOne({ _id: req.params.post })
        .then((post) => {
            Post.updateOne({_id:req.params.post}, {$push: {comments: req.body} })
            .then(() => res.status(200).json({ message: "Commentaire ajouté" }))
            .catch((error) => res.status(401).json({ error }));

        })
        .catch((error) => res.status(404).json({ error }));
};

exports.updateComment = (req, res, next) => {
    Post.findOne({ _id: req.params.post })
        .then((post) => {
            const index= post.comments.findIndex((x) => x.commentId == req.params.id)
            if (index > -1) {
                post.comments[index]=req.body
                Post.updateOne({_id:req.params.post}, {...JSON.parse(JSON.stringify(post))})
                .then(() => res.status(200).json({ message: "Commentaire modifié" }))
                .catch((error) => res.status(401).json({ error }));
    
            }
        })
        .catch((error) => res.status(404).json({ error }));
};


exports.deleteComment = (req, res, next) => {
    Post.findOne({ _id: req.params.post })
        .then((post) => {
            const index= post.comments.findIndex((x) => x.commentId == req.params.id)
            if (index > -1) {
                post.comments.splice(index, 1)
                Post.updateOne({_id:req.params.post}, {...JSON.parse(JSON.stringify(post))})
                .then(() => res.status(200).json({ message: "Commentaire supprimé" }))
                .catch((error) => res.status(401).json({ error }));
            }
        })
        .catch((error) => res.status(404).json({ error }));
};

