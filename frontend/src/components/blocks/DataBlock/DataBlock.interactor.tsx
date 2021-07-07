import React, { useContext } from 'react';
import { useParams } from 'react-router';
import { DataBlockProps } from './DataBlock';
import { DataBlockPresenterProps } from './DataBlock.presenter';
import useAllQuotesFromProfile from '../../../modules/profile/useAllQuotesFromProfile';
import useCustomerPortfolio from '../../../modules/portfolio/useCustomerPortfolio';

const withInteractor = (
  Presenter: React.FC<DataBlockPresenterProps>,
): React.FC <DataBlockProps> => {
  
  const Interactor: React.FC <DataBlockProps> = (props) => {
    const { data: customerQuotes } = useAllQuotesFromProfile('1');
    const { data: creditApplications } = useCustomerPortfolio('1');
    return (
      <Presenter
        {...props}
        customerQuotes={customerQuotes}
        creditApplications={creditApplications}
      />
    );
  }
  return Interactor;
};
export default withInteractor;
