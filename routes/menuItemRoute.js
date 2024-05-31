const express = require('express');
const MenuItem = require('../models/menu');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newMenu = new MenuItem(data);

        const response = await newMenu.save();

        console.log('New Menu Item Saved');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get("/", async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log("Data Fetched");
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });

    }
});

router.get("/:taste", async (req, res) => {
    try {
        const taste = req.params.taste;
        if (taste == 'sour' || taste == 'sweet' || taste == 'spicy') {
            const data = await MenuItem.find({ taste: taste });
            console.log("Data Fetched");
            res.status(200).json(data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put("/:id", async (req, res) => {
    const menuId = req.params.id;
    const updateMenuData = req.body;
    try {
        const response = await MenuItem.findByIdAndUpdate(menuId, updateMenuData,{
            new:true,
            runValidators:true
        });
        if (!response) {
            res.status(404).json({error:'Data Not Found'})
        }
        console.log("Data Updated");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:id',async (req, res)=>{
    try {   
        const menuId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(menuId);

        if(!response){
            res.status(404).json({error:'Data Not Found'});
        }

        console.log("Data Deleted Successfully");
        res.status(200).json({massage:'Data deleted'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// comment added for testing purpose
module.exports = router;