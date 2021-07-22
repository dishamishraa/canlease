import React, { useContext } from 'react';
import { AuthContext } from '../../../modules/auth';
import useRateCards from '../../../modules/rateCard/useRateCards';
import { GetQuoteBlockProps } from './GetQuoteBlock';
import { GetQuoteBlockPresenterProps } from './GetQuoteBlock.presenter';

const withInteractor = (
  Presenter: React.FC<GetQuoteBlockPresenterProps>,
): React.FC<GetQuoteBlockProps> => {
  const Interactor: React.FC<GetQuoteBlockProps> = (props) => {
    const { profile } = props;
    const { data: rateCards } = useRateCards();
    return (
      <Presenter
        {...props}
        profile={profile}
        rateCards={rateCards}
      />
  )};

  return Interactor;
};

export default withInteractor;
