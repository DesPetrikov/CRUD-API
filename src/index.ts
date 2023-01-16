import http, { IncomingMessage, ServerResponse } from 'node:http';
import dotenv from 'dotenv';
import { errorType, userType } from './types.js';
import {
  ENDPOINT_NOT_EXIST,
  SERVER_ERROR,
  UNSUPPORTED_METHOD,
} from './constants.js';
import { getUserController } from './requestController/getUserController.js';
import { errorHandler } from './utils.js';
import { postController } from './requestController/postController.js';
import { putController } from './requestController/putController.js';
import { deleteController } from './requestController/deleteController.js';

dotenv.config();
const PORT = process.env.PORT || 4000;

const usersList: userType[] = [];

export const server = http.createServer(
  async (req: IncomingMessage, res: ServerResponse) => {
    res.setHeader('Content-Type', 'application/json');

    let statusCode = 200;
    let responseBody: userType | userType[] | errorType = [];
    const [, , userId, perspectiveInIT] = req.url.split('/').filter(Boolean);
    try {
      if (req.url.startsWith('/api/users') && !perspectiveInIT) {
        if (req.method === 'GET') {
          responseBody = userId
            ? getUserController(userId, usersList)
            : usersList;
        } else if (req.method === 'POST') {
          const newUser = await postController(req);
          usersList.push(newUser);
          statusCode = 201;
          responseBody = newUser;
        } else if (req.method === 'PUT') {
          const { userIdx, updatedUser } = await putController(
            req,
            userId,
            usersList
          );
          usersList.splice(userIdx, 1, updatedUser);
          responseBody = updatedUser;
        } else if (req.method === 'DELETE') {
          const userIdx = deleteController(userId, usersList);
          usersList.splice(userIdx, 1);
          statusCode = 204;
        } else {
          throw new Error(UNSUPPORTED_METHOD);
        }
        res.writeHead(statusCode);
        res.end(JSON.stringify(responseBody));
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ code: 404, message: ENDPOINT_NOT_EXIST }));
      }
    } catch (error) {
      statusCode = errorHandler(error.message);
      res.writeHead(statusCode);
      res.end(
        JSON.stringify({
          code: statusCode,
          message: statusCode !== 500 ? error.message : SERVER_ERROR,
        })
      );
    }
  }
);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
