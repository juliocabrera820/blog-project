/* eslint-disable no-undef */
const app = require('../src/app');
const User = require('../src/app/models/user');
const createUser = require('./factories/user');
const request = require('supertest');

beforeEach(async () => {
  await User.sync({ force: true });
});

describe('POST /signUp', () => {
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
  test('should return 400 status code and an error message', async () => {
    createUser();
    const { status, body } = await request(app)
      .post('/api/v1/signUp')
      .send({ username: 'ariel', email: 'jules@gmail.com', password: '12345' });
    expect(status).toBe(400);
    expect(body.message).toBe('User already exists');
  });
  test('should return 400 status code and an error object', async () => {
    const { status, body } = await request(app)
      .post('/api/v1/signUp')
      .send({ username: 'jules', email: 'jules@gmail.com', password: '' });
    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });
});

describe('POST /signIn', () => {
  beforeEach(() => {
    createUser();
  });
  test('should return 200 status code and an access token', async () => {
    const { status } = await request(app)
      .post('/api/v1/signIn')
      .send({ email: 'jules@gmail.com', password: '12345' });
    expect(status).toBe(200);
  });
  test('should return 404 status code and an error message', async () => {
    const { status, body } = await request(app)
      .post('/api/v1/signIn')
      .send({ email: 'ariel@gmail.com', password: '12345' });
    expect(status).toBe(404);
    expect(body.message).toBe('Email does not exist');
  });
  test('should return 400 status code and an error message', async () => {
    const { status, body } = await request(app)
      .post('/api/v1/signIn')
      .send({ email: 'jules@gmail.com', password: '123456789' });
    expect(status).toBe(400);
    expect(body.message).toBe('Email or password incorrect');
  });
  test('should return 400 status code and an error object', async () => {
    const { status, body } = await request(app)
      .post('/api/v1/signIn')
      .send({ email: 'jules@gmail.com', password: '' });
    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });
});
