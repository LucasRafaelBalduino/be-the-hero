const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('NOG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new NOG', async () => {
    const response = await request(app)
      .post('/nogs')
      .send({
        name: 'Foo',
        email: 'john@doe.com',
        whatsapp: '(99) 99999-9999',
        city: 'Bar',
        uf: 'BZ',
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});
