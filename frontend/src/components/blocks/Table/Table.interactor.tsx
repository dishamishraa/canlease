import React, { useContext } from 'react';
import { AuthContext } from '../../../modules/auth';
import { useCustomerPortfolio, useUserPortfolio } from '../../../modules/portfolio';
import { useCustomerQuotes, useQuotes, useProfile } from '../../../modules/profile';
import { TableProps } from './Table';
import { TablePresenterProps, TablePresenterValueProps } from './Table.presenter';

type InteractorRenderProps = {
  portalId: string;
  children(valueProps: TablePresenterValueProps): JSX.Element;
};

const PersonalQuoteInteractor: React.FC<InteractorRenderProps> = ({ children, portalId }) => {
  const { data: quotes } = useQuotes(portalId);
  const { data: portfolio } = useUserPortfolio(portalId);
  const { data: profile } = useProfile();
  return children({
    quotes,
    portfolio,
    profile,
  });
};

const CustomerQuoteInteractor: React.FC<InteractorRenderProps> = ({ children, portalId }) => {
  const { data: quotes } = useCustomerQuotes(portalId);
  const { data: portfolio } = useCustomerPortfolio(portalId);
  return children({
    quotes,
    portfolio,
    profile: null,
  });
};

const PersonalApplicationInteractor: React.FC<InteractorRenderProps> = ({ children, portalId }) => {
  const { data: portfolio } = useUserPortfolio(portalId);
  const { data: profile } = useProfile();
  return children({
    quotes: null,
    portfolio,
    profile,
  });
};

const CustomerApplicationInteractor: React.FC<InteractorRenderProps> = ({ children, portalId }) => {
  const { data: quotes } = useCustomerQuotes(portalId);
  const { data: portfolio } = useCustomerPortfolio(portalId);
  return children({
    quotes,
    portfolio,
    profile: null,
  });
};

const withInteractor = (
  Presenter: React.FC<TablePresenterProps>,
): React.FC <TableProps> => {
  const Interactor: React.FC <TableProps> = (props) => {
    const { contentType, tab } = props;
    const { account } = useContext(AuthContext);
    const portalId = account?.uuid || '';

    let TypeInteractor = PersonalQuoteInteractor;
    if (contentType === 'Quote' && tab === 'Personal') {
      TypeInteractor = PersonalQuoteInteractor;
    } else if (contentType === 'Quote' && tab === 'Customer') {
      TypeInteractor = CustomerQuoteInteractor;
    } else if (contentType === 'Application' && tab === 'Personal') {
      TypeInteractor = PersonalApplicationInteractor;
    } else if (contentType === 'Application' && tab === 'Customer') {
      TypeInteractor = CustomerApplicationInteractor;
    }

    return (
      <TypeInteractor portalId={portalId}>
        { (valueProps) => (
          <Presenter
            {...props}
            {...valueProps}
            />
        )}
      </TypeInteractor>
    );
    // return <Presenter
    //   {...props}
    //   personalQuotes={personalQuotes}
    //   customerQuotes={customerQuotes}
    //   personalPortfolio={personalPortfolio}
    //   customerPortfolio={customerPortfolio}
    //   />;
  };
  return Interactor;
};
export default withInteractor;
