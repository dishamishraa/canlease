import React, { useContext } from 'react';
import { ForgotPasswordBlockPresenterProps } from './ForgotPasswordBlock.presenter';
import { ForgotPasswordBlockProps } from './ForgotPasswordBlock';
import { useForgotPassword } from '../../../modules/account';

const withInteractor = (
  Presenter: React.FC<ForgotPasswordBlockPresenterProps>,
): React.FC<ForgotPasswordBlockProps> => {
  const Interactor: React.FC<ForgotPasswordBlockProps> = (props) => {
    const [{ loading }, forgotPassword] = useForgotPassword();
    return <Presenter
              {...props}
              forgotPassword={forgotPassword}
          />;
  };
  return Interactor;
};

export default withInteractor;
