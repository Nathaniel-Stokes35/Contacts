// seed.js
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;

async function seed() {
    const client = new MongoClient(uri);
    try {
        await client.connect();

        const db = client.db('contactsDB');
        const contactsColl = db.collection('contacts');

        const filePath = path.join(__dirname, 'base-contacts.json');
        const fileContents = fs.readFileSync(filePath, 'utf-8');
        const docs = JSON.parse(fileContents);

        await contactsColl.deleteMany({});

        const result = await contactsColl.insertMany(docs);
        console.log(`${result.insertedCount} contacts inserted`);
    } catch (err) {
        console.error('Error seeding contacts:', err);
    } finally {
        await client.close();
    }
}

seed();