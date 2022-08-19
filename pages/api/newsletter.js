function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    console.log(email);
    res.status(201).json({ data: { email }, message: 'Sucess signed up!' });
  }
}

export default handler;
