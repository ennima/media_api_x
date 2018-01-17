
var mysql = require('mysql');

console.log("IN DB js");

var lala = module.exports.lala = "lala";

var pool      =    mysql.createPool({
    connectionLimit : 10,
	host: "DEVEL-DB",
	user: "root",
	password: "password",
    database : 'istorage',
    debug    :  false
}); 

var executeQuery = module.exports.executeQuery = function(query,callback){
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          throw err;
        }   
        connection.query(query,function(err,rows){
            connection.release();
            if(!err) {
                callback(null, {rows: rows});
            }           
        });
        connection.on('error', function(err) {      
              throw err;
              return;     
        });
    });
}



// module.exports.mysql = mysql;
// module.exports.pool = pool;
// module.exports = executeQuery;