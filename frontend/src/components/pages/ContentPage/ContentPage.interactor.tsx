import React from 'react';
import { ContentPageProps } from './ContentPage';
import { ContentPagePresenterProps } from './ContentPage.presenter';

const withInteractor = (
  Presenter: React.FC<ContentPagePresenterProps>,
): React.FC <ContentPageProps> => {
  const Interactor: React.FC <ContentPageProps> = (props) => (
      <Presenter
        {...props}
      />
  );
  return Interactor;
};
export default withInteractor;
