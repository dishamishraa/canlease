import React, { useContext } from 'react';
import { DialogBlockProps } from './DialogBlock';
import { DialogBlockPresenterProps } from './DialogBlock.presenter';
import { useResendVerifyAccount, useForgotPassword } from '../../../modules/account';

const withInteractor = (
  Presenter: React.FC<DialogBlockPresenterProps>,
): React.FC <DialogBlockProps> => {
  const Interactor: React.FC <DialogBlockProps> = (props) => {
    const [{loading: resendLoading}, resendVerifyAccount] = useResendVerifyAccount();
    const [{loading: forgotPasswordLoading}, forgotPassword] = useForgotPassword();
    return (
      <Presenter
        {...props}
        resendVerifyAccount={resendVerifyAccount}
        forgotPassword={forgotPassword}
      />
    );
  };
  return Interactor;
};
export default withInteractor;