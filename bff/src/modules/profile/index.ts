import { Router } from 'express';
import { createProfileRouter } from './ProfileRouter';
import ProfileController from './ProfileController';
import ProfileService from './ProfileService';
import { ProfileControllerContract, ProfileServiceContract } from './types';

export {
  ProfileControllerContract,
  ProfileServiceContract,
  ProfileController,
  ProfileService,
};

export const ProfileRouter = (controllers: {
  profileController: ProfileControllerContract;
}): Router => createProfileRouter(controllers);
