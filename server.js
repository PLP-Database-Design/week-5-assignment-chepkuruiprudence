const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv')
const cors = require('cors');


//configure environment ariables
app.use(express.json());
app.use(cors());
dotenv.config();


// Question 1 goes here
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


// Question 2 goes here
db.connect((err) => {
 //connection is not successful
 if(err){
  console.log("Error connecting to the database", err)
 }

 //connection is successful
 console.log("Successfully connected to my SQL", db.threadId);
});
// Question 3 goes here
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
// Question 4 goes here
app.get('/data', (req,res) => {

    // Retrieve data from database 
    db.query('SELECT * FROM patients', (err, results) =>{
        if (err){
            console.error(err);
            res.status(500).send('Error Retrieving data')
        }else {
            //Display the records to the browser 
            res.render('data', {results: results});
        }
    });
});
// listen to the server
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);

    // Sending a message to the browser 
   const PORT = 3000
   app.listen(PORT, () => {
     console.log(`server is runnig on http://localhost:${PORT}`)
   })

});