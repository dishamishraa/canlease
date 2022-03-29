import React from 'react';
import { useLocation, useParams } from 'react-router';
import { LeaseInfoBlockProps } from './LeaseInfoBlock';
import { LeaseInfoBlockPresenterProps } from './LeaseInfoBlock.presenter';
import useQuoteDetails from '../../../modules/quote/useQuoteDetails';
import { LeaseInfo } from '../../../modules/types';

const withInteractor = (
  Presenter: React.FC<LeaseInfoBlockPresenterProps>,
): React.FC<LeaseInfoBlockProps> => {
  const Interactor: React.FC<LeaseInfoBlockProps> = (props) => {
    const { quoteId } = useParams<{quoteId: string}>();
    const { state } = useLocation<LeaseInfo | undefined>();
    const { application } = state || {};
    const { data: quoteDetails } = useQuoteDetails(application?.quoteId!)

    return (
      <Presenter
        {...props}
        quoteDetails={quoteDetails}
        />
    );
  };

  return Interactor;
};
export default withInteractor;
