import React, { useContext } from 'react';
import { UserSelectionBlockProps } from './UserSelectionBlock';
import { UserSelectionBlockPresenterProps } from './UserSelectionBlock.presenter';

const withInteractor = (
  Presenter: React.FC<UserSelectionBlockPresenterProps>,
): React.FC <UserSelectionBlockProps> => {
  const Interactor: React.FC <UserSelectionBlockProps> = (props) => <Presenter
    {...props}
    />;
  return Interactor;
};
export default withInteractor;
