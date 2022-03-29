import express, { Application } from 'express';
import request from 'supertest';
import createError from 'http-errors';
import errorResponse from './errorResponse';

jest.mock('../lib/config', () => ({ IS_DEV: false }));

describe('errorResponse', () => {
  let app: Application;

  beforeEach(() => {
    app = express();
  });

  it('should respond in appropriate format for http errors', async () => {
    const errorMessage = 'There was a conflict';
    const error = new createError.Conflict(errorMessage);

    app.get('/', (req, res, next) => next(error));
    app.use(errorResponse);
    const { status, body } = await request(app).get('/');

    // expect(status).toEqual(409);
    // expect(body).toEqual({
    //   code: 409,
    //   type: 'ConflictError',
    //   message: errorMessage,
    // });
  });

  it('should respond with 500 status code if generic error caught', async () => {
    app.get('/', (req, res, next) => next(new Error('There was a problem')));
    app.use(errorResponse);

    const { status, body } = await request(app).get('/');

    // expect(status).toEqual(500);
    // expect(body).toEqual({
    //   code: 500,
    //   type: 'InternalServerError',
    //   message: 'Something went wrong',
    // });
  });
});
