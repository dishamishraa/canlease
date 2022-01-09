import React from 'react';
import { TermsOfApplicationBlockProps } from './TermsOfApplicationBlock';
import { TermsOfApplicationBlockPresenterProps } from './TermsOfApplicationBlock.presenter';

const withInteractor = (
  Presenter: React.FC<TermsOfApplicationBlockPresenterProps>,
): React.FC<TermsOfApplicationBlockProps> => {
  const Interactor: React.FC<TermsOfApplicationBlockProps> = (props) => (
      <Presenter
        {...props}
      />
  );

  return Interactor;
};

export default withInteractor;
