import RateCardDetailsPage, { RateCardDetailsPageProps } from './RateCardDetailsPage';
import withInteractor from './RateCardDetailsPage.interactor'
import withPresenter from './RateCardDetailsPage.presenter';

export type { RateCardDetailsPageProps };
export default withInteractor(withPresenter(RateCardDetailsPage));
