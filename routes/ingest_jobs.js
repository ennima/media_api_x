var express = require('express');
var router = express.Router();
var db = require('./db');
let common = require("./common");
let date = require('date-and-time');



// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a Ingest Job');
// });


let shit_msg = "Se necesita pasar parametros: "
/***********************************************************   
*
*          Ingest Monitor 1.0 Jobs functions             
*
***********************************************************/
router.get('/', function(req, res, next) {
	console.log("------------------------------Listing Ingest Clients:  ")
	// console.log(params)
	let find_query = "SELECT * FROM ingest_jobs;";

	console.log(find_query)
	db.executeQuery(find_query,function(error, data){
		console.log(error);
			// utilidades.cors(res);
		let resultado = {}
		console.log("Data size: "+data["rows"].length)
		if(data["rows"].length <= 0){
			console.log("No hay resultados para la consulta")
			resultados = {"result":0}
		}else{
			console.log("Yeiiii hay resultados")
			// resultados = {"jobs":data.rows}
			resultados = common.get_return_data(data)
		}
		res.send(resultados);
	});
  
});

router.get('/count', function(req, res, next) {
	console.log("------------------------------Listing Ingest Clients:  ")
	// console.log(params)
	let find_query = "SELECT COUNT(*) as total_jobs FROM `ingest_jobs`";

	console.log(find_query)
	db.executeQuery(find_query,function(error, data){
		console.log(error);
			// utilidades.cors(res);
		let resultado = {}
		console.log("Data size: "+data["rows"].length)
		if(data["rows"].length <= 0){
			console.log("No hay resultados para la consulta")
			resultados = {"result":0}
		}else{
			console.log("Yeiiii hay resultados")
			// resultados = {"jobs":data.rows}
			resultados = common.get_return_data(data)
		}
		res.send(resultados);
	});
  
});


router.get('/find_ingest_client', function(req, res, next) {
	console.log("------------------------------Listing Ingest Clients:  ")
	params = common.get_params(req)
  if(params == false)
  {
  	console.log("No hay nada que hacer")
  	res.send({val1:shit_msg + "(`ingest_client_id`)" })
  }else
  {
		let find_query = "SELECT * FROM `ingest_jobs` WHERE `ingest_client_id` = " + params.ingest_client_id + " DESC"

		console.log(find_query)
		db.executeQuery(find_query,function(error, data){
			console.log(error);
				// utilidades.cors(res);
			let resultado = {}
			console.log("Data size: "+data["rows"].length)
			if(data["rows"].length <= 0){
				console.log("No hay resultados para la consulta")
				resultados = {"result":0}
			}else{
				console.log("-------- Yeiiii hay resultados")
				resultados = {"jobs":common.get_return_data(data)}
				console.log(typeof(resultados))
				console.log(Array.isArray(resultados.jobs))
				console.log(Object.keys(resultados))
				console.log(resultados.jobs.length)

				let jobs_arr = [] 
				for(let i = 0, len = resultados.jobs.length; i < len; i++ ){
					//console.log(Object.keys(resultados.jobs[i]))
					
					let origin_clip = resultados.jobs[i].origin_clip.toString().replace(/\\/g,"\\\\")
					let dest_clip = resultados.jobs[i].dest_clip.toString().replace(/\\/g,"\\\\")
					let job_log = resultados.jobs[i].job_log.toString().replace(/\\/g,"\\\\")
					// console.log(orig)
					// console.log(JSON.parse(origin_clip))
					console.log("Job DAte 1: "+resultados.jobs[i].date)
					console.log("Job Date 1 parsed: "+date.format(resultados.jobs[i].date, 'DD-MM-YYYY HH:mm:ss'))
					console.log("---------------")
					let curr_job = {
						"ingest_client_id":resultados.jobs[i].ingest_client_id,
						"job_id":resultados.jobs[i].job_id,
						"origin_clip":JSON.parse(origin_clip),
						"dest_clip":JSON.parse(dest_clip),
						"time":resultados.jobs[i].time,
						"reduction":resultados.jobs[i].reduction,
						"original_represents":resultados.jobs[i].original_represents,
						"date":date.format(resultados.jobs[i].date, 'DD-MM-YYYY HH:mm:ss'),
						"job_log":JSON.parse(job_log),
					}
					// console.log(curr_job)
					// console.log("Job DAte 2: "+curr_job.date)
					jobs_arr.push(curr_job)
				}
				// console.log(jobs_arr)
				resultados.jobs = jobs_arr

				console.log("--------------------------------------------")
				// resultados = common.get_return_data(data)
			}
			res.send(resultados);
		});
	}
  
});


router.post('/add', function(req, res, next) {
  
  params = common.get_params(req)
  if(params == false)
  {
  	console.log("No hay nada que hacer")
  	res.send({val1:shit_msg + "(`ingest_client_id`, `origin_clip`, `dest_clip`, `time`, `reduction`, `original_represents`, `date`, `job_log`)" })
  }else
  {
  	let time_now = common.get_date_time_db()
  	console.log("TIME NOW: " + time_now)
  	// 																																									                                                                                "(`ingest_client_id`, `origin_clip`, `dest_clip`, `time`, `reduction`, `original_represents`, `date :2018-11-23 00:00:00`, `job_log`)
	let insert_query = "INSERT INTO `ingest_jobs` (`ingest_client_id`, `origin_clip`, `dest_clip`, `time`, `reduction`, `original_represents`, `date`, `job_log`) VALUES ('"+params.ingest_client_id+"', '"+params.origin_clip+"', '"+params.dest_clip+"', '"+params.time+"', '"+params.reduction+"', '"+params.original_represents+"', '"+time_now+"', '"+params.job_log+"');"
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