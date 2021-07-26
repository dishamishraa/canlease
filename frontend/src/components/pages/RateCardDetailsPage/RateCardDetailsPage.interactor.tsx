import React from 'react';
import { useParams } from 'react-router';
import { RateCardDetailsPageProps } from './RateCardDetailsPage';
import { RateCardDetailsPagePresenterProps } from './RateCardDetailsPage.presenter';
import { useCreateRate, useGetRateCard, useGetRatesDetails, useUpdateRate } from '../../../modules/rateCard/index' 
import { RateCard } from '../../../modules/rateCard/types';

const withInteractor = (
  Presenter: React.FC<RateCardDetailsPagePresenterProps>,
): React.FC <RateCardDetailsPageProps> => {
  const Interactor: React.FC <RateCardDetailsPageProps> = (props) => {
    const { rateCardId } = useParams<{rateCardId: string}>();
    const { refetch: refetchRates, loading, error, data: rates } = useGetRatesDetails(rateCardId);
    const { data: rateCard } = useGetRateCard(rateCardId);
    const [ {}, createRate ] = useCreateRate();
    const [ {}, updateRate ] = useUpdateRate();
    return (
      <Presenter
        {...props}
        loading={loading}
        error={error}
        rates={rates}
        rateCard={rateCard as RateCard}
        createRate={createRate}
        refetchRates={refetchRates}
        updateRate={updateRate}
      />
    );
  };
  return Interactor;
};
export default withInteractor;
