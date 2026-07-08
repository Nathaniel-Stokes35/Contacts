// config/db.js
require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

// Create one shared client for the whole app
const client = new MongoClient(process.env.MONGO_URI);

// Connect once and reuse the same collection handle
let coll;

async function connectDB() {
  if (!coll) {
    await client.connect(); // Node driver will pool/reuse connections internally[web:38][web:44]
    const db = client.db('contactsDB');
    coll = db.collection('contacts');
  }
  return coll;
}

async function getContacts(filter = {}) {
  const collection = await connectDB();
  return collection.find(filter).toArray();
}

async function getContactById(id) {
  const collection = await connectDB();
  return collection.findOne({ _id: new ObjectId(id) });
}

async function addContact(contact) {
  const collection = await connectDB();
  const result = await collection.insertOne(contact);
  return result.insertedId;
}

async function updateContact(id, contact) {
  const collection = await connectDB();
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: contact }
  );
  return result.modifiedCount > 0;
}

async function deleteContact(id) {
  const collection = await connectDB();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}

module.exports = {
  connectDB,
  getContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
};