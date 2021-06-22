import React, { useContext } from 'react';
import { ForgotPasswordBlockPresenterProps } from './ForgotPasswordBlock.presenter';
import { ForgotPasswordBlockProps } from './ForgotPasswordBlock'

const withInteractor = (
    Presenter: React.FC<ForgotPasswordBlockPresenterProps>,
): React.FC<ForgotPasswordBlockProps> => {
    const Interactor: React.FC<ForgotPasswordBlockProps> = (props) => {
      return <Presenter
              {...props}
          />;
    };
    return Interactor;
  };

export default withInteractor;