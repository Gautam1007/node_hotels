const mongoose = require('mongoose');

const mongodbURL = "mongodb://localhost:27017/hotel"


// establish the database connection 
mongoose.connect(mongodbURL);

// create the connectioon object that is reponsiable for database interaction
const db = mongoose.connection;


// define event listeners for database connection
db.on('connected', ()=>{
    console.log("MongoDB server is connnected");
});
db.on('disconnected', ()=>{
    console.log("MongoDB server is disconnnected");
});
db.on('error', (err)=>{
    console.log("Error is occured",err);
});

// export the database connection
module.exports = db;