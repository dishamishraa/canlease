import React from 'react';
import { SignInBlockPresenterProps } from './SignInBlock.presenter';
import { SignInBlockProps } from './SignInBlock';
import { useVerifyAccount } from '../../../modules/account';

const withInteractor = (
  Presenter: React.FC<SignInBlockPresenterProps>,
): React.FC<SignInBlockProps> => {
  const Interactor: React.FC<SignInBlockProps> = (props) => {
    const [, verifyAccount] = useVerifyAccount();
    return (
      <Presenter
        {...props}
        verifyAccount={verifyAccount}
      />
    )
  };
  return Interactor;
};

export default withInteractor;
