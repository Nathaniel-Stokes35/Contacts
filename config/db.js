require('dotenv').config();
import { MongoClient } from 'mongodb';

const client = await MongoClient.connect(process.env.MONGO_URI);
const coll = client.db('contactsDB').collection('contacts');

export function getContacts(filter) {
    return coll.find(filter).toArray();
}

const result = await coll.toArray();

module.exports = {result, getContacts};