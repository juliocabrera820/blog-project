/* eslint-disable no-undef */
const app = require('../src/app');
const User = require('../src/app/models/user');
const request = require('supertest');

describe('POST /admin', () => {
  beforeEach(async () => {
    await User.sync({ force: true });
  });

  test('should return 201 status code and registered admin', async () => {
    const { status, body } = await request(app)
      .post('/api/v1/admin')
      .send({ username: 'laijo', email: 'laijo@gmail.com', password: '12345' });
    expect(status).toBe(201);
    expect(body.id).toBe(1);
    expect(body.username).toBe('laijo');
    expect(body.email).toBe('laijo@gmail.com');
    expect(body.role).toBe('admin');
    expect(body).toHaveProperty('password');
  });
  test('should return 400 status code and an error message', async () => {
    await request(app)
      .post('/api/v1/admin')
      .send({ username: 'laijo', email: 'laijo@gmail.com', password: '12345' });
    const { status, body } = await request(app)
      .post('/api/v1/admin')
      .send({ username: 'laijo', email: 'laijo@gmail.com', password: '12345' });
    expect(status).toBe(400);
    expect(body.message).toBe('User already exists');
  });
  test('should return 400 status code and an error object', async () => {
    const { status, body } = await request(app)
      .post('/api/v1/admin')
      .send({ username: 'jules', email: 'jules@gmail.com', password: '' });
    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
    expect(body.error.details[0].message).toBe(
      '"password" is not allowed to be empty'
    );
  });
});

describe('DELETE /admin/users/:username', () => {
  beforeEach(async () => {
    await User.sync({ force: true });
    await request(app)
      .post('/api/v1/admin')
      .send({ username: 'laijo', email: 'laijo@gmail.com', password: '12345' });
    await request(app)
      .post('/api/v1/signUp')
      .send({ username: 'jules', email: 'jules@gmail.com', password: '12345' });
    const { body: token } = await request(app)
      .post('/api/v1/signIn')
      .send({ email: 'jules@gmail.com', password: '12345' });
    await request(app)
      .post('/api/v1/users/comments')
      .send({ title: 'chucky', movieId: '1', content: 'good guy' })
      .set('Authorization', `Bearer ${token}`);
  });

  test('should return 200 status code', async () => {
    const { body: token } = await request(app)
      .post('/api/v1/signIn')
      .send({ email: 'laijo@gmail.com', password: '12345' });
    const { status } = await request(app)
      .delete('/api/v1/admin/users/jules')
      .set('Authorization', `Bearer ${token}`);
    expect(status).toBe(200);
  });
  test('should return 404 status code and an error message', async () => {
    const { body: token } = await request(app)
      .post('/api/v1/signIn')
      .send({ email: 'laijo@gmail.com', password: '12345' });
    const { status, body } = await request(app)
      .delete('/api/v1/admin/users/yuls')
      .set('Authorization', `Bearer ${token}`);
    expect(status).toBe(404);
    expect(body.message).toBe('User does not exist');
  });
  test('should return 401 status code', async () => {
    const { body: token } = await request(app)
      .post('/api/v1/signIn')
      .send({ email: 'laijo@gmail.com', password: '12345' });
    const { body, status } = await request(app)
      .delete('/api/v1/admin/users/jules')
    expect(status).toBe(401);
    expect(body.message).toBe('You are not authenticated');
  });
  test('should return 403 status code and an error message', async () => {
    const { body: token } = await request(app)
      .post('/api/v1/signIn')
      .send({ email: 'jules@gmail.com', password: '12345' });
    const { status, body } = await request(app)
      .delete('/api/v1/admin/users/jules')
      .set('Authorization', `Bearer ${token}`);
    expect(status).toBe(403);
    expect(body.message).toBe('Access denied');
  });
});
