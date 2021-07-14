import UserProfile, { UserProfileProps } from './UserProfile';
import withInteractor from './UserProfile.interactor';
import withPresenter from './UserProfile.presenter';

export type { UserProfileProps };
export default withInteractor(withPresenter(UserProfile));
