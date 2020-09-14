const request = require('supertest');
const { expect } = require('chai');

const app = require('../src/app');

describe('GET /api/v1/users', () => {
  before(() => {
    // GEt token for admin user and a basic user
  });

  it('should not allow non logged user to access user list', async () => {
    const response = await request(app)
      .get('/api/v1/users')
      .expect('Content-Type', /json/)
      .expect(401);
    expect(response.body.message).to.equal('Unauthorized');
  });

  it('should not allow non admin user to access user list', async () => {
    const response = await request(app)
      .get('/api/v1/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${'aaaa'}`) // TODO: Set the user token
      .expect('Content-Type', /json/)
      .expect(401);
    expect(response.body.message).to.equal('Unauthorized');
  });

  it('should respond a user list', async () => {
    const response = await request(app)
      .get('/api/v1/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${'aaaa'}`) // TODO: Set the admin token
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).to.have.property('user');
  });
});

describe('PATCH /api/v1/users/:id', () => {});
