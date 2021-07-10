import React, { useContext } from 'react';
import { AuthContext } from '../../../modules/auth';
import { useCustomerPortfolio } from '../../../modules/portfolio';
import { useCustomerQuotes } from '../../../modules/profile';
import { VendorDashboardPageProps } from './VendorDashboardPage';
import { VendorDashboardPagePresenterProps } from './VendorDashboardPage.presenter';

const withInteractor = (
  Presenter: React.FC<VendorDashboardPagePresenterProps>,
): React.FC <VendorDashboardPageProps> => {
  
  const Interactor: React.FC <VendorDashboardPageProps> = (props) => {
    const { account, profile } = useContext(AuthContext);
    const portalId = account?.uuid || '';

    const { data: customerQuotes } = useCustomerQuotes(portalId);
    const { data: userPortfolio } = useCustomerPortfolio(portalId);
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
