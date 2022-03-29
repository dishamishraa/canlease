import ContentPageView, { ContentPageProps } from './ContentPage';
import withPresenter from './ContentPage.presenter';
import withInteractor from './ContentPage.interactor';

const ContentPage = withInteractor(withPresenter(ContentPageView));

export type { ContentPageProps };
export default ContentPage;
