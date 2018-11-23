
console.log("Common.js");


let getDateTime = module.exports.getDateTime = function(){
  var date = new Date();
  var hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;

  var min = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;

  var sec  = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;

  var year = date.getFullYear();

  var month = date.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;

  var day = date.getDate();
  day = (day < 10 ? "0" : "") + day;

  return day + "-" + month + "-" + year + " " + hour + ":" + min + ":" +sec;


}


let get_return_data = module.exports.get_return_data = function(data){
  let resultados
  if(data.rows.length == 1)
    resultados = data.rows[0]
  else
    resultados = data.rows
  return resultados
}



let get_params = module.exports.get_params = function (req){
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