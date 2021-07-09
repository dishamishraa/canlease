import React, { useEffect, useState } from 'react';
import { EndUserDashboardPageProps, defaultProps } from './EndUserDashboardPage';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Portfolio, Quote, Profile } from '../../../modules/types';
import { DashboardCardProps, defaultProps as dashBoardCardProps } from '../../molecules/DashboardCard/DashboardCard';
import { isExpiring, isExpired, createdOn} from '../../../lib/utils';
import CreateQuote from '../../../resources/icons/CreateQuote.svg';

export type EndUserDashboardPagePresenterProps = EndUserDashboardPageProps & {
    customerQuotes?: Quote[] | null,
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


      const checkQuoteStatus = (quoteExpiryDate, quoteId) => {
        let isApplied;
        if (userPortfolio) {
            const { createApps } = userPortfolio
            isApplied = createApps.some(function(el) {
                return el.quoteId === quoteId;
            })
        }
        if(isApplied){
            return t('application_page.status.applied')
        }
        else if (isExpired(quoteExpiryDate)) {
            return  t('application_page.status.expired')
        }
        else if(isExpiring(quoteExpiryDate)){
            return t('application_page.status.expiring_soon')
        } else {
            return t('application_page.status.active')
        }
     }

      if (customerQuotes){
        customerQuotes.sort(function(a,b) {
            const createdDateA = new Date(createdOn(a.quoteExpiryDate));
            const createdDateB = new Date(createdOn(b.quoteExpiryDate));
            if (createdDateA < createdDateB) return 1;
            if (createdDateA > createdDateB) return -1;
            return 0;
        });
       
        customerQuotes.every((quote, index) => {
            const {applicationAmount, quoteExpiryDate, quoteId, asset} = quote
            const quotesBlockProps: DashboardCardProps = {
                ...dashBoardCardProps,
                type:"LeaseCard",
                statusText: {
                    ...dashBoardCardProps.statusText,
                    value: checkQuoteStatus(quoteExpiryDate, quoteId),
                },
                assetNameText:{
                  ...dashBoardCardProps.assetNameText,
                  value: asset,
                },
                costText:{
                  ...dashBoardCardProps.costText,
                  value: applicationAmount,
                },
                vendorNameText:{
                    ...dashBoardCardProps.vendorNameText,
                    value: "vendor name"
                },
                numberText: {
                    ...dashBoardCardProps.numberText,
                    value: quoteId
                },
                button: {
                  ...dashBoardCardProps.button,
                  text: {
                    ...dashBoardCardProps.button.text,
                    value: t('customer_dashboard.view_button'),
                  },
                  onButtonClicked: () => {
                    history.push(`/portal/content/quote/${quoteId}`)
                  }
                }
            }
            quotesArray.push(quotesBlockProps);
            if (index == 2) {
              return false 
            }
            return true
        })
        const createQuoteProps: DashboardCardProps = {
            ...dashBoardCardProps,
            type:"CreateQuoteCard",
            image:{
                image: CreateQuote,
            },
            button: {
                ...dashBoardCardProps.button,
                text: {
                  ...dashBoardCardProps.button.text,
                  value: t('customer_dashboard.create_quote'),
                },
                onButtonClicked: () => {
                  //TODO create quote from dashboard
                }
            }
        }
        quotesArray.push(createQuoteProps);
      }
      
      if (userPortfolio){
        const { createApps } = userPortfolio
        createApps.sort(function(a,b) {
            const createdDateA = new Date(a.createdDate);
            const createdDateB = new Date(b.createdDate);
            if (createdDateA < createdDateB) return 1;
            if (createdDateA > createdDateB) return -1;
            return 0;
        });

        createApps.every((application, index) => {
            const { asset, applicationAmount, creditAppNumber, creditStatus } = application;
         
            const applicationsBlockProps: DashboardCardProps = {
                ...dashBoardCardProps,
                type:"LeaseCard",
                statusText: {
                    ...dashBoardCardProps.statusText,
                    value: creditStatus,
                },
                assetNameText:{
                  ...dashBoardCardProps.assetNameText,
                  value: asset,
                },
                costText:{
                  ...dashBoardCardProps.costText,
                  value: applicationAmount,
                },
                vendorNameText:{
                    ...dashBoardCardProps.vendorNameText,
                    value: "vendor name"
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
                    //TODO view application
                  }
                }
            }
            applicationArray.push(applicationsBlockProps);
            if (index == 2) {
              return false 
            }
            return true
        }) 
        const applyForFinance: DashboardCardProps = {
            ...dashBoardCardProps,
            type:"CreateQuoteCard",
            image:{
                image: ""
            },
            button: {
                ...dashBoardCardProps.button,
                text: {
                  ...dashBoardCardProps.button.text,
                  value: t('customer_dashboard.apply_finance'),
                },
                onButtonClicked: () => {
                  //TODO apply for finance from dashboard
                }
            }
        }
        applicationArray.push(applyForFinance);
      }
      

      const endUserDashboardPageProps: EndUserDashboardPageProps ={
        ...defaultProps,
        pageHeaderBlock: {
            ...defaultProps.pageHeaderBlock,
            blockHeader: {
                ...defaultProps.pageHeaderBlock.blockHeader,
              text: {
                ...defaultProps.pageHeaderBlock.blockHeader?.text,
                value: t('customer_dashboard.header', {
                    name: profile?.name,
                })
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
                  history.push('/portal/content/list/1', {contentType: "quotes"})
                }
              },
            },
            dashboardCardList: {
                dashboardCards: quotesArray,
            },
          },
        applicationsBlock:{
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
                  history.push('/portal/content/list/1', {contentType: "applications"})
                }
              },
            },
            dashboardCardList: {
                dashboardCards: applicationArray,
            },
        }

      }

      return <View
          {...endUserDashboardPageProps}
          className={className}/>;
  };
  return Presenter;
};
export default withPresenter;