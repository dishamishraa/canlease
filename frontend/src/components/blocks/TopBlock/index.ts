import TopBlockView, { TopBlockProps } from './TopBlock';
import withPresenter from './TopBlock.presenter';
import withInteractor from './TopBlock.interactor';

const TopBlock = withInteractor(withPresenter(TopBlockView));

export type { TopBlockProps };
export default TopBlock;
