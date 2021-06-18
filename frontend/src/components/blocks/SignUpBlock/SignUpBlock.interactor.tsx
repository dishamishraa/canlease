import React, { useContext } from 'react';
import { SignUpBlockPresenterProps } from './SignUpBlock.presenter';
import { SignUpBlockProps } from './SignUpBlock'
import useCreateIdentityAccount from '../../../modules/account/useCreateIdentityAccount';

const withInteractor = (
    Presenter: React.FC<SignUpBlockPresenterProps>,
): React.FC<SignUpBlockProps> => {
    const Interactor: React.FC<SignUpBlockProps> = (props) => {
      const [{}, createIdentityAccount] = useCreateIdentityAccount();
      return <Presenter
              {...props}
              createIdentityAccount = {createIdentityAccount}
          />;
    };
  
    return Interactor;
  };

export default withInteractor;