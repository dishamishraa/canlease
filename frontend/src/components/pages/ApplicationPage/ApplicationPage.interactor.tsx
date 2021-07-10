import React from 'react';
import { useCreateApplication } from '../../../modules/application';
import { ApplicationPageProps } from './ApplicationPage';
import { ApplicationPagePresenterProps } from './ApplicationPage.presenter';
import { useParams } from 'react-router';
import useQuoteDetails from '../../../modules/quote/useQuoteDetails';
import { useContext } from 'react';
import { AuthContext } from '../../../modules/auth';

const withInteractor = (
  Presenter: React.FC<ApplicationPagePresenterProps>,
): React.FC <ApplicationPageProps> => {
  
  const Interactor: React.FC <ApplicationPageProps> = (props) => {
    const { profile } = useContext(AuthContext);
    const [{}, createApplication] = useCreateApplication();
    const { quoteId } = useParams<{quoteId: string}>();
    const { data: quoteDetails } = useQuoteDetails(quoteId);
    return (
      <Presenter
        {...props}
        createApplication={createApplication}
        quoteDetails={quoteDetails}
        profile={profile}
      />
    );
  }
  return Interactor;
};
export default withInteractor;
