import React from 'react';
import { RateCardPageProps } from './RateCardPage';
import { RateCardPagePresenterProps } from './RateCardPage.presenter';
import { useCreateRateCard, useGetRateCards, UseDeleteRateCard } from '../../../modules/ratecard';

const withInteractor = (
  Presenter: React.FC<RateCardPagePresenterProps>,
): React.FC <RateCardPageProps> => {
  const Interactor: React.FC <RateCardPageProps> = (props) => {

    const { refetch, data: rateCards} = useGetRateCards();
    const [{}, createRateCard] = useCreateRateCard();
    const [, deleteRateCard] = UseDeleteRateCard();

    return (
      <Presenter
        {...props}
        rateCards={rateCards}
        createRateCard={createRateCard}
        deleteRateCard={deleteRateCard}
        refetch={refetch}

      />
    );
  };
  return Interactor;
};
export default withInteractor;
