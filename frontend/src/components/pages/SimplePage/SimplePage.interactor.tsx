import React from 'react';
import { useCreateQuote } from '../../../modules/quote';
import { SimplePageProps } from './SimplePage';
import { SimplePagePresenterProps } from './SimplePage.presenter';

const withInteractor = (
  Presenter: React.FC<SimplePagePresenterProps>,
): React.FC <SimplePageProps> => {
  const Interactor: React.FC <SimplePageProps> = (props) => {
    const [{ loading }, createQuote] = useCreateQuote();
    return (
      <Presenter
        {...props}
        createQuote = {createQuote}
      />
    );
  };
  return Interactor;
};
export default withInteractor;
