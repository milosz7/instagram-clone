import express from 'express';

const port = process.env.PORT || 3001;
const server = express();

server.get('/', (req, res) => {
  res.send('hello world!');
  res.status(201);
})

server.listen(port)