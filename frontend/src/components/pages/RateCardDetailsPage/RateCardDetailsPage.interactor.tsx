import React from 'react';
import { useParams } from 'react-router';
import { RateCardDetailsPageProps } from './RateCardDetailsPage';
import { RateCardDetailsPagePresenterProps } from './RateCardDetailsPage.presenter';
import { useGetRateCard, useGetRatesDetails } from '../../../modules/rateCard/index' 

const withInteractor = (
  Presenter: React.FC<RateCardDetailsPagePresenterProps>,
): React.FC <RateCardDetailsPageProps> => {
  const Interactor: React.FC <RateCardDetailsPageProps> = (props) => {
    const { rateCardId } = useParams<{rateCardId: string}>();
    const { loading, error, data: rates } = useGetRatesDetails(rateCardId);
    const { data: rateCard } = useGetRateCard(rateCardId);
    return (
      <Presenter
        {...props}
        loading={loading}
        error={error}
        rates={rates}
        rateCardName={rateCard?.cardtype}
      />
    );
  };
  return Interactor;
};
export default withInteractor;
