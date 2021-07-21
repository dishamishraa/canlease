import React from 'react';
import { RateCardPageProps } from './RateCardPage';
import { RateCardPagePresenterProps } from './RateCardPage.presenter';
import { useCreateRateCard, useRateCards, useDeleteRateCard } from '../../../modules/rateCard';

const withInteractor = (
  Presenter: React.FC<RateCardPagePresenterProps>,
): React.FC <RateCardPageProps> => {
  const Interactor: React.FC <RateCardPageProps> = (props) => {

    const { refetch, data: rateCards} = useRateCards();
    const [{}, createRateCard] = useCreateRateCard();
    const [, deleteRateCard] = useDeleteRateCard();

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
