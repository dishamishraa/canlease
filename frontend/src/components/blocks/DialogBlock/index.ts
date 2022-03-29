import DialogBlock, { DialogBlockProps } from './DialogBlock';
import withInteractor from './DialogBlock.interactor';
import withPresenter from './DialogBlock.presenter';

export type { DialogBlockProps };
export default withInteractor(withPresenter(DialogBlock));
