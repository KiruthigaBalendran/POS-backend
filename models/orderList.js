//reference of dbconnection.js
var db = require('../dbConnection'); 

var order = {
    getAllOrderLists: function (callback) {
        return db.query("select orderId, customerName,created from orderList where status=?", ["open"], callback);
    },
    getOrderListById: function (id, callback) {
        return db.query("select orderId,customerName,created from orderList where orderId=? and status=?", [id,"open"], callback);
    },
    addOrderList: function (order,callback) {
        return db.query("Insert into orderList values(?,?,?,?)", [order.orderId, order.customerName, order.created,"open"], callback);
    },
    deleteOrderList: function (id, callback) {
        return db.query("delete from orderList where orderId=?", [id], callback);
    },
    updateOrderList: function (id, order, callback) {
        return db.query("update orderList set customerName=?,created=?,status=? where orderId=?", [order.customerName, order.created,"open", id], callback);
    },
    getMaxOrderId: function (callback) {
        return db.query("select max(orderId) from orderList;", callback);
    },
    totalOrderList: function (callback) {
        return db.query("select count(*) from orderList;", callback);
    }

};
module.exports = order;