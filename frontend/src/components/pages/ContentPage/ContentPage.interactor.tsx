import React, { useContext } from 'react';
import { useCreateQuote } from '../../../modules/quote';
import { ContentPageProps } from './ContentPage';
import { ContentPagePresenterProps } from './ContentPage.presenter';


const withInteractor = (
  Presenter: React.FC<ContentPagePresenterProps>,
): React.FC <ContentPageProps> => {
  
  const Interactor: React.FC <ContentPageProps> = (props) => {
    return (
      <Presenter
        {...props}
      />
    );
  }
  return Interactor;
};
export default withInteractor;
