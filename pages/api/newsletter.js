import { insertOneDocument } from '../../helpers/db-utils';
import { failed, success } from '../../helpers/result-utils';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = JSON.parse(req.body);
    console.log('email', email);
    if (!email || !email.includes('@')) {
      failed(res, 422, 'Invalid email address.');
      return;
    }

    try {
      let data = { email: email };
      await insertOneDocument('emails', data);
      success(res, 201, data, 'Success signed up!');
    } catch (error) {
      console.log('error newsletter', error.message);
      failed(res, 422, 'Failed to signed up.', error);
    }
  }
}

export default handler;
