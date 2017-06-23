var app = require('./app');

var port = (process.env.USNB_API_GATEWAY_PORT);


console.log("Running in :" + process.env.NODE_ENV);
console.log('About to start listening');
app.listen(port);
console.log('Listening on port: ', port);
