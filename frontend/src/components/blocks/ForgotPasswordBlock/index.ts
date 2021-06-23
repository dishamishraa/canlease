import ForgotPasswordBlockView, { ForgotPasswordBlockProps } from './ForgotPasswordBlock';
import withInteractor from './ForgotPasswordBlock.interactor';
import withPresenter from './ForgotPasswordBlock.presenter';

export type { ForgotPasswordBlockProps };

const ForgotPasswordBlock = withInteractor(withPresenter(ForgotPasswordBlockView));

export default ForgotPasswordBlock;
