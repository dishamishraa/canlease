import {
  Router, Request, Response,
} from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { ClientRequest } from 'http';
import { UserRouter } from './modules/user';
import { InternalServerError, NotFoundError } from './lib/errors';
import { IDENTITY_URL, PROXY_TIMEOUT } from './lib/config';

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

const restream = (proxyReq: ClientRequest, req: Request): void => {
  if (req.body) {
    const bodyData = JSON.stringify(req.body);
    // incase if content-type is application/x-www-form-urlencoded
    // we need to change to application/json
    proxyReq.setHeader('Content-Type', 'application/json');
    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
    // stream the content
    proxyReq.write(bodyData);
  }
};

const proxy = createProxyMiddleware({
  target: IDENTITY_URL,
  changeOrigin: true,
  onError: (err: NodeJS.ErrnoException, req: Request, res: Response): void => {
    if (err.code === 'ENOTFOUND') {
      res.status(404).send(NotFoundError());
    } else {
      res.status(500).send(InternalServerError());
    }
  },
  proxyTimeout: Number(PROXY_TIMEOUT),
  onProxyReq: restream,
});

export const createRouter = (controllers: {}): Router => {
  const swaggerSpec = swaggerJsdoc(swaggerSpecConfig);
  const router = Router();

  router.use('/api-docs', swaggerUi.serve);
  router.get('/api-docs', swaggerUi.setup(swaggerSpec));

  router.get('/', (req: Request, res: Response) => res.json({ running: true }));
  router.post('/token', proxy);
  router.post('/accounts', proxy);
  router.use('/users', UserRouter());

  return router;
};
