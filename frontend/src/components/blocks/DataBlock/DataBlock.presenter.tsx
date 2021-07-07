import React from 'react';
import { DataBlockProps, defaultProps } from './DataBlock';
import { Quote, CreditApplication, Portfolio } from '../../../modules/types';
import DashboardCard from '../../molecules/DashboardCard/DashboardCard';
import { isExpiring, isExpired } from '../../../lib/utils';
import { defaultProps as dashBoardCardProps } from '../../molecules/DashboardCard/DashboardCard';
import CreateQuote from '../../../resources/icons/CreateQuote.svg';
import { useTranslation } from 'react-i18next';

export type DataBlockPresenterProps = DataBlockProps & {
  customerQuotes?: Quote[] | null,
  creditApplications?: Portfolio | null;
};

const withPresenter = (
    View: React.FC<DataBlockProps>,
  ): React.FC<DataBlockPresenterProps> => {
    const Presenter: React.FC<DataBlockPresenterProps> = (props) => {
      
      return <View
          {...props} />;
  };
  return Presenter;
};
export default withPresenter;
