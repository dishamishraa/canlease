import {
  Router, Request, Response,
} from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { UserRouter } from './modules/user';
import { AuthRouter } from './modules/auth';

const swaggerSpecConfig = {
  swaggerDefinition: {
    info: {
      title: 'Vericent LMS',
      version: '0.0.1',
      description: 'Vericent LMS is a lesson management system.',
    },
  },
  apis: [
    `${__dirname}/modules/**/*Router.{ts,js}`,
    `${__dirname}/api-docs/**/*.yaml`,
  ],
};

export const createRouter = (controllers: {}): Router => {
  const swaggerSpec = swaggerJsdoc(swaggerSpecConfig);
  const router = Router();

  router.use('/api-docs', swaggerUi.serve);
  router.get('/api-docs', swaggerUi.setup(swaggerSpec));

  router.get('/', (req: Request, res: Response) => res.json({ running: true }));
  router.use('/auth', AuthRouter());
  router.use('/users', UserRouter());

  return router;
};
