import ApplicationPageView, { ApplicationPageProps } from './ApplicationPage';

import withPresenter from './ApplicationPage.presenter';
import withInteractor from './ApplicationPage.interactor';

const ApplicationPage = withInteractor(withPresenter(ApplicationPageView));

export type { ApplicationPageProps };
export default ApplicationPage;
