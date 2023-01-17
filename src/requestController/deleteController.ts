import { validate } from 'uuid';
import { INVALID_USER_ID, USER_NOT_FOUND } from '../constants.js';
import { userType } from '../types.js';

export const deleteController = (userId: string, usersList: userType[]) => {
  if (!validate(userId)) {
    throw new Error(INVALID_USER_ID);
  }
  const userIdx = usersList.findIndex((user) => user.id === userId);
  if (userIdx !== -1) {
    return userIdx;
  }
  throw new Error(USER_NOT_FOUND);
};
