import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { EndUserDashboardPageProps, defaultProps } from './EndUserDashboardPage';
import { DashboardCardProps, defaultProps as dashBoardCardProps } from '../../molecules/DashboardCard/DashboardCard';
import { isExpiring, isExpired, createdOn, formatAsCurrency } from '../../../lib/utils';
import CreateQuote from '../../../resources/icons/CreateQuote.svg';
import { Portfolio } from '../../../modules/portfolio/types';
import { Profile } from '../../../modules/profile/types';
import { Quote } from '../../../modules/quote/types';
import { ContentFilter } from '../../../modules/types';


export type EndUserDashboardPagePresenterProps = EndUserDashboardPageProps & {
  customerQuotes?: Quote[] | null;
  userPortfolio?: Portfolio | null;
  profile: Profile | null;
};

const withPresenter = (
  View: React.FC<EndUserDashboardPageProps>,
): React.FC<EndUserDashboardPagePresenterProps> => {
  const Presenter: React.FC<EndUserDashboardPagePresenterProps> = (props) => {
    const {
      customerQuotes,
      userPortfolio,
      className,
      profile,
    } = props;
    const { t } = useTranslation();
    const history = useHistory();

    const quotesArray: DashboardCardProps[] = [];
    const applicationArray: DashboardCardProps[] = [];

    const checkQuoteStatus = ({ quoteExpiryDate, quoteId }: Quote): ContentFilter => {
      let isApplied;
      if (userPortfolio) {
        const { creditApps } = userPortfolio;
        isApplied = creditApps.some((el) => el.quoteId === quoteId);
      }
      if (isApplied) {
        return 'applied';
      }
      if (isExpired(quoteExpiryDate)) {
        return 'expired';
      }
      if (isExpiring(quoteExpiryDate)) {
        return 'expiring';
      }
      return 'active';
    };

    if (customerQuotes) {
      customerQuotes.sort((a, b) => {
        const createdDateA = new Date(createdOn(a.quoteExpiryDate));
        const createdDateB = new Date(createdOn(b.quoteExpiryDate));
        if (createdDateA < createdDateB) return 1;
        if (createdDateA > createdDateB) return -1;
        return 0;
      });

      customerQuotes.every((quote, index) => {
        const { applicationAmount, quoteId, asset, vendorName, contactBusinessName } = quote;
        const status: ContentFilter = checkQuoteStatus(quote);
        const quotesBlockProps: DashboardCardProps = {
          ...dashBoardCardProps,
          type: 'LeaseCard',
          statusText: {
            ...dashBoardCardProps.statusText,
            value: t(`application_page.status.${status}`),
          },
          assetNameText: {
            ...dashBoardCardProps.assetNameText,
            value: asset,
          },
          costText: {
            ...dashBoardCardProps.costText,
            value: formatAsCurrency(applicationAmount),
          },
          vendorNameText: {
            ...dashBoardCardProps.vendorNameText,
            value: vendorName ? contactBusinessName : '',
          },
          numberText: {
            ...dashBoardCardProps.numberText,
            value: quoteId,
          },
          button: {
            ...dashBoardCardProps.button,
            text: {
              ...dashBoardCardProps.button.text,
              value: t('customer_dashboard.view_button'),
            },
            onButtonClicked: () => {
              history.push(`/portal/quote/${quoteId}`);
            },
          },
        };
        quotesArray.push(quotesBlockProps);
        if (index === 2) {
          return false;
        }
        return true;
      });
      const createQuoteProps: DashboardCardProps = {
        ...dashBoardCardProps,
        type: 'CreateQuoteCard',
        image: {
          image: CreateQuote,
        },
        button: {
          ...dashBoardCardProps.button,
          text: {
            ...dashBoardCardProps.button.text,
            value: t('customer_dashboard.create_quote'),
          },
          onButtonClicked: () => {
            history.push('/portal/quote/getQuote');
          },
        },
      };
      quotesArray.push(createQuoteProps);
    }

    if (userPortfolio) {
      const { creditApps } = userPortfolio;
      creditApps.sort((a, b) => {
        const createdDateA = new Date(a.createdDate);
        const createdDateB = new Date(b.createdDate);
        if (createdDateA < createdDateB) return 1;
        if (createdDateA > createdDateB) return -1;
        return 0;
      });

      creditApps.every((application, index) => {
        const {
          asset, applicationAmount, creditAppNumber, creditStatus,
        } = application;
        const quote = customerQuotes?.find((quote) => quote.quoteId === application.quoteId);

        const applicationsBlockProps: DashboardCardProps = {
          ...dashBoardCardProps,
          type: 'LeaseCard',
          statusText: {
            ...dashBoardCardProps.statusText,
            value: creditStatus,
          },
          assetNameText: {
            ...dashBoardCardProps.assetNameText,
            value: asset,
          },
          costText: {
            ...dashBoardCardProps.costText,
            value: applicationAmount,
          },
          vendorNameText: {
            ...dashBoardCardProps.vendorNameText,
            value: quote?.vendorName ? quote.contactBusinessName : '',
          },
          numberText: {
            ...dashBoardCardProps.numberText,
            value: creditAppNumber,
          },
          button: {
            ...dashBoardCardProps.button,
            text: {
              ...dashBoardCardProps.button.text,
              value: t('customer_dashboard.view_button'),
            },
            onButtonClicked: () => {
              history.push(`/portal/application/${creditAppNumber}`);
            },
          },
        };
        applicationArray.push(applicationsBlockProps);
        if (index === 2) {
          return false;
        }
        return true;
      });
      const applyForFinance: DashboardCardProps = {
        ...dashBoardCardProps,
        type: 'CreateQuoteCard',
        image: {
          image: CreateQuote,
        },
        button: {
          ...dashBoardCardProps.button,
          text: {
            ...dashBoardCardProps.button.text,
            value: t('customer_dashboard.create_quote'),
          },
          onButtonClicked: () => {
            history.push('/portal/quote/getQuote');
          },
        },
      };
      applicationArray.push(applyForFinance);
    }

    const endUserDashboardPageProps: EndUserDashboardPageProps = {
      ...defaultProps,
      pageHeaderBlock: {
        ...defaultProps.pageHeaderBlock,
        blockHeader: {
          ...defaultProps.pageHeaderBlock.blockHeader,
          text: {
            ...defaultProps.pageHeaderBlock.blockHeader?.text,
            value: t('customer_dashboard.header', {
              name: profile?.name,
            }),
          },
        },
      },
      quotesBlock: {
        ...defaultProps.quotesBlock,
        blockHeader: {
          ...defaultProps.quotesBlock.blockHeader,
          text: {
            ...defaultProps.quotesBlock.blockHeader?.text,
            value: t('customer_dashboard.quotes_header'),
          },
          button: {
            ...defaultProps.quotesBlock.blockHeader?.button,
            text: {
              ...defaultProps.quotesBlock.blockHeader?.button?.text,
              value: t('customer_dashboard.see_all_button'),
            },
            onButtonClicked: () => {
              history.push('/portal/quotes');
            },
          },
        },
        dashboardCardList: {
          dashboardCards: quotesArray,
        },
      },
      applicationsBlock: {
        ...defaultProps.applicationsBlock,
        blockHeader: {
          ...defaultProps.applicationsBlock.blockHeader,
          text: {
            ...defaultProps.applicationsBlock.blockHeader?.text,
            value: t('customer_dashboard.applications_header'),
          },
          button: {
            ...defaultProps.applicationsBlock.blockHeader?.button,
            text: {
              ...defaultProps.applicationsBlock.blockHeader?.button?.text,
              value: t('customer_dashboard.see_all_button'),
            },
            onButtonClicked: () => {
              history.push('/portal/applications');
            },
          },
        },
        dashboardCardList: {
          dashboardCards: applicationArray,
        },
      },

    };

    return <View {...endUserDashboardPageProps} className={className}/>;
  };

  return Presenter;
};

export default withPresenter;
