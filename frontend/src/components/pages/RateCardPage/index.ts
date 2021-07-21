import RateCardPageView, { RateCardPageProps } from './RateCardPage';
import withPresenter from './RateCardPage.presenter';
import withInteractor from './RateCardPage.interactor';

const RateCardPage = withInteractor(withPresenter(RateCardPageView));

export type { RateCardPageProps };
export default RateCardPage;