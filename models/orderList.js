//reference to dbconnection.js
var db = require('../dbConnection'); 

var order = {
    getAllOrderLists: function (callback) {
        return db.query("select orderId, customerName,created from orderlist where status=?", ["open"], callback);
    },
    getOrderListById: function (id, callback) {
        return db.query("select orderId,customerName,created from orderlist where orderId=? and status=?", [id,"open"], callback);
    },
    getMenuListById: function (id, callback) {
        return db.query("select * from menu where orderId=?", [id], callback);
    },
    getMenuById: function (orderId,itemId, callback) {
        return db.query("select * from menu where orderId=? and itemId=?", [orderId,itemId], callback);
    },
    addOrderList: function (order,callback) {
        return db.query("Insert into orderlist values(?,?,?,?)", [order.orderId, order.customerName, order.created,"open"], callback);
    },
    addMenuById: function (id,menu,callback) {
        return db.query("Insert into menu values(?,?,?,?,?)", [id,menu.itemId,menu.itemName,menu.unitPrice,menu.quantity], callback);
    },
    deleteOrderList: function (id, callback) {
        return db.query("delete from orderlist where orderId=?", [id], callback);
    },
    deleteMenuById:  function (orderId,itemId, callback) {
        return db.query("delete from menu where orderId=? and itemId=?", [orderId,itemId], callback);
    },
    updateOrderList: function (id, order, callback) {
        return db.query("update orderlist set customerName=?,created=?,status=? where orderId=?", [order.customerName, order.created,"open", id], callback);
    },
    updateMenuById: function (orderId,itemId, menu, callback) {
        return db.query("update menu set itemId=?,itemName=?,unitPrice=?,quantity=? where orderId=? and itemId=?", [menu.itemId,menu.itemName,menu.unitPrice,menu.quantity, orderId,itemId], callback);
    },
    getMaxOrderId: function (callback) {
        return db.query("select max(orderId) from orderlist;", callback);
    },
    totalOrderList: function (callback) {
        return db.query("select count(*) from orderlist;", callback);
    }
};
module.exports = order;