import React, { useContext } from 'react';
import { CreatePasswordBlockProps } from './CreatePasswordBlock';
import { CreatePasswordBlockPresenterProps } from './CreatePasswordBlock.presenter';
import { useUpdatePassword } from '../../../modules/account'

const withInteractor = (
  Presenter: React.FC<CreatePasswordBlockPresenterProps>,
): React.FC <CreatePasswordBlockProps> => {
  const Interactor: React.FC <CreatePasswordBlockProps> = (props) => {
    const [{loading}, updatePassword] = useUpdatePassword();
    return (
      <Presenter
        {...props}
        updatePassword={updatePassword}
        // loading={loading}
      />
    );
  };
  return Interactor;
};
export default withInteractor;
