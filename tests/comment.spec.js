/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../src/app');
const User = require('../src/app/models/user');
const Comment = require('../src/app/models/comment');

describe('POST /users/comments', () => {
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
      .post('/api/v1/users/comments')
      .send({ title: 'chucky', movieId: '1', content: 'Testing' })
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(201);
    expect(body.userId).toBe(1);
    expect(body.title).toBe('chucky');
    expect(body.content).toBe('Testing');
  });
  test('should return 400 status code and a validation message', async () => {
    const { body: token } = await request(app)
      .post('/api/v1/signIn')
      .send({ email: 'jules@gmail.com', password: '12345' });
    const { status, body } = await request(app)
      .post('/api/v1/users/comments')
      .send({ movieId: '1', content: '' })
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
      .post('/api/v1/users/comments')
      .send({ movieId: '1', content: 'test' })
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
      .post('/api/v1/users/comments')
      .send({ title: '', movieId: '1', content: 'Testing' })
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(400);
    expect(body.message).toBe('There were errors');
    expect(body).toHaveProperty('error');
    expect(body.error.details[0].message).toBe(
      '"title" is not allowed to be empty'
    );
  });
  test('should return 401 status code and an error message', async () => {
    const { status, body } = await request(app)
      .post('/api/v1/users/comments')
      .send({ movieId: '1', content: 'Testing' });
    expect(status).toBe(401);
    expect(body.message).toBe('You are not authenticated');
  });
  test('should return 401 status code and an error message', async () => {
    let { body: token } = await request(app)
      .post('/api/v1/signIn')
      .send({ email: 'jules@gmail.com', password: '12345' });
    const { status, body } = await request(app)
      .get('/api/v1/users/comments')
      .set('Authorization', `Bearer ${token}s`);
    expect(status).toBe(401);
    expect(body.message).toBe('Token can not be decoded');
  });
});

describe('GET /users/comments', () => {
  beforeEach(async () => {
    await User.sync({ force: true });
    await Comment.sync({force: true})
    await request(app)
      .post('/api/v1/signUp')
      .send({ username: 'jules', email: 'jules@gmail.com', password: '12345' });
  });

  test('should return 200 status code and an empty array', async () => {
    const { body: token } = await request(app)
      .post('/api/v1/signIn')
      .send({ email: 'jules@gmail.com', password: '12345' });
    const { status, body } = await request(app)
      .get('/api/v1/users/comments')
      .set('Authorization', `Bearer ${token}`);
    expect(status).toBe(200);
    expect(body).toEqual([])
  });
  test('should return 200 status code and comments', async () => {
    const { body: token } = await request(app)
      .post('/api/v1/signIn')
      .send({ email: 'jules@gmail.com', password: '12345' });
    await request(app)
      .post('/api/v1/users/comments')
      .send({ title: 'chucky', movieId: '1', content: 'good guy' })
      .set('Authorization', `Bearer ${token}`);
    const { status, body } = await request(app)
      .get('/api/v1/users/comments')
      .set('Authorization', `Bearer ${token}`);
    expect(status).toBe(200);
    expect(body.length).toBe(1)
  });
});

describe('GET /users/comments/:commentId', () => {
  beforeEach(async () => {
    await User.sync({ force: true });
    await Comment.sync({force: true})
    await request(app)
      .post('/api/v1/signUp')
      .send({ username: 'jules', email: 'jules@gmail.com', password: '12345' });
  });

  test('should return 200 status code and comments', async () => {
    const { body: token } = await request(app)
      .post('/api/v1/signIn')
      .send({ email: 'jules@gmail.com', password: '12345' });
    await request(app)
      .post('/api/v1/users/comments')
      .send({ title: 'chucky', movieId: '1', content: 'good guy' })
      .set('Authorization', `Bearer ${token}`);
    const{ body, status } = await request(app)
      .get('/api/v1/users/comments/1')
      .set('Authorization', `Bearer ${token}`);
    expect(status).toBe(200);
    expect(body.id).toBe(1);
    expect(body.userId).toBe(1);
    expect(body.movieId).toBe(1);
    expect(body.content).toBe('good guy');
    expect(body.title).toBe('chucky');
  });
});

describe('PUT /users/comments/:commentId', () => {
  beforeEach(async () => {
    await User.sync({ force: true });
    await Comment.sync({force: true})
    await request(app)
      .post('/api/v1/signUp')
      .send({ username: 'jules', email: 'jules@gmail.com', password: '12345' });
  });

  test('should return 200 status code and comments', async () => {
    const { body: token } = await request(app)
      .post('/api/v1/signIn')
      .send({ email: 'jules@gmail.com', password: '12345' });
    await request(app)
      .post('/api/v1/users/comments')
      .send({ title: 'chucky', movieId: '1', content: 'good guy' })
      .set('Authorization', `Bearer ${token}`);
    const{ status } = await request(app)
      .put('/api/v1/users/comments/1')
      .send({ content: 'bad guy' })
      .set('Authorization', `Bearer ${token}`);
    expect(status).toBe(200);
  });
});

describe('DELETE /users/comments/:commentId', () => {
  beforeEach(async () => {
    await User.sync({ force: true });
    await Comment.sync({force: true})
    await request(app)
      .post('/api/v1/signUp')
      .send({ username: 'jules', email: 'jules@gmail.com', password: '12345' });
  });

  test('should return 200 status code and comments', async () => {
    const { body: token } = await request(app)
      .post('/api/v1/signIn')
      .send({ email: 'jules@gmail.com', password: '12345' });
    await request(app)
      .post('/api/v1/users/comments')
      .send({ title: 'chucky', movieId: '1', content: 'good guy' })
      .set('Authorization', `Bearer ${token}`);
    const{ body, status } = await request(app)
      .delete('/api/v1/users/comments/1')
      .set('Authorization', `Bearer ${token}`);
    expect(status).toBe(200);
  });
});

describe('GET /movies/:movieId/comments', () => {
  beforeEach(async () => {
    await User.sync({ force: true });
    await Comment.sync({force: true})
    await request(app)
      .post('/api/v1/signUp')
      .send({ username: 'jules', email: 'jules@gmail.com', password: '12345' });
    await request(app)
      .post('/api/v1/signUp')
      .send({ username: 'yuls', email: 'yuls@gmail.com', password: '12345' });
  });

  test('should return 200 status code and comments', async () => {
    const { body: tokenJules } = await request(app)
      .post('/api/v1/signIn')
      .send({ email: 'jules@gmail.com', password: '12345' });
    await request(app)
      .post('/api/v1/users/comments')
      .send({ title: 'chucky', movieId: '1', content: 'good guy' })
      .set('Authorization', `Bearer ${tokenJules}`);
    const { body: tokenYuls } = await request(app)
      .post('/api/v1/signIn')
      .send({ email: 'yuls@gmail.com', password: '12345' });
    await request(app)
      .post('/api/v1/users/comments')
      .send({ title: 'chucky', movieId: '1', content: 'funny guy' })
      .set('Authorization', `Bearer ${tokenYuls}`);
    const{ body, status } = await request(app)
      .get('/api/v1/movies/1/comments')
    expect(status).toBe(200);
    expect(body.length).toBe(2);
  });
});
