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
        const quoteDetails = useQuoteDetails(quoteId)

        return <Presenter
            {...props}
            quoteDetails={quoteDetails}
        />
    }

    return Interactor;
}

export default withInteractor;