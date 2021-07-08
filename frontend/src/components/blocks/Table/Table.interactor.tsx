import React, { useContext } from 'react';
import { TableProps } from './Table';
import { TablePresenterProps } from './Table.presenter';
import { useParams } from 'react-router';
import useAllQuotesFromProfile from '../../../modules/profile/useAllQuotesFromProfile';
import useAllCustomerQuotesFromProfile from '../../../modules/profile/useAllCustomerQuotesFromProfile';
import useCustomerPortfolio from '../../../modules/portfolio/useCustomerPortfolio';
import getUserPortfolio from '../../../modules/portfolio/useUserPortfolio';

const withInteractor = (
  Presenter: React.FC<TablePresenterProps>,
): React.FC <TableProps> => {
  const Interactor: React.FC <TableProps> = (props) => {
    //TODO get portalId from Auth Context
  const { portalId } = useParams<{portalId: string}>();
  const { data: personalQuotes } = useAllQuotesFromProfile(portalId);
  const { data: customerQuotes } = useAllCustomerQuotesFromProfile(portalId);
  const { data: personalPortfolio } = getUserPortfolio(portalId);
  const { data: customerPortfolio } = useCustomerPortfolio(portalId);
  return <Presenter
    {...props}
    personalQuotes={personalQuotes}
    customerQuotes={customerQuotes}
    personalPortfolio={personalPortfolio}
    customerPortfolio={customerPortfolio}
    />;
  }
  return Interactor;
};
export default withInteractor;
