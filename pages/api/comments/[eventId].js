function handler(req, res) {
  const eventId = req.query.eventId;
  console.log('eventId', eventId);

  if (req.method === 'POST') {
    // ssr validation

    const { email, name, text } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      !text.trim()
    ) {
      res.status(422).json({ message: 'Invalid input.', success: false });
      return;
    }

    let newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    };

    console.log('newComment', newComment);

    res.status(201).json({
      data: { comments: [newComment] },
      message: 'Added Comment success!',
      success: true,
    });
  }

  if (req.method === 'GET') {
    const dummyList = [
      { id: 'c1', name: 'Max', text: 'A First Comment!' },
      { id: 'c2', name: 'Jibon', text: 'A Second Comment!' },
    ];

    res.status(200).json({ data: { comments: dummyList }, success: true });
  }
}

export default handler;
