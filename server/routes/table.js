const express = require('express');
const router = express.Router();
const Table = require('../models/table'); 

// Create a new table
router.post('/tables', async (req, res) => {
    try {
        const table = new Table(req.body);
        await table.save();
        res.status(201).json(table);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all tables
router.get('/tables', async (req, res) => {
    try {
        const tables = await Table.find();
        res.status(200).json(tables);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single table by ID
router.get('/tables/:id', async (req, res) => {
    try {
        const table = await Table.findById(req.params.id);
        if (!table) {
            return res.status(404).json({ error: 'Table not found' });
        }
        res.status(200).json(table);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a table by ID
router.put('/tables/:id', async (req, res) => {
    try {
        const table = await Table.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!table) {
            return res.status(404).json({ error: 'Table not found' });
        }
        res.status(200).json(table);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a table by ID
router.delete('/tables/:id', async (req, res) => {
    try {
        const table = await Table.findByIdAndDelete(req.params.id);
        if (!table) {
            return res.status(404).json({ error: 'Table not found' });
        }
        res.status(200).json({ message: 'Table deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
