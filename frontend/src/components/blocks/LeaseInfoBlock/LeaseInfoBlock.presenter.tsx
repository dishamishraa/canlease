import React from 'react';
import { useTranslation } from 'react-i18next';
import { Quote } from '../../../modules/quote/types';
import { TextProps } from '../../atoms/Text';
import { defaultProps as defaultQuoteDetailItemProps } from '../../molecules/QuoteDetailItem/QuoteDetailItem';
import { defaultProps, LeaseInfoBlockProps } from './LeaseInfoBlock';

export type LeaseInfoBlockPresenterProps = LeaseInfoBlockProps & {
  quoteDetails: Quote | null;
};
const withPresenter = (
  View: React.FC<LeaseInfoBlockProps>,
): React.FC<LeaseInfoBlockPresenterProps> => {
  const Presenter: React.FC<LeaseInfoBlockPresenterProps> = (props) => {
    const {
      quoteDetails
    } = props;

    const { t } = useTranslation();

    const blockHeading = {
      ...defaultProps.blockHeading,
      value: t('lease_info_block.header'),
    };

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
              value: quoteDetails?.contactBusinessName,
            },
          },
          {
            labelText: {
              ...defaultLabelTextProps,
              value: t('lease_info_block.customer_contact_name'),
            },
            infoText: {
              ...defaultInfoTextProps,
              value: quoteDetails?.contactName,
            },
          },
          {
            labelText: {
              ...defaultLabelTextProps,
              value: t('lease_info_block.leased_asset'),
            },
            infoText: {
              ...defaultInfoTextProps,
              value: quoteDetails?.asset,
            },
          },
          {
            labelText: {
              ...defaultLabelTextProps,
              value: t('lease_info_block.vendor_name'),
            },
            infoText: {
              ...defaultInfoTextProps,
              value: quoteDetails?.vendorName ? quoteDetails.vendorName : "No vendor",
            },
          },
          {
            labelText: {
              ...defaultLabelTextProps,
              value: t('lease_info_block.total_amount'),
            },
            infoText: {
              ...defaultInfoTextProps,
              value: `$${quoteDetails?.applicationAmount}`,
            },
          },
          {
            labelText: {
              ...defaultLabelTextProps,
              value: t('lease_info_block.quote_id'),
            },
            infoText: {
              ...defaultInfoTextProps,
              value: quoteDetails?.quoteId,
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
