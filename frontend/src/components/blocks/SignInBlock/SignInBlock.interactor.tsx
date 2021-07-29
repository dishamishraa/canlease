import React from 'react';
import { SignInBlockPresenterProps } from './SignInBlock.presenter';
import { SignInBlockProps } from './SignInBlock';

const withInteractor = (
  Presenter: React.FC<SignInBlockPresenterProps>,
): React.FC<SignInBlockProps> => {
  const Interactor: React.FC<SignInBlockProps> = (props) => <Presenter
              {...props}
          />;
  return Interactor;
};

export default withInteractor;
