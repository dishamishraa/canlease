import React, { useContext } from 'react';
import { DialogBlockProps } from './DialogBlock';
import { DialogBlockPresenterProps } from './DialogBlock.presenter';
import { useResendVerifyAccount } from '../../../modules/account'

const withInteractor = (
  Presenter: React.FC<DialogBlockPresenterProps>,
): React.FC <DialogBlockProps> => {
  const Interactor: React.FC <DialogBlockProps> = (props) => {
    const [{}, resendVerifyAccount] = useResendVerifyAccount();
    return (
      <Presenter
        {...props}
        resendVerifyAccount={resendVerifyAccount}
      />
    );
  }
  return Interactor;
};
export default withInteractor;
