const express = require('express');
const db = require('./db');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Welcome to our hotel');
});

// Person APIs 

// post route to add a person

// Post request using Callbacks
// app.post('/person',(req, res)=>{
// nowdays no one uses callbacks function like we used in post methods they look quite complex and do not give us code readability.
// const data = req.body; 
// // create a new person document using the mongoose model;
// const newPerson = new Person(data);

// // save the new person to the database;
// newPerson.save((error,savedPerson)=>{
//     if(error){
//         console.log("Error Saving Person");
//         res.status(500).json({error:"Internal Server Error"})
//     }else{
//         console.log('Data saved successfully')
//         res.status(200).json(savedPerson);
//     }
// })
// });

// // Post request usin async await
// app.post('/person', async (req, res) => {
//     try {
//         const data = req.body;

//         const newPerson = new Person(data);

//         const response = await newPerson.save();
//         console.log('data saved');
//         res.status(200).json(response);
//     } catch (error) {
//         console.log(`${error}`);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// Get methods to get the person
// app.get('/person', async (req, res) => {
//     try {
//         const data = await Person.find();
//         console.log('data fetched');
//         res.status(200).json(data);
//     } catch (error) {
//         console.log(`${error}`);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// })


// Menu APIs
// app.post('/menuItem', async (req, res) => {
//     try {
//         const data = req.body;
//         const newMenu = new MenuItem(data);

//         const response = await newMenu.save();

//         console.log('New Menu Item Saved');
//         res.status(200).json(response);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// app.get("/menuItem", async (req, res) => {
//     try {
//         const data = await MenuItem.find();
//         console.log("Data Fetched");
//         res.status(200).json(data);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: 'Internal server error' });

//     }
// });

// // parametrised API calls 
// app.get('/person/:workType', async (req, res) => {
//     try {

//         const workType = req.params.workType;// extract the work type from the url parameter
//         if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
//             const response = await Person.find({ work: workType });
//             console.log("response Fetched");
//             res.status(200).json(response);
//         }else{
//             res.status(404).json({error:'Invalid work type'});
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// })

//  Import the router files

const personRoute = require('./routes/personRoute');
const menuItemRoute = require('./routes/menuItemRoute');
app.use('/person', personRoute);
app.use('/menuItem', menuItemRoute);

app.listen(3000, () => {
    console.log('listening on port 3000');
});