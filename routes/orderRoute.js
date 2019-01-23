var express = require('express');
var router = express.Router();
var moment = require('moment');
var Order = require('../models/orderList');

//GET orderList/
router.get('/', function (req, res, next) {
    Order.getAllOrderLists(function (err, orders) {
        if (err) {
            res.json(err);
        }
        else {
            Order.totalOrderList((error, totalCountPackt) => {
                if (error) {
                    res.json(error);
                }
                res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
                res.setHeader('Content-Range', '0-9/*');
                res.setHeader('X-Total-Count', totalCountPackt[0]['count(*)']);
                
                // Adding Id property
                orders.forEach(order => {
                    order.id = order.orderId;
                });
                res.json(orders);
               
            });
         }

    });
});

//GET orderList/{orderId}
router.get('/:id?', function (req, res, next) {

    Order.getOrderListById(req.params.id, function (err, order) {

        if (err) {
            res.json(err);
        }
        else {
            order.forEach(OR => {
                OR.id = OR.orderId;
            });
            res.json(order[0]);
        }
    });

});

//GET orderList/{orderId}/menus
router.get('/:id?/menus', function (req, res, next) {

    Order.getMenuListById(req.params.id, function (err, order) {

        if (err) {
            res.json(err);
        }
        else {
            res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
            res.setHeader('Content-Range', '0-9/*');
            order.forEach(OR => {
                OR.id = OR.orderId + " " + OR.itemId;
            });
            res.json(order);
        }
    });

});

//GET orderList/{orderId}/menus/{menuId}
router.get('/:orderId?/menus/:menuId?', function (req, res, next) {

    Order.getMenuById(req.params.orderId,req.params.menuId, function (err, menus) {

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

// POST /orderlist
router.post('/', function (req, res, next) {
    
    Order.getMaxOrderId(function (err, maxOrder) {
        if (err) {
            res.json(err);
        }
        else {
            var lastId = maxOrder[0]['max(orderId)'];
            var lastDigit = Number(lastId.slice(-2));
            var newId = "ORDER "+ (lastDigit + 1);
            req.body.orderId = newId;
            req.body.created = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

            Order.addOrderList(req.body,function(error,order){
                if(error){
                    res.json(error);
                }
                else{
                    console.log("request bosy is ",req.body);
                    res.json(req.body);
                }
            })

        }
    });
});

// POST /orderList/{orderId}/menus
router.post('/:id?/menus', function (req, res, next) {

    Order.addMenuById(req.params.id, req.body,function (err, order) {

        if (err) {
            res.json(err);
        }
        else {
            res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
            res.setHeader('Content-Range', '0-9/*');
            console.log("order is ",order)
            order.id = req.body.orderId + " " + req.body.itemId;
            res.json(order);
        }
    });

});

// PUT /orderList{orderId}
router.put('/:id', function (req, res, next) {
    //req.body.created  = req.body.created.slice(0,-5).replace('T', ' ');;

    Order.updateOrderList(req.params.id, req.body, function (err, order) {

        if (err) {
            res.json(err);
        }
        else {
            res.json(req.body);
        }
    });
});

// PUT /orderList/{orderId}/menus/{menuId}
router.put('/:orderId/menus/:menuId?', function (req, res, next) {
    //req.body.created  = req.body.created.slice(0,-5).replace('T', ' ');;

    Order.updateMenuById(req.params.orderId,req.params.menuId, req.body, function (err, order) {

        if (err) {
            res.json(err);
        }
        else {
            res.json(req.body);
        }
    });
});

// DELETE /orderList/{orderId}
router.delete('/:id', function (req, res, next) {
    
    Order.deleteOrderList(req.params.id, function (err, order) {

        if (err) {
            res.json(err);
        }
        else {
            req.body.id = req.body.orderId;
            res.json({id:req.params.id});
        }

    });
});

// DELETE /orderList/{orderId}/menus/{menuId}
router.delete('/:orderId/menus/:menuId', function (req, res, next) {
    
    Order.deleteMenuById(req.params.orderId,req.params.menuId, function (err, menu) {

        if (err) {
            res.json(err);
        }
        else {
            var Id = req.params.orderId + " " + req.params.menuId;
            res.json({id:Id});
        }

    });
});

module.exports = router;