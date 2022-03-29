import AuthPageView, { AuthPageProps } from './AuthPage';
import withInteractor from './AuthPage.interactor';
import withPresenter from './AuthPage.presenter';

const AuthPage = withInteractor(withPresenter(AuthPageView));

export type { AuthPageProps };
export default AuthPage;
