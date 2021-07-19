import {
  Router, Request, Response,
} from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { ClientRequest } from 'http';
import { InternalServerError, NotFoundError } from './lib/errors';
import { IDENTITY_URL, DATA_URL, PROXY_TIMEOUT } from './lib/config';

import { QuoteControllerContract, QuoteRouter } from './modules/quote';
import { ApplicationControllerContract, ApplicationRouter } from './modules/application';
import {
  PortfolioControllerContract, PortfolioRouter,
} from './modules/portfolio';
import { ProfileControllerContract, ProfileRouter } from './modules/profile';
import { RateCardControllerContract, RateCardRouter } from './modules/rateCard';

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

export const createRouter = (controllers: {
  quoteController: QuoteControllerContract;
  applicationController: ApplicationControllerContract;
  portfolioController: PortfolioControllerContract;
  profileController: ProfileControllerContract;
  rateCardController: RateCardControllerContract;
}): Router => {
  const swaggerSpec = swaggerJsdoc(swaggerSpecConfig);
  const router = Router();

  router.use('/api-docs', swaggerUi.serve);
  router.get('/api-docs', swaggerUi.setup(swaggerSpec));

  router.get('/', (req: Request, res: Response) => res.json({ running: true }));
  router.post('/token', proxy);
  router.use('/accounts', proxy);

  router.use('/quote', QuoteRouter(controllers));
  router.use('/credit_apps', ApplicationRouter(controllers));
  router.use('/portfolio', PortfolioRouter(controllers));
  router.use('/profile', ProfileRouter(controllers));

  router.use(RateCardRouter(controllers))

  return router;
};
