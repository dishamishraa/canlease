import React from 'react';
import { useParams } from 'react-router';
import { RateCardDetailsPageProps } from './RateCardDetailsPage';
import { RateCardDetailsPagePresenterProps } from './RateCardDetailsPage.presenter';
import { useCreateRate, useGetRateCard, useGetRatesDetails, 
  useUpdateRate, useDeleteRate, useUpdateRateCard  } from '../../../modules/rateCard/index' 

const withInteractor = (
  Presenter: React.FC<RateCardDetailsPagePresenterProps>,
): React.FC <RateCardDetailsPageProps> => {
  const Interactor: React.FC <RateCardDetailsPageProps> = (props) => {
    const { rateCardId } = useParams<{rateCardId: string}>();
    const { refetch: refetchRates, loading, error, data: rates } = useGetRatesDetails(rateCardId);
    const [, createRate ] = useCreateRate();
    const [, updateRate ] = useUpdateRate();
    const { refetch: refetchRateCard, data: rateCard } = useGetRateCard(rateCardId);
    const [, deleteRate] = useDeleteRate();
    const [, updateRateCard] = useUpdateRateCard();

    return (
      <Presenter
        {...props}
        loading={loading}
        error={error}
        rates={rates}
        rateCard={rateCard}
        createRate={createRate}
        refetchRates={refetchRates}
        updateRate={updateRate}
        rateCardName={rateCard?.cardtype}
        rateCardId={rateCard?.id}
        deleteRate={deleteRate}
        updateRateCard={updateRateCard}
        refetchRateCard={refetchRateCard}
      />
    );
  };
  return Interactor;
};
export default withInteractor;
