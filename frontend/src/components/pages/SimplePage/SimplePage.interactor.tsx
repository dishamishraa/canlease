import React, { useContext } from 'react';
import { useCreateQuote, useSendQuote } from '../../../modules/quote';
import { SimplePageProps } from './SimplePage';
import { SimplePagePropsPresenterProps } from './SimplePage.presenter';

const withInteractor = (
  Presenter: React.FC<SimplePagePropsPresenterProps>,
): React.FC <SimplePageProps> => {
  
  const Interactor: React.FC <SimplePageProps> = (props) => {
    const [{}, createQuote] = useCreateQuote();
    const [{}, sendQuote] = useSendQuote();
    return (
      <Presenter
        {...props}
        createQuote = {createQuote}
        sendQuote = {sendQuote}
      />
    );
  }
  return Interactor;
};
export default withInteractor;
