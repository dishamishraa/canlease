import { Router } from 'express';
import { createAuthRouter } from './AuthRouter';

export const AuthRouter = (): Router => createAuthRouter();
