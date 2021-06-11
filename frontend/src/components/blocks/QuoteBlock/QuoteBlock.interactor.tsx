import React, { useContext } from 'react';
import { QuoteBlockProps } from './QuoteBlock';
import { QuoteBlockPresenterProps} from './QuoteBlock.presenter';
import { useParams } from 'react-router';
import useQuoteDetails from '../../../modules/quote/useQuoteDetails'

const withInteractor = (
    Presenter: React.FC<QuoteBlockPresenterProps>
): React.FC<QuoteBlockProps> => {

    const Interactor : React.FC<QuoteBlockProps> = (props) => {

        const { quoteId } = useParams<{quoteId: string}>();
        const { loading, error, data: quoteDetails} = useQuoteDetails(quoteId)

        return <Presenter
            {...props}
            quoteDetails={quoteDetails}
            loading={loading}
            error={error}
        />
    }

    return Interactor;
}

export default withInteractor;