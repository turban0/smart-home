var services = require('./backendServices');

module.exports = function(app) {
	app.get('/api/sensor/getAll', function(req, res) {
		setTimeout(function(){
			services.sensor.getAll().then(function(data){
				res.json({data:data});
			}); 
		}, 1000)    
	});
	
	app.get('/api/sensor/get/:id', function(req, res) {
		services.sensor.get(req.params.id).then(res.json);    
	});

	app.post('/api/sensor/remove/:id', isLoggedIn, function(req, res) {
		setTimeout(function(){
			services.sensor.remove(req.params.id).then(res.end);
		}, 1000)    
 	});
  
	app.post('/api/sensor/put', isLoggedIn, function(req, res) {
		var sensor = {
			name        : req.body.name,
			type        : req.body.type,
			switchable  : req.body.switchable,
			address     : req.body.address,
			addressType : req.body.addressType
		};
		services.sensor.put(sensor).then(res.send);    
	});   
	app.post('/api/sensor/update/:id', isLoggedIn, function(req, res) {
		var sensor = {
			name        : req.body.name,
			type        : req.body.type,
			switchable  : req.body.switchable,
			address     : req.body.address,
			addressType : req.body.addressType
		};
		services.sensor.update(req.params.id, sensor).then(res.send);    
	});     
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.send(401);
}