var express = require('express');
var router = express.Router();
var db = require('./db');

function get_params(req){
	let result = {}
	if(Object.keys(req.body).length > 0){
		console.log("Hay Body")
		result = req.body
	}else if(Object.keys(req.query).length > 0){
		console.log("Hay Query")
		result = req.query
	}else{
		console.log("No hay parametros")
		result = false
	}

	return result
}
/* GET home page. */


console.log("Media Api Jalando...")
  // Prevenir error de conection closed
setInterval(function () {
	  // db.query('SELECT 1');

	  var query = "SELECT 1;";
	  db.executeQuery(query,function(error, data){
	      console.log(error);
	  	  console.log("--v^---Manteniendo connection:");
	  	  console.log(data);
		});

	}, 5000);

  db.executeQuery("SELECT * FROM clips ORDER BY id DESC LIMIT 1;",function(error, data){
      console.log(error)
      console.log("")
      console.log(data)

  		// utilidades.cors(res);
		// res.send(data);
		console.log(data)
	});



router.get('/', function(req, res, next) {
  
  params = get_params(req)
  if(params == false){
  	console.log("No hay nada que hacer")
  	res.send({runing:"true"})
  }else{
  	res.send(params)
  }
  
});

router.post('/store_clip', function(req, res, next) {
  
  params = get_params(req)
  if(params == false)
  {
  	console.log("No hay nada que hacer")
  	res.send({val1:"shit"})
  }else
  {

	let insert_query = "INSERT INTO `istorage`.`clips` (`name`, `created_date`, `modified_date`, `duration`, `path`, `has_pxy`, `archived_date`, `archived_user`, `original_path`, `format`, `origin`, `storage`) VALUES ('"+params.name+"', '"+params.created_date+"', '"+params.modified_date+"', '"+params.duration+"', '"+params.path+"', '"+params.has_pxy+"', '"+params.archived_date+"', '"+params.archived_user+"', '"+params.original_path+"', '"+params.format+"', '"+params.origin+"', '"+params.storage+"');"
	db.executeQuery(insert_query,function(error, data){
		console.log(error);
			// utilidades.cors(res);
		res.send(data);
	});
	// console.log(params)
    //  	res.send(params)
  }
  
});

module.exports = router;
