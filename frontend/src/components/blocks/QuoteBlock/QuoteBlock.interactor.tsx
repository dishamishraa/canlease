import React, { useContext } from 'react';
import { QuoteBlockProps } from './QuoteBlock';
import { QuoteBlockPresenterProps} from './QuoteBlock.presenter';

const withInteractor = (
    Presenter: React.FC<QuoteBlockPresenterProps>
): React.FC<QuoteBlockProps> => {
    const Interactor : React.FC<QuoteBlockProps> = (props) => {
        return <Presenter
        {...props}
        />
    }

    return Interactor;
}

export default withInteractor;