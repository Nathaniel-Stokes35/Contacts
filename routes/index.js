// routes/index.js
const path = require('path');
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Serve frontend
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/index.html'));
});

// GET all contacts (supports optional search by firstName/lastName)
router.get('/api/contacts', async (req, res) => {
    try {
        const searchQuery = req.query.search;
        let filter = {};

        if (searchQuery) {
        // Search in firstName and lastName (case-insensitive)
        filter = {
            $or: [
            { firstName: { $regex: searchQuery, $options: 'i' } },
            { lastName: { $regex: searchQuery, $options: 'i' } },
            ],
        };
        }

        const contacts = await db.getContacts(filter);
        res.json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET contact by ID
router.get('/api/contacts/:id', async (req, res) => {
    try {
        const contact = await db.getContactById(req.params.id);
        if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
        }
        res.json(contact);
    } catch (error) {
        console.error('Error fetching contact by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST create new contact
router.post('/api/contacts', async (req, res) => {
    try {
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;

        if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
            return res.status(400).json({ error: 'Data Entry Error: Missing required fields' });
        }

        const newContact = { firstName, lastName, email, favoriteColor, birthday };
        const insertedId = await db.addContact(newContact);
        res.status(201).json({ _id: insertedId, ...newContact });
    } catch (error) {
        console.error('Error creating contact:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PUT update contact by ID
router.put('/api/contacts/:id', async (req, res) => {
    try {
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;

        const updatedContact = { firstName, lastName, email, favoriteColor, birthday };
        
        const success = await db.updateContact(req.params.id, updatedContact);
        if (!success) {
        return res.status(404).json({ error: 'Contact not found' });
        }
        res.json({ message: 'Contact updated' });
    } catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE contact by ID
router.delete('/api/contacts/:id', async (req, res) => {
    try {
        const success = await db.deleteContact(req.params.id);
        if (!success) {
        return res.status(404).json({ error: 'Contact not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;