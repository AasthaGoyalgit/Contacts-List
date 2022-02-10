const mongoose = require('mongoose');//require library

mongoose.connect('mongodb://localhost/contact_list_db'); //mongoose will connect to db where "contact_list_db" => db name


//acquire the connection to check if it is successful
const db = mongoose.connection;//connection btw mongoose and db is in db

//error
db.on('error', console.error.bind(console, 'error connection to db'));

//up and running then print the msg
db.once('open', function(){
  console.log('Successfullty connected to the database');
});