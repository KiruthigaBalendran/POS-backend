//reference of dbconnection.js
var db = require('../dbConnection'); 

var menu = {
    getAllMenus: function (callback) {
        return db.query("select * from menu", callback);
    },
    getMenusById: function (id, callback) {
        return db.query("select * from menu where orderId=?", [id], callback);
    },
    addMenu: function (menu,callback) {
        return db.query("Insert into menu values(?,?,?,?,?)", [menu.orderId,menu.itemId,menu.itemName,menu.unitPrice,menu.quantity], callback);
    },
    deleteMenu: function (orderId,itemId, callback) {
        return db.query("delete from menu where orderId=? and itemId=?", [orderId,itemId], callback);
    },
    updateMenu: function (orderId,itemId, menu, callback) {
        return db.query("update menu set itemId=?,itemName=?,unitPrice=?,quantity=? where orderId=? and itemId=?", [menu.itemId,menu.itemName,menu.unitPrice,menu.quantity, orderId,itemId], callback);
    }

};
module.exports = menu;