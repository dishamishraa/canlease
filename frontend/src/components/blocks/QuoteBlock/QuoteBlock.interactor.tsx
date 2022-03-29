import React from 'react';
import { useLocation, useParams } from 'react-router';
import { QuoteBlockProps } from './QuoteBlock';
import { QuoteBlockPresenterProps } from './QuoteBlock.presenter';
import useQuoteDetails from '../../../modules/quote/useQuoteDetails';
import { isEmpty } from '../../../lib/utils';
import { ViewQuoteType } from '../../../modules/types';
import { useSendQuote } from '../../../modules/quote';

type InteractorRenderProps = {
  quoteId: string;
  children(valueProps: QuoteBlockPresenterProps): JSX.Element;
};

const GetQuoteInteractor: React.FC<InteractorRenderProps> = ({ children, quoteId }) => {
  const { loading, error, data: quote } = useQuoteDetails(quoteId);
  return children({
    loading,
    error,
    quote,
  });
};

const withInteractor = (
  Presenter: React.FC<QuoteBlockPresenterProps>,
): React.FC<QuoteBlockProps> => {
  const Interactor: React.FC<QuoteBlockProps> = (props) => {
    const { quoteId } = useParams<{quoteId: string}>();
    const { state } = useLocation<ViewQuoteType | undefined>();
    const [, sendQuote] = useSendQuote();
    const { quote, contactInfo } = state || {};

    if (isEmpty(quote)) {
      return (
        <GetQuoteInteractor quoteId={quoteId}>
          {(valueProps) => (
            <Presenter {...props} {...valueProps} sendQuote={sendQuote} />
          )}
        </GetQuoteInteractor>
      );
    }

    return (
      <Presenter
        {...props}
        quote={quote || null}
        loading={false}
        error={undefined}
        sendQuote={sendQuote}
        contactInfo={contactInfo}
      />
    );
  };

  return Interactor;
};

export default withInteractor;
