/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../src/app');
const User = require('../src/app/models/user');

describe('POST /users/:userId/comments', () => {
  beforeEach(async () => {
    await User.sync({ force: true });
    await request(app)
      .post('/api/v1/signUp')
      .send({ username: 'jules', email: 'jules@gmail.com', password: '12345' });
  });

  test('should return 200 status code and comment data', async () => {
    const { body: token } = await request(app)
      .post('/api/v1/signIn')
      .send({ email: 'jules@gmail.com', password: '12345' });
    const { status, body } = await request(app)
      .post('/api/v1/users/1/comments')
      .send({ userId: '1', movieId: '1', content: 'Testing' })
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(201);
    expect(body.userId).toBe(1);
    expect(body.movieId).toBe(1);
    expect(body.content).toBe('Testing');
  });
  test('should return 400 status code and a validation message', async () => {
    const { body: token } = await request(app)
      .post('/api/v1/signIn')
      .send({ email: 'jules@gmail.com', password: '12345' });
    const { status, body } = await request(app)
      .post('/api/v1/users/1/comments')
      .send({ userId: '1', movieId: '1', content: '' })
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(400);
    expect(body.message).toBe('There were errors');
    expect(body).toHaveProperty('error');
    expect(body.error.details[0].message).toBe(
      '"content" is not allowed to be empty'
    );
  });
  test('should return 400 status code and a validation message', async () => {
    const { body: token } = await request(app)
      .post('/api/v1/signIn')
      .send({ email: 'jules@gmail.com', password: '12345' });
    const { status, body } = await request(app)
      .post('/api/v1/users/1/comments')
      .send({ userId: '1', movieId: '1', content: 'test' })
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(400);
    expect(body.message).toBe('There were errors');
    expect(body).toHaveProperty('error');
    expect(body.error.details[0].message).toBe(
      '"content" length must be at least 5 characters long'
    );
  });
  test('should return 400 status code and a validation message', async () => {
    const { body: token } = await request(app)
      .post('/api/v1/signIn')
      .send({ email: 'jules@gmail.com', password: '12345' });
    const { status, body } = await request(app)
      .post('/api/v1/users/1/comments')
      .send({ userId: '', movieId: '1', content: 'Testing' })
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(400);
    expect(body.message).toBe('There were errors');
    expect(body).toHaveProperty('error');
    expect(body.error.details[0].message).toBe(
      '"userId" is not allowed to be empty'
    );
  });
  test('should return 401 status code and an error message', async () => {
    const { status, body } = await request(app)
      .post('/api/v1/users/1/comments')
      .send({ userId: '', movieId: '1', content: 'Testing' });
    expect(status).toBe(401);
    expect(body.message).toBe('You are not authenticated');
  });
  test('should return 401 status code and an error message', async () => {
    let { body: token } = await request(app)
      .post('/api/v1/signIn')
      .send({ email: 'jules@gmail.com', password: '12345' });
    const { status, body } = await request(app)
      .get('/api/v1/users/1/comments')
      .set('Authorization', `Bearer ${token}s`);
    expect(status).toBe(401);
    expect(body.message).toBe('Token can not be decoded');
  });
});
