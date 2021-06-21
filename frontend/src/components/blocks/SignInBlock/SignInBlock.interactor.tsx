import React, { useContext } from 'react';
import { SignInBlockPresenterProps } from './SignInBlock.presenter';
import { SignInBlockProps } from './SignInBlock'

const withInteractor = (
    Presenter: React.FC<SignInBlockPresenterProps>,
): React.FC<SignInBlockProps> => {
    const Interactor: React.FC<SignInBlockProps> = (props) => {
      return <Presenter
              {...props}
          />;
    };
    return Interactor;
  };

export default withInteractor;