import SignUpBlock, { SignUpBlockProps } from './SignUpBlock';
import withInteractor from './SignUpBlock.interactor';
import withPresenter from './SignUpBlock.presenter';

export type { SignUpBlockProps };

export default withInteractor(withPresenter(SignUpBlock))