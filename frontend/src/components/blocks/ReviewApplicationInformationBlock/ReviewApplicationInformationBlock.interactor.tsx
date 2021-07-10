import React from 'react';
import { ReviewApplicationInformationBlockProps } from './ReviewApplicationInformationBlock';
import { ReviewApplicationInformationBlockPresenterProps } from './ReviewApplicationInformationBlock.presenter';
import { useParams } from 'react-router';
import useQuoteDetails from '../../../modules/quote/useQuoteDetails';
import { useContext } from 'react';
import { AuthContext } from '../../../modules/auth';

const withInteractor = (
  Presenter: React.FC<ReviewApplicationInformationBlockPresenterProps>,
): React.FC<ReviewApplicationInformationBlockProps> => {
  const Interactor: React.FC<ReviewApplicationInformationBlockProps> = (props) => {
    const { profile } = useContext(AuthContext);
    const { quoteId } = useParams<{quoteId: string}>();
    const { data: quoteIdDetails } = useQuoteDetails(quoteId);
    return (
      <Presenter
        {...props}
        quoteIdDetails={quoteIdDetails}
        profile={profile}
      />
    );
  };

  return Interactor;
};

export default withInteractor;

