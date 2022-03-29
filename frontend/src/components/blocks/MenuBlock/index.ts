import MenuBlock, { MenuBlockProps } from './MenuBlock';
import withInteractor from './MenuBlock.interactor';
import withPresenter from './MenuBlock.presenter';

export type { MenuBlockProps };
export default withInteractor(withPresenter(MenuBlock));
