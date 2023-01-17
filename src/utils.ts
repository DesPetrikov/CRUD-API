import { IncomingMessage } from 'http';
import { INCONSISTENT_DATA, INVALID_USER_ID, SERVER_ERROR, UNSUPPORTED_METHOD, USER_NOT_FOUND } from './constants.js';
import { userType } from './types.js';

export const isValidUser = (user: userType): boolean => {
  const isUserNameValid = typeof user?.username === 'string';
  const isAgeValid = typeof user?.age === 'number' && user.age >= 0;
  const isHobbiesValid = Array.isArray(user?.hobbies) && user.hobbies.every((hobby) => typeof hobby === 'string');
  return isUserNameValid && isAgeValid && isHobbiesValid;
};

export const getRequestBody = (req: IncomingMessage): Promise<string> => {
  return new Promise((resolve, reject) => {
    let requestBody = '';
    req.on('data', (chunk) => (requestBody += chunk.toString()));
    req.on('end', () => resolve(requestBody));
    req.on('error', () => reject(new Error(SERVER_ERROR)));
  });
};

export const errorHandler = (errorMessage: string) => {
  if (errorMessage === INVALID_USER_ID || errorMessage === INCONSISTENT_DATA || errorMessage === UNSUPPORTED_METHOD) {
    return 400;
  } else if (errorMessage === USER_NOT_FOUND) {
    return 404;
  }
  return 500;
};
