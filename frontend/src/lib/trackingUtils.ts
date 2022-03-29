import TagManager, { TagManagerArgs } from 'react-gtm-module';
import { GTM_ID } from './config';

export const initializeTracking = (): void => {
  const tagManagerArgs: TagManagerArgs = {
    gtmId: GTM_ID,
  };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  TagManager.initialize(tagManagerArgs);
};