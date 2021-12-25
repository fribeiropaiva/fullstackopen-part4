const bcrypt = require('bcrypt');
const supertest = require('supertest');
const User = require('../models/user');
const app = require('../app');

const api = supertest(app);

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('password', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const newUser = {
      username: 'Filipepaiva',
      name: 'Filipe Paiva',
      password: '1234',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200);
  });
});
