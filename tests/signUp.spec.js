/* eslint-disable no-undef */
const app = require('../src/app');
const User = require('../src/app/models/user');
const request = require('supertest');

describe('POST /signUp', () => {
  beforeEach(async () => {
    await User.sync({ force: true });
  });
  test('should return 201 status code and registered user', async () => {
    const { status, body } = await request(app)
      .post('/api/v1/signUp')
      .send({ username: 'jules', email: 'jules@gmail.com', password: '12345' });
    expect(status).toBe(201);
    expect(body.id).toBe(1);
    expect(body.username).toBe('jules');
    expect(body.email).toBe('jules@gmail.com');
    expect(body.password).toBe('12345');
  });
});
