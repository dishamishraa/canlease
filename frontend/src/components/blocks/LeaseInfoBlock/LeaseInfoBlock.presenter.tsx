import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LeaseInfo } from '../../../modules/types';
import { LeaseInfoBlockProps, defaultProps } from './LeaseInfoBlock';
import { defaultProps as defaultQuoteDetailItemProps } from '../../molecules/QuoteDetailItem/QuoteDetailItem';
import { TextProps } from '../../atoms/Text';

export type LeaseInfoBlockPresenterProps = LeaseInfoBlockProps & {};

const withPresenter = (
  View: React.FC<LeaseInfoBlockProps>,
): React.FC<LeaseInfoBlockPresenterProps> => {
  const Presenter: React.FC<LeaseInfoBlockPresenterProps> = (props) => {
    const { state } = useLocation<LeaseInfo | undefined>();
    const { application, lease } = state || {};

    const { t } = useTranslation();

    const blockHeading = {
      ...defaultProps.blockHeading,
      value: t('lease_info_block.header'),
    };

    const placeholderText = ' - ';

    let leaseStartDate = placeholderText;
    let leaseOptionMonth = placeholderText;
    let leaseOptionDate = placeholderText;
    let vendorName = placeholderText;
    let leaseNumber = placeholderText;
    let termInMonths = placeholderText;
    let paymentBeforeTax = placeholderText;
    let optionAmount = placeholderText;

    if (lease) {
      vendorName = lease.vendorName;
      leaseNumber = lease.leaseNumber;
      termInMonths = t('lease_info_block.term_in_months', { months: lease?.fullTerm });
      paymentBeforeTax = `$${lease?.paymentBeforeTax}`;
      optionAmount = `$${lease?.optionAmount}`;

      const dateFormatOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: '2-digit' };
      leaseStartDate = new Date(lease?.leaseStartDate ?? '').toLocaleDateString('en-CA', dateFormatOptions);
      leaseOptionMonth = new Date(lease?.purchaseOptionDate ?? '').toLocaleString('default', { month: 'long' });
      leaseOptionDate = new Date(lease?.purchaseOptionDate ?? '').toLocaleDateString('en-CA', dateFormatOptions);
    }

    const defaultLabelTextProps: TextProps = { ...defaultQuoteDetailItemProps.labelText, type: 'Paragraph2' };
    const defaultInfoTextProps: TextProps = { ...defaultQuoteDetailItemProps.infoText, type: 'Paragraph3' };

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
              value: application?.companyName,
            },
          },
          {
            labelText: {
              ...defaultLabelTextProps,
              value: t('lease_info_block.customer_contact_name'),
            },
            infoText: {
              ...defaultInfoTextProps,
              value: application?.name,
            },
          },
          {
            labelText: {
              ...defaultLabelTextProps,
              value: t('lease_info_block.leased_asset'),
            },
            infoText: {
              ...defaultInfoTextProps,
              value: application?.asset,
            },
          },
          {
            labelText: {
              ...defaultLabelTextProps,
              value: t('lease_info_block.vendor_name'),
            },
            infoText: {
              ...defaultInfoTextProps,
              value: vendorName,
            },
          },
          {},
          {
            labelText: {
              ...defaultLabelTextProps,
              value: t('lease_info_block.lease_number'),
            },
            infoText: {
              ...defaultInfoTextProps,
              value: leaseNumber,
            },
          },
          {
            labelText: {
              ...defaultLabelTextProps,
              value: t('lease_info_block.lease_term'),
            },
            infoText: {
              ...defaultInfoTextProps,
              value: termInMonths,
            },
          },
          {
            labelText: {
              ...defaultLabelTextProps,
              value: t('lease_info_block.monthly_payment'),
            },
            infoText: {
              ...defaultInfoTextProps,
              value: paymentBeforeTax,
            },
          },
          {
            labelText: {
              ...defaultLabelTextProps,
              value: t('lease_info_block.total_amount'),
            },
            infoText: {
              ...defaultInfoTextProps,
              value: `$${application?.applicationAmount}`,
            },
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
            },
          },
          {
            labelText: {
              ...defaultLabelTextProps,
              value: t('lease_info_block.purchase_option_month'),
            },
            infoText: {
              ...defaultInfoTextProps,
              value: leaseOptionMonth,
            },
          },
          {
            labelText: {
              ...defaultLabelTextProps,
              value: t('lease_info_block.purchase_option_date'),
            },
            infoText: {
              ...defaultInfoTextProps,
              value: leaseOptionDate,
            },
          },
          {
            labelText: {
              ...defaultLabelTextProps,
              value: t('lease_info_block.purchase_option_amount'),
            },
            infoText: {
              ...defaultInfoTextProps,
              value: optionAmount,
            },
          },
          {},
          {
            labelText: {
              ...defaultLabelTextProps,
              value: t('lease_info_block.quote_id'),
            },
            infoText: {
              ...defaultInfoTextProps,
              value: application?.quoteId,
            },
          },
        ],
      },
    };

    return (
      <View
        blockHeading={blockHeading}
        leaseDetailsSection={leaseDetailsSection}
        {...props}
        />
    );
  };
  return Presenter;
};

export default withPresenter;
