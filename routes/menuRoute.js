var express = require('express');
var router = express.Router();
var Menu = require('../models/menu');


router.get('/', function (req, res, next) {

    Menu.getAllMenus(function (err, menus) {
        if (err) {
            res.json(err);
        }
        else {
            res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
            res.setHeader('Content-Range', '0-9/*');
            
            // Adding Id property
            menus.forEach(menu => {
                menu.id = menu.orderId + " " + menu.itemId;
            });
            res.json(menus);
         }

    });
});

router.get('/:id?', function (req, res, next) {

    Menu.getMenusById(req.params.id, function (err, menus) {

        if (err) {
            res.json(err);
        }
        else {
            // Adding Id property
            menus.forEach(menu => {
                menu.id = menu.orderId + " " + menu.itemId;
            });
            res.json(menus);
        }
    });

});

router.post('/', function (req, res, next) {

    Menu.addMenu(req.body,function(error,order){
        if(error){
            res.json(error);
        }
        else{
            res.json(req.body);
        }
    });

});

router.delete('/:orderId/:itemId', function (req, res, next) {
    
    Menu.deleteMenu(req.params.orderId,req.params.itemId, function (err, menu) {

        if (err) {
            res.json(err);
        }
        else {
            req.body.id = req.body.orderId + " " + req.body.itemId;
            res.json({id:req.body.id});
        }

    });
});

router.put('/:orderId/:itemId', function (req, res, next) {

    Menu.updateMenu(req.params.orderId,req.body.itemId, req.body, function (err, order) {

        if (err) {
            res.json(err);
        }
        else {
            res.json(req.body);
        }
    });
});
module.exports = router;