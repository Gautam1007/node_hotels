const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

// Post methos to get person
router.post('/', async (req, res) => {
    try {
        const data = req.body;// Assuming the request body containes the person data

        // Create  anew Person document using the Mongoode model
        const newPerson = new Person(data);

        // Save the new person to the database
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch (error) {
        console.log(`${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get methods to get the person
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (error) {
        console.log(`${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
})

// parametrised API calls 
router.get('/:workType', async (req, res) => {
    try {

        const workType = req.params.workType;// extract the work type from the url parameter
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const response = await Person.find({ work: workType });
            console.log("response Fetched");
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid work type' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update data using PUT method

router.put('/:id', async (req, res) => {
    const id = req.params.id;// extract the id from the url parameter
    const personUpdatedData = req.body;// Updated data from the person
    try {
        const response = await Person.findByIdAndUpdate(id, personUpdatedData, {
            new: true,//Return the updated document
            runValidators: true,// run mongoose validation
        });
        if (!response) {
            res.status(404).json({error:'Person Not Found'});
        }
        console.log("Data Updated Successfully");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// deleting data using Delete method
router.delete('/:id', async (req, res) => {
    const personId = req.params.id;// extract the id from the url parameter
    try {
        const response = await Person.findByIdAndDelete(personId);

        if(!response){
            res.status(404).json({error:'Person Not Found'});
        }
        console.log('data deleted');
        res.status(200).json({message:'Person deleted successfully'});

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;