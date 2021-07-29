import React from 'react';
import { SignUpBlockPresenterProps } from './SignUpBlock.presenter';
import { SignUpBlockProps } from './SignUpBlock';

const withInteractor = (
  Presenter: React.FC<SignUpBlockPresenterProps>,
): React.FC<SignUpBlockProps> => {
  const Interactor: React.FC<SignUpBlockProps> = (props) => <Presenter
              {...props}
          />;

  return Interactor;
};

export default withInteractor;
