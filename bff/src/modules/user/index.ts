import { Router } from 'express';
import { createUserRouter } from './UserRouter';

export const UserRouter = (): Router => createUserRouter();
