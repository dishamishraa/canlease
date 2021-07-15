import React from 'react';
import { RateCardPageProps } from './RateCardPage';
import { RateCardPagePresenterProps } from './RateCardPage.presenter';

const withInteractor = (
  Presenter: React.FC<RateCardPagePresenterProps>,
): React.FC <RateCardPageProps> => {
  const Interactor: React.FC <RateCardPageProps> = (props) => {
    return (
      <Presenter
        {...props}
      />
    );
  };
  return Interactor;
};
export default withInteractor;
