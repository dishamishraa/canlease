import React from 'react';
import { RateCardPageProps } from './RateCardPage';
import { RateCardPagePresenterProps } from './RateCardPage.presenter';
import useGetRateCards from '../../../modules/ratecard/useGetRateCards';

const withInteractor = (
  Presenter: React.FC<RateCardPagePresenterProps>,
): React.FC <RateCardPageProps> => {
  const Interactor: React.FC <RateCardPageProps> = (props) => {
    const { data: rateCardData} = useGetRateCards();

    return (
      <Presenter
        {...props}
        rateCardData={rateCardData}
      />
    );
  };
  return Interactor;
};
export default withInteractor;
