import React from 'react';
import { QuoteSelectionBlockProps } from './QuoteSelectionBlock';
import { QuoteSelectionBlockPresenterProps } from './QuoteSelectionBlock.presenter';
import { useParams } from 'react-router';
import useQuoteDetails from '../../../modules/quote/useQuoteDetails';

const withInteractor = (
  Presenter: React.FC<QuoteSelectionBlockPresenterProps>,
): React.FC<QuoteSelectionBlockProps> => {
  const Interactor: React.FC<QuoteSelectionBlockProps> = (props) => {
    const { quoteId } = useParams<{quoteId: string}>();
    const { data: quoteDetails } = useQuoteDetails(quoteId);
    
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
