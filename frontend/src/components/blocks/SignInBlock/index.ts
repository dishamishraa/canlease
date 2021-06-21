import SignInBlock, { SignInBlockProps } from './SignInBlock';
import withInteractor from './SignInBlock.interactor';
import withPresenter from './SignInBlock.presenter';

export type { SignInBlockProps }

export default withInteractor(withPresenter(SignInBlock));