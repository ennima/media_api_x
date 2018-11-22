var express = require('express');
var router = express.Router();
var db = require('./db');
let common = require("./common");

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

console.log(common.getDateTime())
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

// db.executeQuery("SELECT * FROM clips ORDER BY id DESC LIMIT 1;",function(error, data){
//   console.log(error)
//   console.log("")
//   console.log(data)

// 		// utilidades.cors(res);
// 	// res.send(data);
// 	console.log(data)
// });



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


router.post('/find_clip', function(req, res, next) {
  console.log("------------------------------find_clip:  ")
  // console.log(req)
  params = get_params(req)
  if(params == false)
  {
  	console.log("No hay nada que hacer")
  	res.send({val1:"shit"})
  }else
  {
  	console.log(params)
	// let insert_query = "INSERT INTO `istorage`.`clips` (`name`, `created_date`, `modified_date`, `duration`, `path`, `has_pxy`, `archived_date`, `archived_user`, `original_path`, `format`, `origin`, `storage`) VALUES ('"+params.name+"', '"+params.created_date+"', '"+params.modified_date+"', '"+params.duration+"', '"+params.path+"', '"+params.has_pxy+"', '"+params.archived_date+"', '"+params.archived_user+"', '"+params.original_path+"', '"+params.format+"', '"+params.origin+"', '"+params.storage+"');"
	let find_query = "SELECT * FROM clips WHERE name = '"+params.clip+"' ORDER BY id DESC LIMIT 1;";
	
	console.log(find_query)
	db.executeQuery(find_query,function(error, data){
		console.log(error);
			// utilidades.cors(res);
		let resultado = {}
		console.log("Data size: "+data["rows"].length)
		if(data["rows"].length <= 0){
			console.log("No hay resultados para la consulta")
			resultados = {"clips":"false"}
		}else{
			console.log("Yeiiii hay resultados")
			resultados = {"clips":data.rows}
		}
		res.send(resultados);
	});
	// console.log(params)
    //  	res.send(params)
  }
  
});



let shit_msg = "Se necesita pasar parametros: "
/***********************************************************   
*
*          Ingest Monitor 1.0 Basic Functions             
*
***********************************************************/
router.get('/list_ingest_clients', function(req, res, next) {
	console.log("------------------------------Listing Ingest Clients:  ")
	// console.log(params)
	let find_query = "SELECT * FROM ingest_clients;";

	console.log(find_query)
	db.executeQuery(find_query,function(error, data){
		console.log(error);
			// utilidades.cors(res);
		let resultado = {}
		console.log("Data size: "+data["rows"].length)
		if(data["rows"].length <= 0){
			console.log("No hay resultados para la consulta")
			resultados = {"clips":"false"}
		}else{
			console.log("Yeiiii hay resultados")
			resultados = {"clients":data.rows}
		}
		res.send(resultados);
	});
  
});


router.get('/ingest_client', function(req, res, next) {
	console.log("------------------------------Listing Ingest Clients:  ")
	// console.log(params)

	params = get_params(req)
	if(params == false)
	{
		console.log("No hay nada que hacer")
		res.send({val1:shit_msg + "(`ingest_client_id`)" })
	}else{

		let find_query = "SELECT * FROM `ingest_clients` WHERE `ingest_client_id` = "+params.ingest_client_id+";";

		console.log(find_query)
		db.executeQuery(find_query,function(error, data){
			console.log(error);
				// utilidades.cors(res);
			let resultado = {}
			console.log("Data size: "+data["rows"].length)
			if(data["rows"].length <= 0){
				console.log("No hay resultados para la consulta")
				resultados = {"clips":"false"}
			}else{
				console.log("Yeiiii hay resultados")
				resultados = data.rows
			}
			res.send(resultados);
		});


	}
  
});


router.post('/add_ingest_client', function(req, res, next) {
  
  params = get_params(req)
  if(params == false)
  {
  	console.log("No hay nada que hacer")
  	res.send({val1:shit_msg + "(`name`, `host_name`, `IP`, `status`, `message`, `type`, `allow`, `jobs`)" })
  }else
  {

  	// INSERT INTO `istorage`.`ingest_clients` (`ingest_client_id`, `name`, `host_name`, `IP`, `status`, `message`) VALUES (NULL, 'media_manager_1', '', '', 'offline', '');
	let insert_query = "INSERT INTO `istorage`.`ingest_clients` (`name`, `host_name`, `IP`, `status`, `message`, `type`, `allow`, `jobs`) VALUES ('"+params.name+"', '"+params.host_name+"', '"+params.IP+"', '"+params.status+"', '"+params.message+"', '"+params.type+"', '"+params.allow+"', '"+params.jobs+"');"
	console.log(insert_query)
	db.executeQuery(insert_query,function(error, data){
		console.log(error);
			// utilidades.cors(res);
		res.send(data);
	});
	// console.log(params)
    //  	res.send(params)
  }
  
});


router.post('/set_ingest_client_status', function(req, res, next) {
  
  params = get_params(req)
  if(params == false)
  {
  	console.log("No hay nada que hacer")
  	res.send({val1:shit_msg + "(`status`, `ingest_client_id`)" })
  }else
  {

  	// UPDATE `istorage`.`ingest_clients` SET `status` = 'online' WHERE `ingest_clients`.`ingest_client_id` = 1;
	let insert_query = "UPDATE `istorage`.`ingest_clients` SET `status` = '"+params.status+"' WHERE `ingest_clients`.`ingest_client_id` = "+params.ingest_client_id+";"
	console.log(insert_query)
	db.executeQuery(insert_query,function(error, data){
		console.log(error);
			// utilidades.cors(res);
		res.send(data);
	});
	// console.log(params)
    //  	res.send(params)
  }
  
});


router.post('/set_ingest_client_jobs', function(req, res, next) {
  
  params = get_params(req)
  if(params == false)
  {
  	console.log("No hay nada que hacer")
  	res.send({val1:shit_msg + "(`jobs`, `ingest_client_id`)" })
  }else
  {

  	// UPDATE `istorage`.`ingest_clients` SET `status` = 'online' WHERE `ingest_clients`.`ingest_client_id` = 1;
	let insert_query = "UPDATE `istorage`.`ingest_clients` SET `jobs` = '"+params.jobs+"' WHERE `ingest_clients`.`ingest_client_id` = "+params.ingest_client_id+";"
	console.log(insert_query)
	db.executeQuery(insert_query,function(error, data){
		console.log(error);
			// utilidades.cors(res);
		res.send(data);
	});
	// console.log(params)
    //  	res.send(params)
  }
  
});

router.post('/set_ingest_client_type', function(req, res, next) {
  
  params = get_params(req)
  if(params == false)
  {
  	console.log("No hay nada que hacer")
  	res.send({val1:shit_msg + "(`type`, `ingest_client_id`)" })
  }else
  {

  	// UPDATE `istorage`.`ingest_clients` SET `status` = 'online' WHERE `ingest_clients`.`ingest_client_id` = 1;
	let insert_query = "UPDATE `istorage`.`ingest_clients` SET `type` = '"+params.type+"' WHERE `ingest_clients`.`ingest_client_id` = "+params.ingest_client_id+";"
	console.log(insert_query)
	db.executeQuery(insert_query,function(error, data){
		console.log(error);
			// utilidades.cors(res);
		res.send(data);
	});
	// console.log(params)
    //  	res.send(params)
  }
  
});

router.post('/set_ingest_client_host_name', function(req, res, next) {
  
  params = get_params(req)
  if(params == false)
  {
  	console.log("No hay nada que hacer")
  	res.send({val1:shit_msg + "(`host_name`, `ingest_client_id`)" })
  }else
  {

  	// UPDATE `istorage`.`ingest_clients` SET `status` = 'online' WHERE `ingest_clients`.`ingest_client_id` = 1;
	let insert_query = "UPDATE `istorage`.`ingest_clients` SET `host_name` = '"+params.host_name+"' WHERE `ingest_clients`.`ingest_client_id` = "+params.ingest_client_id+";"
	console.log(insert_query)
	db.executeQuery(insert_query,function(error, data){
		console.log(error);
			// utilidades.cors(res);
		res.send(data);
	});
	// console.log(params)
    //  	res.send(params)
  }
  
});

router.post('/set_ingest_client_ip', function(req, res, next) {
  
  params = get_params(req)
  if(params == false)
  {
  	console.log("No hay nada que hacer")
  	res.send({val1:shit_msg + "(`ip`, `ingest_client_id`)" })
  }else
  {

  	// UPDATE `istorage`.`ingest_clients` SET `status` = 'online' WHERE `ingest_clients`.`ingest_client_id` = 1;
	let insert_query = "UPDATE `istorage`.`ingest_clients` SET `IP` = '"+params.ip+"' WHERE `ingest_clients`.`ingest_client_id` = "+params.ingest_client_id+";"
	console.log(insert_query)
	db.executeQuery(insert_query,function(error, data){
		console.log(error);
			// utilidades.cors(res);
		res.send(data);
	});
	// console.log(params)
    //  	res.send(params)
  }
  
});

router.post('/set_ingest_client_allow', function(req, res, next) {
  
  params = get_params(req)
  if(params == false)
  {
  	console.log("No hay nada que hacer")
  	res.send({val1:shit_msg + "(`allow`, `ingest_client_id`)" })
  }else
  {

  	// UPDATE `istorage`.`ingest_clients` SET `status` = 'online' WHERE `ingest_clients`.`ingest_client_id` = 1;
	let insert_query = "UPDATE `istorage`.`ingest_clients` SET `allow` = '"+params.allow+"' WHERE `ingest_clients`.`ingest_client_id` = "+params.ingest_client_id+";"
	console.log(insert_query)
	db.executeQuery(insert_query,function(error, data){
		console.log(error);
			// utilidades.cors(res);
		res.send(data);
	});
	// console.log(params)
    //  	res.send(params)
  }
  
});

router.post('/ingesting_ingest_client', function(req, res, next) {
  
  params = get_params(req)
  if(params == false)
  {
  	console.log("No hay nada que hacer")
  	res.send({val1:shit_msg + "(`num_clips`, `ingest_client_id`)" })
  }else
  {
  	let message = "Ingestando "+params.num_clips+" clips"
  	let status = "ingest"
  	// UPDATE `istorage`.`ingest_clients` SET `status` = 'online' WHERE `ingest_clients`.`ingest_client_id` = 1;
	let insert_query = "UPDATE `istorage`.`ingest_clients` SET `status` = '"+status+"', `message` = '"+message+"' WHERE `ingest_clients`.`ingest_client_id` = "+params.ingest_client_id+";"
	console.log(insert_query)
	db.executeQuery(insert_query,function(error, data){
		console.log(error);
			// utilidades.cors(res);
		res.send(data);
	});
	// console.log(params)
    //  	res.send(params)
  }
  
});


router.post('/fail_ingesting_ingest_client', function(req, res, next) {
  
  params = get_params(req)
  if(params == false)
  {
  	console.log("No hay nada que hacer")
  	res.send({val1:shit_msg + "(`fail_msg`, `ingest_client_id`)" })
  }else
  {
  	let message = params.fail_msg
  	let status = "fail"
  	// UPDATE `istorage`.`ingest_clients` SET `status` = 'online' WHERE `ingest_clients`.`ingest_client_id` = 1;
	let insert_query = "UPDATE `istorage`.`ingest_clients` SET `status` = '"+status+"', `message` = '"+message+"' WHERE `ingest_clients`.`ingest_client_id` = "+params.ingest_client_id+";"
	console.log(insert_query)
	db.executeQuery(insert_query,function(error, data){
		console.log(error);
			// utilidades.cors(res);
		res.send(data);
	});
	// console.log(params)
    //  	res.send(params)
  }
  
});

router.post('/offline_ingest_client', function(req, res, next) {
  
  params = get_params(req)
  if(params == false)
  {
  	console.log("No hay nada que hacer")
  	res.send({val1:shit_msg + "(`ingest_client_id`)" })
  }else
  {
  	
  	let status = "offline"
  	let message = common.getDateTime()
  	// UPDATE `istorage`.`ingest_clients` SET `status` = 'online' WHERE `ingest_clients`.`ingest_client_id` = 1;
	let insert_query = "UPDATE `istorage`.`ingest_clients` SET `status` = '"+status+"', `message` = '"+message+"' WHERE `ingest_clients`.`ingest_client_id` = "+params.ingest_client_id+";"
	console.log(insert_query)
	db.executeQuery(insert_query,function(error, data){
		console.log(error);
			// utilidades.cors(res);
		res.send(data);
	});
	// console.log(params)
    //  	res.send(params)
  }
  
});

router.post('/online_ingest_client', function(req, res, next) {
  
  params = get_params(req)
  if(params == false)
  {
  	console.log("No hay nada que hacer")
  	res.send({val1:shit_msg + "(`ingest_client_id`)" })
  }else
  {
  	
  	let status = "online"
  	let message = common.getDateTime()
  	// UPDATE `istorage`.`ingest_clients` SET `status` = 'online' WHERE `ingest_clients`.`ingest_client_id` = 1;
	let insert_query = "UPDATE `istorage`.`ingest_clients` SET `status` = '"+status+"', `message` = '"+message+"' WHERE `ingest_clients`.`ingest_client_id` = "+params.ingest_client_id+";"
	console.log(insert_query)
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
