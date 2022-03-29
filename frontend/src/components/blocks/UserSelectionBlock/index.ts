import UserSelectionBlockView, { UserSelectionBlockProps } from './UserSelectionBlock';
import withPresenter from './UserSelectionBlock.presenter';
import withInteractor from './UserSelectionBlock.interactor';

const UserSelectionBlock = withInteractor(withPresenter(UserSelectionBlockView));

export type { UserSelectionBlockProps };
export default UserSelectionBlock;
