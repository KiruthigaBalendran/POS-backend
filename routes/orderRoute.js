var express = require('express');
var router = express.Router();
var moment = require('moment');
var Order = require('../models/orderList');


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

router.put('/:id', function (req, res, next) {
    req.body.created  = req.body.created.slice(0,-5).replace('T', ' ');;

    Order.updateOrderList(req.params.id, req.body, function (err, order) {

        if (err) {
            res.json(err);
        }
        else {
            res.json(req.body);
        }
    });
});
module.exports = router;