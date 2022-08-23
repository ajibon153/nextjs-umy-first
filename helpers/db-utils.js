import { MongoClient } from 'mongodb';

const url =
  'mongodb+srv://next_udemy:jibonanshieru9@udemy-course.8d1jc.mongodb.net/events?retryWrites=true&w=majority';

export async function connectDB() {
  const client = await MongoClient.connect(url);
  return { client, db: client.db() };
}

export async function insertOneDocument(collection, data) {
  const connection = await connectDB();
  const result = await connection.db.collection(collection).insertOne(data);
  connection.client.close();
  // console.log('result',result);
  return result;
}

export async function getDocument(collection) {
  const connection = await connectDB();
  const result = await connection.db
    .collection(collection)
    .find()
    .sort({ _id: -1 })
    .toArray();
  connection.client.close();
  return result;
}
