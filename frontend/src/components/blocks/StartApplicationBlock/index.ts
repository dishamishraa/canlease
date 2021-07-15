import StartApplicationBlock, { StartApplicationBlockProps } from './StartApplicationBlock';
import withInteractor from './StartApplicationBlock.interactor';
import withPresenter from './StartApplicationBlock.presenter';

export type { StartApplicationBlockProps };
export default withInteractor(withPresenter(StartApplicationBlock));
