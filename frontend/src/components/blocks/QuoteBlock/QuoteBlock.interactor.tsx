import React, { useContext } from 'react';
import { AuthContext } from '../../../modules/auth';
import { QuoteBlockProps } from './QuoteBlock';
import { QuoteBlockPresenterProps} from './QuoteBlock.presenter';

const withInteractor = (
    Presenter: React.FC<QuoteBlockPresenterProps>
): React.FC<QuoteBlockProps> => {
    const Interactor : React.FC<QuoteBlockProps> = (props) => {
        const { user, account, refetchUser } = useContext(AuthContext);
        return <Presenter
        {...props}
        />
    }

    return Interactor;
}

export default withInteractor;