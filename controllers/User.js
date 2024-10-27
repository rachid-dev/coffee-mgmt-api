const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signUp = (req, res) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        delete req.body.password
        const newUser = new User({
            ...req.body,
            password : hash
        })
        newUser.save()
        .then(() => res.status(201).json({message : 'Account successfuly created !'}))
        .catch(error => res.status(400).json({error : `Sorry this user already exists!`}))
    })
    .catch(error => res.status(500).json({error : `Internal Server problem!!`}))
}


exports.logIn = (req, res) => {

    User.findOne({username : req.body.username})
    .then(user => {
        if(!user){
            return res.status(401).json({error : "username ou mot de passe Incorrect!!!"})
        }
        bcrypt.compare(req.body.password, user.password)
        .then( valid => {
            if(!valid){
                return res.status(401).json({error : "username ou mot de passe Incorrect!!!"})
            }
            const token = jwt.sign(
                {userId : user._id},
                'RANDOM_SECRET_KEY',
                { expiresIn : '24h'}
            )
            res.status(200).json({userId : user._id, token : token})
            
        })
        .catch((error) => res.status(500).json({error : `Problème lié au serveur 2 ${error}`}))
    })
    .catch(() => res.status(500).json({error : "Problème lié au serveur 1"}))
}