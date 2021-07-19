import React from 'react';
import { RateCardPageProps } from './RateCardPage';
import { RateCardPagePresenterProps } from './RateCardPage.presenter';
import useGetRateCards from '../../../modules/rateCard/useGetRateCards';
import { useCreateRateCard } from '../../../modules/rateCard';

const withInteractor = (
  Presenter: React.FC<RateCardPagePresenterProps>,
): React.FC <RateCardPageProps> => {
  const Interactor: React.FC <RateCardPageProps> = (props) => {
    const { data: rateCards} = useGetRateCards();
    const [{}, createRateCard] = useCreateRateCard();

    return (
      <Presenter
        {...props}
        rateCards={rateCards}
        createRateCard={createRateCard}
      />
    );
  };
  return Interactor;
};
export default withInteractor;
