var express = require('express');
var router = express.Router();
var Order = require('../models/orderList');


router.get('/', function (req, res, next) {
    Order.getAllOrderLists(function (err, orders) {
        if (err) {
            res.json(err);
        }
        else {
            Order.totalOrderList((error, totalCountPackt) => {
                //console.log('totalCountPackt', JSON.stringify(totalCountPackt), totalCountPackt);
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
            console.log("order is ",order);
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
            var newId = "OR"+ (lastDigit + 1);
            req.body.orderId = newId;

            Order.addOrderList(req.body,function(error,order){
                if(error){
                    res.json(error);
                }
                else{
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
            order.id = order.orderId;
            res.json(order);
        }

    });
});

router.put('/:id', function (req, res, next) {

    Order.updateOrderList(req.params.id, req.body, function (err, order) {

        if (err) {
            res.json(err);
        }
        else {
            order.id = order.orderId;
            res.json(order);
        }
    });
});
module.exports = router;