import React, { useContext } from 'react';
import { AuthContext } from '../../../modules/auth';
import { useUserPortfolio } from '../../../modules/portfolio';
import { useQuotes } from '../../../modules/profile';
import { EndUserDashboardPageProps } from './EndUserDashboardPage';
import { EndUserDashboardPagePresenterProps } from './EndUserDashboardPage.presenter';

const withInteractor = (
  Presenter: React.FC<EndUserDashboardPagePresenterProps>,
): React.FC <EndUserDashboardPageProps> => {
  
  const Interactor: React.FC <EndUserDashboardPageProps> = (props) => {
    const { account, profile } = useContext(AuthContext);
    const portalId = account?.uuid || '';
    const { data: customerQuotes } = useQuotes(portalId);
    const { data: userPortfolio } = useUserPortfolio(portalId);
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
