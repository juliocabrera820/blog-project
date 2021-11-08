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
    expect(body).toHaveProperty('password');
  });
  test('should return 400 status code and an error message', async () => {
    await request(app)
      .post('/api/v1/signUp')
      .send({ username: 'jules', email: 'jules@gmail.com', password: '12345' });
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
    expect(body.error.details[0].message).toBe(
      '"password" is not allowed to be empty'
    );
  });
});

describe('POST /signIn', () => {
  beforeEach(async () => {
    await User.sync({ force: true });
    await request(app)
      .post('/api/v1/signUp')
      .send({ username: 'jules', email: 'jules@gmail.com', password: '12345' });
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
    expect(body.error.details[0].message).toBe(
      '"password" is not allowed to be empty'
    );
  });
});
