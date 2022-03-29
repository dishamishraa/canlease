import EndUserDashboardPageView, { EndUserDashboardPageProps } from './EndUserDashboardPage';

import withPresenter from './EndUserDashboardPage.presenter';
import withInteractor from './EndUserDashboardPage.interactor';

const EndUserDashboardPage = withInteractor(withPresenter(EndUserDashboardPageView));

export type { EndUserDashboardPageProps };
export default EndUserDashboardPage;
