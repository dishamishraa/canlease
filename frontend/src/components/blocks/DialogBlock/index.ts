import DialogBlockView, { DialogBlockProps } from './DialogBlock';
import withInteractor from './DialogBlock.interactor';
import withPresenter from './DialogBlock.presenter';

const DialogBlock = withInteractor(withPresenter(DialogBlockView));

export type { DialogBlockProps };
export default DialogBlock;
