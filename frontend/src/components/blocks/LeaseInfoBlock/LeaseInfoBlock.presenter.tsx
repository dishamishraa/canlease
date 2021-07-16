import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LeaseInfo } from "../../../modules/types";
import { LeaseInfoBlockProps, defaultProps } from './LeaseInfoBlock';
import { defaultProps as defaultQuoteDetailItemProps } from '../../molecules/QuoteDetailItem/QuoteDetailItem';
import { useTranslation } from "react-i18next";

export type LeaseInfoBlockPresenterProps = LeaseInfoBlockProps & {};

const withPresenter = (
  View: React.FC<LeaseInfoBlockProps>,
): React.FC<LeaseInfoBlockPresenterProps> => {
  const Presenter: React.FC<LeaseInfoBlockPresenterProps> = (props) => {

    const { state } = useLocation<LeaseInfo | undefined>();
    const { company, contactName, asset, vendor, lease } = state || {};
    
    const { t } = useTranslation();

    const { setStepperTotalValue } = props

    useEffect(() => {
      if (setStepperTotalValue){
        setStepperTotalValue(0);
      }
    }, [setStepperTotalValue])

    const blockHeading = {
      ...defaultProps.blockHeading,
      value: 'Test lease info block heading'
    };

    const dateFormatOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: '2-digit'};
    const leaseStartDate = new Date(lease?.leaseStartDate ?? '').toLocaleDateString('en-CA', dateFormatOptions);
    const leaseOptionMonth =  new Date(lease?.purchaseOptionDate ?? '').toLocaleString('default', { month: 'long' });
    const leaseOptionDate = new Date(lease?.purchaseOptionDate ?? '').toLocaleDateString('en-CA', dateFormatOptions);

    const leaseDetailsSection = {
      detailItemList: {
        quoteDetailItems: [
          {
            labelText: {
              ...defaultQuoteDetailItemProps.labelText,
              value: t('lease_info_block.customer_company_name')
            },
            infoText: {
              ...defaultQuoteDetailItemProps.infoText,
              value: company,
            }
          },
          {
            labelText: {
              ...defaultQuoteDetailItemProps.labelText,
              value: t('lease_info_block.customer_contact_name')
            },
            infoText: {
              ...defaultQuoteDetailItemProps.infoText,
              value: contactName,
            }
          },
          {
            labelText: {
              ...defaultQuoteDetailItemProps.labelText,
              value: t('lease_info_block.leased_asset')
            },
            infoText: {
              ...defaultQuoteDetailItemProps.infoText,
              value: asset,
            }
          },
          {
            labelText: {
              ...defaultQuoteDetailItemProps.labelText,
              value: t('lease_info_block.vendor_name')
            },
            infoText: {
              ...defaultQuoteDetailItemProps.infoText,
              value: vendor,
            }
          },
          {
            labelText: {
              ...defaultQuoteDetailItemProps.labelText,
              value: t('lease_info_block.lease_number')
            },
            infoText: {
              ...defaultQuoteDetailItemProps.infoText,
              value: lease?.leaseNumber,
            }
          },
          {
            labelText: {
              ...defaultQuoteDetailItemProps.labelText,
              value: t('lease_info_block.lease_term')
            },
            infoText: {
              ...defaultQuoteDetailItemProps.infoText,
              value: lease?.fullTerm,
            }
          },
          {
            labelText: {
              ...defaultQuoteDetailItemProps.labelText,
              value: t('lease_info_block.monthly_payment')
            },
            infoText: {
              ...defaultQuoteDetailItemProps.infoText,
              value: lease?.paymentBeforeTax
            }
          },
          {
            labelText: {
              ...defaultQuoteDetailItemProps.labelText,
              value: t('lease_info_block.total_amount')
            },
            infoText: {
              ...defaultQuoteDetailItemProps.infoText,
              value: lease?.fullTerm,
            }
          },
          {
            labelText: {
              ...defaultQuoteDetailItemProps.labelText,
              value: t('lease_info_block.lease_start_date')
            },
            infoText: {
              ...defaultQuoteDetailItemProps.infoText,
              value: leaseStartDate,
            }
          },
          {
            labelText: {
              ...defaultQuoteDetailItemProps.labelText,
              value: t('lease_info_block.purchase_option_month')
            },
            infoText: {
              ...defaultQuoteDetailItemProps.infoText,
              value: leaseOptionMonth
            }
          },
          {
            labelText: {
              ...defaultQuoteDetailItemProps.labelText,
              value: t('lease_info_block.purchase_option_date')
            },
            infoText: {
              ...defaultQuoteDetailItemProps.infoText,
              value: leaseOptionDate
            }
          },
          {
            labelText: {
              ...defaultQuoteDetailItemProps.labelText,
              value: t('lease_info_block.purchase_option_amount')
            },
            infoText: {
              ...defaultQuoteDetailItemProps.infoText,
              value: lease?.optionAmount
            }
          },
          {
            labelText: {
              ...defaultQuoteDetailItemProps.labelText,
              value: t('lease_info_block.quote_id')
            },
            infoText: {
              ...defaultQuoteDetailItemProps.infoText,
              value: lease?.quoteId
            }
          },
        ]
      }
    };

    return (
      <View
        blockHeading={blockHeading}
        leaseDetailsSection={leaseDetailsSection}
        {...props}
        />
    )
  }
  return Presenter;
}

export default withPresenter;