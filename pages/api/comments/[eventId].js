import { insertOneDocument, getDocument } from '../../../helpers/db-utils';
import { failed, success } from '../../../helpers/result-utils';

async function handler(req, res) {
  const eventId = req.query.eventId;

  if (req.method === 'POST') {
    const { email, name, text } = req.body;
    // ssr validation
    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      !text.trim()
    ) {
      failed(res, 'Invalid input.');
      return;
    }

    let newComment = {
      email,
      name,
      text,
      eventId,
    };

    const result = await insertOneDocument(res, 'comments', newComment);
    newComment.id = result.insertedId;
    let data = { comments: newComment };
    success(res, 201, data, 'Added Comment success!');
  }

  if (req.method === 'GET') {
    const result = await getDocument(res, 'comments');
    console.log('getDocument', result);
    let data = { comments: result };
    success(res, 200, data, 'Get data Comment Success!');
  }
}

export default handler;
