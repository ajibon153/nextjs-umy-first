import { MongoClient } from 'mongodb';
import { failed } from './result-utils';

const url =
  'mongodb+srv://next_udem:jibonanshieru9@udemy-course.8d1jc.mongodb.net/events?retryWrites=true&w=majority';

export async function connectDB(res) {
  try {
    const client = await MongoClient.connect(url);
    return { client, db: client.db() };
  } catch (error) {
    failed(res, 500, 'Connecting to database failed.', error);
  }
}

export async function insertOneDocument(res, collection, data) {
  try {
    const connection = await connectDB(res);
    const data = await connection.db.collection(collection).insertOne(data);
    connection.client.close();
    return data;
  } catch (error) {
    failed(res, 500, `Failed to insert data ${collection}.`, error);
  }
}

export async function getDocument(res, collection) {
  try {
    const connection = await connectDB();
    const data = await connection.db
      .collection(collection)
      .find()
      .sort({ _id: -1 })
      .toArray();
    connection.client.close();
    return data;
  } catch (error) {
    failed(res, 500, `Failed to get data ${collection}.`, error);
  }
}
