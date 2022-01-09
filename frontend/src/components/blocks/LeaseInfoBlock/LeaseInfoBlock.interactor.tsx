import React from 'react';
import { LeaseInfoBlockProps } from './LeaseInfoBlock';
import { LeaseInfoBlockPresenterProps } from './LeaseInfoBlock.presenter';

const withInteractor = (
  Presenter: React.FC<LeaseInfoBlockPresenterProps>,
): React.FC<LeaseInfoBlockProps> => {
  const Interactor: React.FC<LeaseInfoBlockProps> = (props) => (
      <Presenter
        {...props}
        />
  );
  return Interactor;
};
export default withInteractor;
