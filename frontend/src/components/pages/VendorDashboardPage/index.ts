import VendorDashboardPageView, { VendorDashboardPageProps } from './VendorDashboardPage';
import withPresenter from './VendorDashboardPage.presenter';
import withInteractor from './VendorDashboardPage.interactor';

const VendorDashboardPage = withInteractor(withPresenter(VendorDashboardPageView));

export type { VendorDashboardPageProps };
export default VendorDashboardPage;
