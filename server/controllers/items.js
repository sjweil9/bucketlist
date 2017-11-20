var mongoose = require('mongoose');

// import models
var Item = mongoose.model('Item');
var User = mongoose.model('User');

module.exports = {
    create: (req, res) => {
        User.findOne({_id: req.params.id}, (err, creator) => {
            if (err) {
                return res.json(err.errors);
            }
            req.body.creator = creator.name;
            req.body.checked = false;
            if ('tagged' in req.body) {
                User.findOne({_id: req.body.tagged}, (err, tagged) => {
                    if (err) {
                        return res.json(err.errors);
                    }
                    const created_item = new Item(req.body);
                    created_item.users = [creator._id, tagged._id];
                    created_item.save( (err) => {
                        if (err) {
                            return res.json(err.errors);
                        }
                        creator.items.push(created_item._id);
                        tagged.items.push(created_item._id);
                        tagged.save( (err) => {
                            if (err) {
                                return res.json(err.errors);
                            }
                            creator.save( (err) => {
                                if (err) {
                                    return res.json(err.errors);
                                }
                                return res.json(created_item);
                            });
                        });
                    });
                });
            }
            else {
                let created_item = new Item(req.body);
                created_item.users = [creator._id];
                created_item.save( (err) => {
                    if (err) {
                        return res.json(err.errors);
                    }
                    creator.items.push(created_item._id);
                    creator.save( (err) => {
                        if (err) {
                            return res.json(err.errors);
                        }
                        return res.json(created_item);
                    });
                });
            }
        });
    },
    update: (req, res) => {
        Item.findOne({_id: req.params.id}, (err, item) => {
            if (err) {
                res.json(err.errors);
            }
            const new_status = !item.checked;
            Item.update({_id: req.params.id}, {$set: {checked: new_status}}, (err, updated_item) => {
                if (err) {
                    return res.json(err.errors);
                }
                return res.json(updated_item);
            });
        });
    }
};