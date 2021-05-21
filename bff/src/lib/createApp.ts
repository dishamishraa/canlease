import express, { Application, Router } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import errorResponse from '../middleware/errorResponse';
import { FRONTEND_URL } from './config';

const logger = morgan('combined');
const corsMiddleware = cors({
  origin: [FRONTEND_URL],
  credentials: true,
});
/**
 * Creates express application and mounts middleware and specified router.
 */
export default function createApp(
  router: Router,
): Application {
  const app = express();

  app.use(logger);
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use(corsMiddleware);

  // route configuration
  app.use(router);

  // error handler
  app.use(errorResponse);

  return app;
}
