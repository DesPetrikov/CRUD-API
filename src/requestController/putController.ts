import { IncomingMessage } from 'http';
import { validate } from 'uuid';
import {
  INCONSISTENT_DATA,
  INVALID_USER_ID,
  USER_NOT_FOUND,
} from '../constants.js';
import { userType } from '../types.js';
import { getRequestBody, isValidUser } from '../utils.js';

export const putController = async (
  req: IncomingMessage,
  userId: string,
  usersList: userType[]
) => {
  if (!validate(userId)) {
    throw new Error(INVALID_USER_ID);
  }
  const userIdx = usersList.findIndex((user) => user.id === userId);
  if (userIdx !== -1) {
    const requestBody: userType = JSON.parse(await getRequestBody(req));
    if (!isValidUser(requestBody)) {
      throw new Error(INCONSISTENT_DATA);
    }
    const { username, age, hobbies } = requestBody;
    const updatedUser = { id: userId, username, age, hobbies };
    return { userIdx, updatedUser };
  }
  throw new Error(USER_NOT_FOUND);
};
