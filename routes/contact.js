const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// Create a new contact
router.post("/contact", async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        const savedContact = await newContact.save();
        console.log(savedContact);
        res.status(201).json({ message: "Contact saved successfully", contact: savedContact });
    } catch (error) {
        console.log(error);
        if (error.code === 11000 && error.keyPattern && error.keyPattern.id) {
            res.status(409).json({ message: "Contact already exists" });
        } else {
            res.status(500).json({ message: "Unable to create new contact" });
        }
    }
});

// Read all contacts
router.get("/contact", async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json({ message: "Contacts fetched successfully", contacts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unable to fetch contacts" });
    }
});

// Read single contact by ID
router.get('/contact/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const contact = await Contact.findById(id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        console.log(contact);
        res.status(200).json({ message: "Contact fetched successfully", contact });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unable to fetch contact by ID" });
    }
});

// Search contacts
router.get('/search', async (req, res) => {
    try {
        const search = req.query.search;
        const regex = new RegExp(search, 'i');
        const contacts = await Contact.find({ firstName: regex });
        console.log(contacts);
        res.status(200).json({ message: "Contacts searched successfully", contacts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unable to search contacts" });
    }
});

// Update a contact by ID
router.put('/contact/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedContact = req.body;

        const contact = await Contact.findByIdAndUpdate(id, updatedContact, { new: true });
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        console.log(contact);
        res.status(200).json({ message: "Contact updated successfully", contact });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unable to update contact" });
    }
});

// Delete a contact by ID
router.delete('/contact/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const contact = await Contact.findByIdAndDelete(id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        console.log(contact);
        res.status(200).json({ message: "Contact deleted successfully", contact });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unable to delete contact" });
    }
});

// Delete all contacts
router.delete('/contact', async (req, res) => {
    try {
        await Contact.deleteMany();
        res.status(200).json({ message: "All contacts deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unable to delete all contacts" });
    }
});

module.exports = router;
