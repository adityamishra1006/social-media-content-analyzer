// Importing required modules
const express = require('express');

// Create a new router instance
const router = express.Router();

// Sample in-memory data (replace with a database in production)
let items = [
    { id: 1, name: 'Item 1', description: 'This is item 1' },
    { id: 2, name: 'Item 2', description: 'This is item 2' },
    { id: 3, name: 'Item 3', description: 'This is item 3' },
];

// Get all items
router.get('/items', (req, res) => {
    res.json({ items });
});

// Get a single item by ID
router.get('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find((i) => i.id === id);

    if (item) {
        res.json({ item });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// Create a new item
router.post('/items', (req, res) => {
    const { name, description } = req.body;
    const newItem = {
        id: items.length + 1,
        name,
        description,
    };

    items.push(newItem);
    res.status(201).json({ message: 'Item created successfully', item: newItem });
});

// Update an item by ID
router.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description } = req.body;
    const itemIndex = items.findIndex((i) => i.id === id);

    if (itemIndex !== -1) {
        items[itemIndex] = { id, name, description };
        res.json({ message: 'Item updated successfully', item: items[itemIndex] });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// Delete an item by ID
router.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const itemIndex = items.findIndex((i) => i.id === id);

    if (itemIndex !== -1) {
        const deletedItem = items.splice(itemIndex, 1);
        res.json({ message: 'Item deleted successfully', item: deletedItem });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

module.exports = router;
