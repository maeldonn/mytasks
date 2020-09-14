const request = require('supertest');
const { expect } = require('chai');

const app = require('../src/app');

describe('GET /', () => {
  it('should respond with a undefined user', async () => {
    const response = await request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.user).to.equal(undefined);
  });
});
