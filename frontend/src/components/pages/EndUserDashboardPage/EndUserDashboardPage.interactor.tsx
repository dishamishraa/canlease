import React, { useContext } from 'react';
import { useCreateQuote } from '../../../modules/quote';
import { EndUserDashboardPageProps } from './EndUserDashboardPage';
import { EndUserDashboardPagePresenterProps } from './EndUserDashboardPage.presenter';
import useAllQuotesFromProfile from '../../../modules/profile/useAllQuotesFromProfile';
import useUserPortfolio from '../../../modules/portfolio/useUserPortfolio';
import useGetProfile from '../../../modules/profile/useGetProfile';

const withInteractor = (
  Presenter: React.FC<EndUserDashboardPagePresenterProps>,
): React.FC <EndUserDashboardPageProps> => {
  
  const Interactor: React.FC <EndUserDashboardPageProps> = (props) => {
    const { data: customerQuotes } = useAllQuotesFromProfile('1');
    const { data: userPortfolio } = useUserPortfolio('1');
    const { data: profile } = useGetProfile('1');
    return (
      <Presenter
        {...props}
        customerQuotes={customerQuotes}
        userPortfolio={userPortfolio}
        profile={profile}
      />
    );
  }
  return Interactor;
};
export default withInteractor;
