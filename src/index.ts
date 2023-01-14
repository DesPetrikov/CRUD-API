import http, { IncomingMessage, ServerResponse } from 'node:http';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import { userType } from './types.js';
import {
  ENDPOINT_NOT_EXIST,
  INCONSISTENT_DATA,
  INVALID_USER_ID,
  SERVER_ERROR,
  USER_NOT_FOUND,
} from './constants.js';
import { getUserController } from './requestController/getUserController.js';
import { getRequestBody, isValidUser } from './utils.js';

dotenv.config();
const PORT = process.env.PORT || 4000;

const usersList: userType[] = [];

const server = http.createServer(
  async (req: IncomingMessage, res: ServerResponse) => {
    res.setHeader('Content-Type', 'application/json');

    let statusCode = 200;
    let responseBody: userType | userType[] = [];
    const [, , userId, perspectiveInIT] = req.url.split('/').filter(Boolean);
    try {
      if (req.url.startsWith('/api/users') && !perspectiveInIT) {
        switch (req.method) {
          case 'GET':
            responseBody = userId
              ? getUserController(userId, usersList)
              : usersList;
            break;
          case 'POST':
            // eslint-disable-next-line no-case-declarations
            const requestBody: userType = JSON.parse(await getRequestBody(req));
            if (isValidUser(requestBody)) {
              const { username, age, hobbies } = requestBody;
              const newUser = { id: uuidv4(), username, age, hobbies };
              usersList.push(newUser);
              responseBody = newUser;
            } else {
              throw new Error(INCONSISTENT_DATA);
            }
            break;
            case 'PUT': 
            
            break;
          default:
            break;
        }
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ code: 404, message: ENDPOINT_NOT_EXIST }));
      }
      res.writeHead(statusCode);
      res.end(JSON.stringify(responseBody));
    } catch (error) {
      if (error.message === INVALID_USER_ID || error.message === INCONSISTENT_DATA) {
        statusCode = 400;
      } else if (error.message === USER_NOT_FOUND) {
        statusCode = 404;
      } else {
        statusCode = 500;
      }
      res.writeHead(statusCode);
      res.end(JSON.stringify({ code: statusCode, message: error.message }));
    }
  }
);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
