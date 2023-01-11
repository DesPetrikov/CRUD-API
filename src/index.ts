import http from 'node:http';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;

const usersList = [];

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  switch (req.url) {
    case '/api/users':
      res.writeHead(200);
      res.end(JSON.stringify(usersList));
      break;
    default:
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Resource not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
