import React from 'react';
import { useCreateApplication } from '../../../modules/application';
import { ApplicationPageProps } from './ApplicationPage';
import { ApplicationPagePresenterProps } from './ApplicationPage.presenter';
import { useParams } from 'react-router';
import useQuoteDetails from '../../../modules/quote/useQuoteDetails';
import { useContext } from 'react';
import { AuthContext } from '../../../modules/auth';
import { useCreateQuote } from '../../../modules/quote';
import { useCustomerPortfolio } from '../../../modules/portfolio';

const withInteractor = (
  Presenter: React.FC<ApplicationPagePresenterProps>,
): React.FC <ApplicationPageProps> => {
  
  const Interactor: React.FC <ApplicationPageProps> = (props) => {
    const { profile } = useContext(AuthContext);
    const [{}, createApplication] = useCreateApplication();
    const [{}, createQuote] = useCreateQuote();
    const { quoteId } = useParams<{quoteId: string}>();
    const { data: quoteDetails } = useQuoteDetails(quoteId);
    const { data: customerPortfolio } = useCustomerPortfolio(profile?.portalId ?? '');
    return (
      <Presenter
        {...props}
        createApplication={createApplication}
        createQuote={createQuote}
        quoteDetails={quoteDetails}
        profile={profile}
        customerPortfolio={customerPortfolio}
      />
    );
  }
  return Interactor;
};
export default withInteractor;
