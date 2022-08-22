import { MongoClient } from 'mongodb';

const url =
  'mongodb+srv://next_udemy:jibonanshieru9@udemy-course.8d1jc.mongodb.net/newsletter?retryWrites=true&w=majority';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    await MongoClient.connect(url).then((client) => {
      console.log('client', client);
      const db = client.db();

      // insertOne to insert one data
      return db
        .collection('emails')
        .insertOne({ email: userEmail })
        .then((res) => console.log(res));
    });

    console.log(email);

    res.status(201).json({ data: { email }, message: 'Sucess signed up!' });
  }
}

export default handler;
