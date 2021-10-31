const User = require('../../src/app/models/user');

const createUser = async () =>
  await User.create({
    username: 'jules',
    email: 'jules@gmail.com',
    password: '12345',
  });

module.exports = createUser;
