var mongoose = require('mongoose');

// import models
var User = mongoose.model('User');
var Item = mongoose.model('Item');

module.exports = {
    session: (req, res) => {
        if ('user_id' in req.session) {
            User.findOne({_id: req.session.user_id})
            .populate('items')
            .exec( (err, user) => {
                if (err) {
                    return res.json(err.errors);
                }
                return res.json(user);
            });
        }
        else {
            return res.json({logged_in: false});
        }
    },
    logout: (req, res) => {
        if ('user_id' in req.session) {
            delete req.session.user_id;
        }
        return res.json({logged_out: true});
    },
    create: (req, res) => {
        User.findOne({name: req.body.name})
        .populate('items')
        .exec( (err, user) => {
            if (!user) {
                const new_user = new User(req.body);
                new_user.save( (err) => {
                    if (err) {
                        return res.json(err.errors);
                    }
                    req.session.user_id = new_user._id;
                    return res.json(new_user);
                });
            }
            else {
                req.session.user_id = user._id;
                res.json(user);
            }
        });
    },
    showAll: (req, res) => {
        User.find({})
        .populate('items')
        .exec( (err, users) => {
            if (err) {
                return res.json(err.errors);
            }
            return res.json(users);
        });
    },
    showOne: (req, res) => {
        User.findOne({_id: req.params.id})
        .populate('items')
        .exec( (err, user) => {
            if (err) {
                return res.json(err.errors);
            }
            return res.json(user);
        });
    }
};