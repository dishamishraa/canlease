import React, { useContext } from 'react';
import { useLocation, useParams } from 'react-router';
import { QuoteBlockProps } from './QuoteBlock';
import { QuoteBlockPresenterProps } from './QuoteBlock.presenter';
import useQuoteDetails from '../../../modules/quote/useQuoteDetails';
import { isEmpty } from '../../../lib/utils';
import { ViewQuoteType } from '../../../modules/types';

type InteractorRenderProps = {
  quoteId: string;
  children(valueProps: QuoteBlockPresenterProps): JSX.Element;
}

const GetQuoteInteractor: React.FC<InteractorRenderProps> = ({ children, quoteId }) => {
  const { loading, error, data: quote } = useQuoteDetails(quoteId);
  return children({
    loading,
    error,
    quote,
  });
}

const withInteractor = (
  Presenter: React.FC<QuoteBlockPresenterProps>,
): React.FC<QuoteBlockProps> => {
  const Interactor: React.FC<QuoteBlockProps> = (props) => {
    const { quoteId } = useParams<{quoteId: string}>();
    const { state } = useLocation<ViewQuoteType | undefined>();
    
    const { userType, quote } = state || {};

    if(isEmpty(quote)) {
      return <GetQuoteInteractor quoteId={quoteId}>
        { valueProps => 
          <Presenter 
            {...props}
            {...valueProps}
            userType={userType}
            />
        }
      </GetQuoteInteractor>
    }

    return <Presenter
            {...props}
            quote={quote || null}
            loading={false}
            error={undefined}
            userType={userType}
        />;
  };

  return Interactor;
};

export default withInteractor;
