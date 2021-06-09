import React, { useContext } from 'react';
import { AuthContext } from '../../../modules/auth';
import { GetQuoteBlockProps } from './GetQuoteBlock';
import { GetQuoteBlockPresenterProps } from './GetQuoteBlock.presenter';

const withInteractor = (
  Presenter: React.FC<GetQuoteBlockPresenterProps>,
): React.FC<GetQuoteBlockProps> => {
  const Interactor: React.FC<GetQuoteBlockProps> = (props) => {
    const { user, account, refetchUser } = useContext(AuthContext);
    
    return (
      <Presenter 
        {...props}
      />
    );
  };

  return Interactor;
};

export default withInteractor;
