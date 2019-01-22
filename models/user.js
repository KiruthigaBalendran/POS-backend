//reference of dbconnection.js
var db = require('../dbConnection'); 

var user = {
    getAllUsers: function (callback) {
        return db.query("Select * from user", callback);
    },
    getUserById: function (id, callback) {
        return db.query("select * from user where userId=?", [id], callback);
    },
    addUser: function (user, callback) {
        return db.query("Insert into user values(?,?,?,?)", [user.userId, user.name,user.username, user.password], callback);
    },
    deleteUser: function (id, callback) {
        return db.query("delete from user where userId=?", [id], callback);
    },
    updateUser: function (id, user, callback) {
        return db.query("update user set name=?,username=?,password=? where userId=?", [user.name, user.username,user.password, id], callback);
    },
    totalUsers: function (callback) {
        return db.query("select count(*) from user;", callback);
    }

};
module.exports = user;