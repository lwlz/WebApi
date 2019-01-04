let express = require('express');
let bodyParser = require('body-parser')
let mongoose = require('mongoose');
let usersRoutes = require('./routes/users-routes');
let app = express();

const confimongo = require('./configurations/config-mongo');
mongoose.connect(confimongo.database);
// mongoose.Promise = global.Promise; V4


app.use(bodyParser.urlencoded({extended : false})); //URL
app.use(bodyParser.json()) // body

// app.use('/users', users);
app.use('api/users', usersRoutes);



app.route('/').get((req, resp) => {

      // resp.send('le serveur marche')
      resp.json('le serveur marche')
})




app.listen(4300);

module.exports = app;

console.log("hello server started on 4300")
// console.log("after break pts")



