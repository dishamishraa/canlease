import TopActionBlockView, { TopActionBlockProps } from './TopActionBlock';
import withPresenter from './TopActionBlock.presenter';
import withInteractor from './TopActionBlock.interactor';

const TopActionBlock = withInteractor(withPresenter(TopActionBlockView));

export type { TopActionBlockProps };
export default TopActionBlock;
