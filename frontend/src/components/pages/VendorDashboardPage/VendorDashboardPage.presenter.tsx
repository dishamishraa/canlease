import React from 'react';
import { VendorDashboardPageProps } from './VendorDashboardPage';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isExpiring, isExpired } from '../../../lib/utils';
import { defaultProps as dashBoardCardProps } from '../../molecules/DashboardCard/DashboardCard';
import { defaultProps } from './VendorDashboardPage';
import CreateQuote from '../../../resources/icons/CreateQuote.svg';
import { Portfolio } from '../../../modules/portfolio/types';
import { Profile } from '../../../modules/profile/types';
import { Quote } from '../../../modules/quote/types';

export type VendorDashboardPagePresenterProps = VendorDashboardPageProps & {
  customerQuotes?: Quote[] | null,
  userPortfolio?: Portfolio | null;
  profile: Profile | null;
};

const withPresenter = (
    View: React.FC<VendorDashboardPageProps>,
  ): React.FC<VendorDashboardPagePresenterProps> => {
    const Presenter: React.FC<VendorDashboardPagePresenterProps> = (props) => {
      const {
        customerQuotes,
        userPortfolio,
        className,
        profile,
      } = props;
      const { t } = useTranslation();
      const history = useHistory();

      const handleViewClicked = (status, content) => (event: any) => {
        // history.push('/portal/content/list/1', {status: status, content: content})
      }

      let numOfExpiringQuotes = 0;
      let numOfExpiredQuotes = 0;
      let numOfActiveQuotes = 0;
      let numOfApplicationsUnderReview = 0;
      if (userPortfolio) {
        const { createApps: creditApplications } = userPortfolio;
        numOfApplicationsUnderReview = creditApplications.filter(application => 
        application.applicationStatus.toLowerCase() === 'under review').length
      }
      if (customerQuotes){
        customerQuotes.forEach(quote => {
          const { quoteExpiryDate } = quote;
          if (isExpired(quoteExpiryDate)) {
            numOfExpiredQuotes += 1
          }
          else if(isExpiring(quoteExpiryDate)){
            numOfExpiringQuotes += 1
          } else {
            numOfActiveQuotes += 1
          }
        })
      }

      const vendorDashboardPageProps: VendorDashboardPageProps = {
        ...defaultProps,
        dataBlock:{
          ...defaultProps.dataBlock,
          blockHeader: {
            ...defaultProps.dataBlock.blockHeader,
            text: {
              ...defaultProps.dataBlock.blockHeader?.text,
              value: t('customer_dashboard.header', {
                name: profile?.name,
            })
            },
          },
          dashboardCardList: {
            dashboardCards: [
              {
                ...dashBoardCardProps,
                type:"DataCard",
                dataText:{
                  ...dashBoardCardProps.dataText,
                  value: numOfActiveQuotes
                },
                labelText:{
                  ...dashBoardCardProps.labelText,
                  value:t('vendor_dashboard.metrics.quotes_active')
                },
                button: {
                  ...dashBoardCardProps.button,
                  text: {
                    ...dashBoardCardProps.button.text,
                    value: t('vendor_dashboard.metrics.view_button'),
                  },
                  onButtonClicked: handleViewClicked("Active", "Quote"),
                }
              },
              {
                ...dashBoardCardProps,
                type:"DataCard",
                dataText:{
                  ...dashBoardCardProps.dataText,
                  value: numOfExpiringQuotes
                },
                labelText:{
                  ...dashBoardCardProps.labelText,
                  value: t('vendor_dashboard.metrics.quotes_expiring')
                },
                button: {
                  ...dashBoardCardProps.button,
                  text: {
                    ...dashBoardCardProps.button.text,
                    value: t('vendor_dashboard.metrics.view_button'),
                  },
                  onButtonClicked: handleViewClicked("Expiring soon", "Quote"),
                }
              },
              {
                ...dashBoardCardProps,
                type:"DataCard",
                dataText:{
                  ...dashBoardCardProps.dataText,
                  value: numOfApplicationsUnderReview
                },
                labelText:{
                  ...dashBoardCardProps.labelText,
                  value:t('vendor_dashboard.metrics.applications_under_review')
                },
                button: {
                  ...dashBoardCardProps.button,
                  text: {
                    ...dashBoardCardProps.button.text,
                    value: t('vendor_dashboard.metrics.view_button'),
                  },
                  onButtonClicked: handleViewClicked("Under Review", "Application"),
                }
              },
              {
                ...dashBoardCardProps,
                type:"CreateQuoteCard",
                image:{
                  image: CreateQuote,
                },
                button: {
                  ...dashBoardCardProps.button,
                  text: {
                    ...dashBoardCardProps.button.text,
                    value: t('vendor_dashboard.metrics.create_quote'),
                  },
                }
              },
            ]
          }
        }
      }

      return <View
          {...vendorDashboardPageProps} 
          className={className}
          />;
  };
  return Presenter;
};
export default withPresenter;