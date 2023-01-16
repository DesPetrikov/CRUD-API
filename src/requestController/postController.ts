import { IncomingMessage } from 'node:http';
import { userType } from '../types.js';
import { getRequestBody, isValidUser } from '../utils.js';
import { v4 as uuidv4 } from 'uuid';
import { INCONSISTENT_DATA } from '../constants.js';

export const postController = async (req: IncomingMessage) => {
  const requestBody: userType = JSON.parse(await getRequestBody(req));
  if (isValidUser(requestBody)) {
    const { username, age, hobbies } = requestBody;
    const newUser = { id: uuidv4(), username, age, hobbies };
    return newUser;
  }
  throw new Error(INCONSISTENT_DATA);
};
