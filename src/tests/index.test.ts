import request from 'supertest';
import { INVALID_USER_ID, USER_NOT_FOUND } from '../constants.js';
import { server } from '../index.js';
import { errorType, userType } from '../types.js';
import { v4 as uuidv4 } from 'uuid';

describe('Server CRUD tests', () => {
  afterAll((done) => {
    server.close();
    done();
  });
  const runServer = request(server);
  const testUser: userType = {
    username: 'Denis',
    age: 29,
    hobbies: ['bike', 'programming'],
  };
  let testUserId = '';

  test('GET / receive initial server state', async () => {
    const response = await runServer.get('/api/users');
    expect(response.status).toBe(200);
    expect(JSON.parse(response.text)).toEqual([]);
  });
  test('POST / receive the right response with the right status code ', async () => {
    const response = await runServer.post('/api/users').send(testUser);
    const responseBody: userType = JSON.parse(response.text);
    expect(responseBody).toEqual({ ...testUser, id: responseBody.id });
    expect(response.status).toBe(201);
    testUserId = responseBody.id;
  });
  test('GET / receive particular user with the right status code', async () => {
    const response = await runServer.get(`/api/users/${testUserId}`);
    const responseBody: userType = JSON.parse(response.text);
    expect(responseBody).toEqual({ ...testUser, id: testUserId });
    expect(response.status).toBe(200);
  });
  test('PUT / receive corresponding message and right status code if userId is invalid', async () => {
    const response = await runServer.put('/api/users/12345');
    const responseBody: errorType = JSON.parse(response.text);
    expect(response.status).toBe(400);
    expect(responseBody.message).toBe(INVALID_USER_ID);
  });
  test("DELETE / receive corresponding message and right status code if id === userId doesn't exist", async () => {
	const fakeId = uuidv4()
	const response = await runServer.delete(`/api/users/${fakeId}`);
	const responseBody: errorType = JSON.parse(response.text);
	expect(response.status).toBe(404);
	expect(responseBody.message).toBe(USER_NOT_FOUND);
 });
 
});
