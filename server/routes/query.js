const express = require('express');
const router = express.Router();
const Query = require('../models/query'); 

// Create a new query
router.post('/queries', async (req, res) => {
    try {
        const query = new Query(req.body);
        await query.save();
        res.status(201).json(query);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all queries
router.get('/queries', async (req, res) => {
    try {
        const queries = await Query.find();
        res.status(200).json(queries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single query by ID
router.get('/queries/:id', async (req, res) => {
    try {
        const query = await Query.findById(req.params.id);
        if (!query) {
            return res.status(404).json({ error: 'Query not found' });
        }
        res.status(200).json(query);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a query by ID
router.put('/queries/:id', async (req, res) => {
    try {
        const query = await Query.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!query) {
            return res.status(404).json({ error: 'Query not found' });
        }
        res.status(200).json(query);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a query by ID
router.delete('/queries/:id', async (req, res) => {
    try {
        const query = await Query.findByIdAndDelete(req.params.id);
        if (!query) {
            return res.status(404).json({ error: 'Query not found' });
        }
        res.status(200).json({ message: 'Query deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
