var mongoose = require('mongoose');
var path = require('path');

// import controllers
var items = require('../controllers/items.js');
var users = require('../controllers/users.js');

module.exports = function(app) {
    
    app.post('/users', users.create);

    app.get('/users', users.showAll);

    app.get('/users/:id', users.showOne);

    app.get('/session', users.session);

    app.get('/logout', users.logout);

    app.post('/items/create/:id', items.create);

    app.get('/items/:id', items.update);

    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve('./client/dist/index.html'));
    });

};