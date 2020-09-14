const request = require('supertest');
const { expect } = require('chai');

const users = require('../src/auth/auth.model');
const app = require('../src/app');

describe('POST /auth/register', () => {
  before(async () => {
    await users.remove({});
  });

  it('should require an email', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({})
      .expect('Content-Type', /json/)
      .expect(422);
    expect(response.body.message).to.equal('"email" is required');
  });

  it('should not allow an empty email', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        email: '',
      })
      .expect('Content-Type', /json/)
      .expect(422);
    expect(response.body.message).to.equal('"email" is not allowed to be empty');
  });

  it('should not allow non-valid email', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        email: 'iamnotanemail',
      })
      .expect('Content-Type', /json/)
      .expect(422);
    expect(response.body.message).to.equal('"email" must be a valid email');
  });

  it('should require a password', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        email: 'user@email.com',
      })
      .expect('Content-Type', /json/)
      .expect(422);
    expect(response.body.message).to.equal('"password" is required');
  });

  it('should not allow an empty password', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        email: 'user@email.com',
        password: '',
      })
      .expect('Content-Type', /json/)
      .expect(422);
    expect(response.body.message).to.equal('"password" is not allowed to be empty');
  });

  it('should not allow password smaller than 8 characters', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        email: 'user@email.com',
        password: '1234567',
      })
      .expect('Content-Type', /json/)
      .expect(422);
    expect(response.body.message).to.equal('"password" length must be at least 8 characters long');
  });

  it('should create a new user and respond a JWT', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        email: 'user@email.com',
        password: 'password',
      })
      .expect(201);
    expect(response.body).to.have.property('token');
  });

  it('should not allow to register with an already used email', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        email: 'user@email.com',
        password: 'password',
      })
      .expect('Content-Type', /json/)
      .expect(409);
    expect(response.body.message).to.equal('Email address is already in use');
  });
});

describe('POST /auth/login', () => {
  it('should require an email', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({})
      .expect('Content-Type', /json/)
      .expect(422);
    expect(response.body.message).to.equal('Unable to login');
  });

  it('should not allow an empty email', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: '',
      })
      .expect('Content-Type', /json/)
      .expect(422);
    expect(response.body.message).to.equal('Unable to login');
  });

  it('should not allow non-valid email', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'iamnotanemail',
      })
      .expect('Content-Type', /json/)
      .expect(422);
    expect(response.body.message).to.equal('Unable to login');
  });

  it('should require a password', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'user@email.com',
      })
      .expect('Content-Type', /json/)
      .expect(422);
    expect(response.body.message).to.equal('Unable to login');
  });

  it('should not allow an empty password', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'user@email.com',
        password: '',
      })
      .expect('Content-Type', /json/)
      .expect(422);
    expect(response.body.message).to.equal('Unable to login');
  });

  it('should not allow password smaller than 8 characters', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'user@email.com',
        password: '1234567',
      })
      .expect('Content-Type', /json/)
      .expect(422);
    expect(response.body.message).to.equal('Unable to login');
  });

  it('should login and respond a JWT', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'user@email.com',
        password: 'password',
      })
      .expect(200);
    expect(response.body).to.have.property('token');
  });
});
