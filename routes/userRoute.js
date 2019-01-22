var express = require('express');
var router = express.Router();
var Task = require('../models/user');


router.get('/', function (req, res, next) {
    Task.getAllUsers(function (err, users) {
        if (err) {
            res.json(err);
        }
        else {
            Task.totalUsers((err, totalCountPackt) => {
                //console.log('totalCountPackt', JSON.stringify(totalCountPackt), totalCountPackt);
                if (err) {
                    res.json(err);
                }
                res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
                res.setHeader('Content-Range', '0-9/*');
                res.setHeader('X-Total-Count', totalCountPackt[0]['count(*)']);
                
                // Adding Id property
                users.forEach(user => {
                    user.id = user.userId;
                });
                console.log('users', users);
                res.json(users);
               
            });

        }
    });
});

router.get('/:id?', function (req, res, next) {

    Task.getUserById(req.params.id, function (err, rows) {

        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });

});

router.post('/', function (req, res, next) {
    console.log("req.body", req);
    Task.addUser(req.body, function (err, count) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(req.body);//or return count for 1 &amp;amp;amp; 0
        }
    });
});
router.delete('/:id', function (req, res, next) {

    Task.deleteUser(req.params.id, function (err, count) {

        if (err) {
            res.json(err);
        }
        else {
            res.json(count);
        }

    });
});
router.put('/:id', function (req, res, next) {

    Task.updateUser(req.params.id, req.body, function (err, rows) {

        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});
module.exports = router;