//reference of dbconnection.js
var db = require('../dbConnection'); 

var order = {
    getAllOrderLists: function (callback) {
        return db.query("select orderId, DATE_FORMAT(createdDate,'%d/%m/%Y') as createdDate, TIME_FORMAT(createdAt, '%h:%i %p') createdAt from orderList where status=?", ["open"], callback);
    },
    getOrderListById: function (id, callback) {
        return db.query("select orderId, DATE_FORMAT(createdDate,'%d/%m/%Y') as createdDate, TIME_FORMAT(createdAt, '%h:%i %p') createdAt from orderList where orderId=?", [id], callback);
    },
    addOrderList: function (order,callback) {
        return db.query("Insert into orderList values(?,?,?,?)", [order.orderId, order.createdDate,order.createdAt,"open"], callback);
    },
    deleteOrderList: function (id, callback) {
        return db.query("delete from orderList where orderId=?", [id], callback);
    },
    updateOrderList: function (id, order, callback) {
        return db.query("update orderList set createdDate=?,createdAt=?,status=? where orderId=?", [order.createdDate, order.createdAt,"open", id], callback);
    },
    getMaxOrderId: function (callback) {
        return db.query("select max(orderId) from orderList;", callback);
    },
    totalOrderList: function (callback) {
        return db.query("select count(*) from orderList;", callback);
    }

};
module.exports = order;