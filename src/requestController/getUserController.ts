import { userType } from '../types.js';
import { validate } from 'uuid';
import { INVALID_USER_ID, USER_NOT_FOUND } from '../constants.js';

export const getUserController = (userId: string, usersList: userType[]) => {
  if (!validate(userId)) {
    throw new Error(INVALID_USER_ID);
  }
  const requiredUser = usersList.find((user) => user.id === userId);
  
  if (requiredUser) {
    return requiredUser;
  } else {
    throw new Error(USER_NOT_FOUND);
  }
};
