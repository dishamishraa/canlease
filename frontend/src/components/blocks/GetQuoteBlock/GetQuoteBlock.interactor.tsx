import React from 'react';
import { useGetRateCards } from '../../../modules/rateCard/index';
import { GetQuoteBlockProps } from './GetQuoteBlock';
import { GetQuoteBlockPresenterProps } from './GetQuoteBlock.presenter';

const withInteractor = (
  Presenter: React.FC<GetQuoteBlockPresenterProps>,
): React.FC<GetQuoteBlockProps> => {
  const Interactor: React.FC<GetQuoteBlockProps> = (props) => {
    const { profile } = props;
    const { data: rateCards } = useGetRateCards();
    return (
      <Presenter
        {...props}
        profile={profile}
        rateCards={rateCards}
      />
    );
  };

  return Interactor;
};

export default withInteractor;
