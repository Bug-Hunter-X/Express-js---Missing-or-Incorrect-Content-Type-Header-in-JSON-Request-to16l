const express = require('express');
const app = express();
app.use(express.json());
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).send({ error: 'Invalid JSON payload' });
  }
  next();
});
app.post('/users', (req, res) => {
  console.log(req.body);
  if (!req.body.name || !req.body.email) {
    return res.status(400).send({ error: 'Name and email are required' });
  }
  res.send('User created');
});
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});