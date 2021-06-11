import SimplePageView, { SimplePageProps } from './SimplePage';
import withPresenter from './SimplePage.presenter';
import withInteractor from './SimplePage.interactor';

const SimplePage = withInteractor(withPresenter(SimplePageView));

export type { SimplePageProps };
export default SimplePage;
