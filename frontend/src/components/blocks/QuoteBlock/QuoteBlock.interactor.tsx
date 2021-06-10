import React, { useContext } from 'react';
import { AuthContext } from '../../../modules/auth';
import { QuoteBlockProps } from './QuoteBlock';
import { QuoteBlockPresenterProps} from './QuoteBlock.presenter';
import { Quote } from '../../../modules/types'
import { getQuote } from '../../../modules/quote/api'
import mockData from './mockData';
import { useParams } from 'react-router';
import useQuoteDetails from '../../../modules/quote/useQuoteDetails'

const withInteractor = (
    Presenter: React.FC<QuoteBlockPresenterProps>
): React.FC<QuoteBlockProps> => {

    const Interactor : React.FC<QuoteBlockProps> = (props) => {

        const { quoteId } = useParams<{quoteId: string}>();
        const test = useQuoteDetails("1")

        // const { quoteDetail }: Quote = getQuote(quoteId);
        return <Presenter
            {...props}
            quote={test}
        />
    }

    return Interactor;
}

export default withInteractor;