import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LeaseInfo } from "../../../modules/types";
import { LeaseInfoBlockProps, defaultProps } from './LeaseInfoBlock';
import { defaultProps as defaultQuoteDetailItemProps } from '../../molecules/QuoteDetailItem/QuoteDetailItem';
import { useTranslation } from "react-i18next";
import { TextProps } from "../../atoms/Text";

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
      value: t('lease_info_block.header'),
    };

    const dateFormatOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: '2-digit'};
    const leaseStartDate = new Date(lease?.leaseStartDate ?? '').toLocaleDateString('en-CA', dateFormatOptions);
    const leaseOptionMonth =  new Date(lease?.purchaseOptionDate ?? '').toLocaleString('default', { month: 'long' });
    const leaseOptionDate = new Date(lease?.purchaseOptionDate ?? '').toLocaleDateString('en-CA', dateFormatOptions);

    const defaultLabelTextProps: TextProps = {...defaultQuoteDetailItemProps.labelText, type: 'Paragraph2'};
    const defaultInfoTextProps: TextProps = {...defaultQuoteDetailItemProps.infoText, type: 'Paragraph3'};

    const leaseDetailsSection = {
      detailItemList: {
        quoteDetailItems: [
          {
            labelText: {
              ...defaultLabelTextProps,
              value: t('lease_info_block.customer_company_name'),
            },
            infoText: {
              ...defaultInfoTextProps,
              value: company,
            }
          },
          {
            labelText: {
              ...defaultLabelTextProps,
              value: t('lease_info_block.customer_contact_name'),
            },
            infoText: {
              ...defaultInfoTextProps,
              value: contactName,
            }
          },
          {
            labelText: {
              ...defaultLabelTextProps,
              value: t('lease_info_block.leased_asset'),
            },
            infoText: {
              ...defaultInfoTextProps,
              value: asset,
            }
          },
          {
            labelText: {
              ...defaultLabelTextProps,
              value: t('lease_info_block.vendor_name'),
            },
            infoText: {
              ...defaultInfoTextProps,
              value: vendor,
            }
          },
          {},
          {
            labelText: {
              ...defaultLabelTextProps,
              value: t('lease_info_block.lease_number'),
            },
            infoText: {
              ...defaultInfoTextProps,
              value: lease?.leaseNumber,
            }
          },
          {
            labelText: {
              ...defaultLabelTextProps,
              value: t('lease_info_block.lease_term'),
            },
            infoText: {
              ...defaultInfoTextProps,
              value: `${lease?.fullTerm} Months`,
            }
          },
          {
            labelText: {
              ...defaultLabelTextProps,
              value: t('lease_info_block.monthly_payment'),
            },
            infoText: {
              ...defaultInfoTextProps,
              value: `$${lease?.paymentBeforeTax}`
            }
          },
          {
            labelText: {
              ...defaultLabelTextProps,
              value: t('lease_info_block.total_amount'),
            },
            infoText: {
              ...defaultInfoTextProps,
              value: `$${lease?.fullTerm}`,
            }
          },
          {},
          {
            labelText: {
              ...defaultLabelTextProps,
              value: t('lease_info_block.lease_start_date'),
            },
            infoText: {
              ...defaultInfoTextProps,
              value: leaseStartDate,
            }
          },
          {
            labelText: {
              ...defaultLabelTextProps,
              value: t('lease_info_block.purchase_option_month'),
            },
            infoText: {
              ...defaultInfoTextProps,
              value: leaseOptionMonth,
            }
          },
          {
            labelText: {
              ...defaultLabelTextProps,
              value: t('lease_info_block.purchase_option_date'),
            },
            infoText: {
              ...defaultInfoTextProps,
              value: leaseOptionDate,
            }
          },
          {
            labelText: {
              ...defaultLabelTextProps,
              value: t('lease_info_block.purchase_option_amount'),
            },
            infoText: {
              ...defaultInfoTextProps,
              value: `$${lease?.optionAmount}`,
            }
          },
          {},
          {
            labelText: {
              ...defaultLabelTextProps,
              value: t('lease_info_block.quote_id'),
            },
            infoText: {
              ...defaultInfoTextProps,
              value: lease?.quoteId,
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