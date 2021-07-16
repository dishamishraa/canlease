import withInteractor from './ProfileBlock.interactor';
import withPresenter from './ProfileBlock.presenter';
import ProfileBlock, { ProfileBlockProps } from './ProfileBlock';

export type { ProfileBlockProps };
export default withInteractor(withPresenter(ProfileBlock));
