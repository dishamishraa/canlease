/* eslint-disable default-case */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { QuoteRateSectionProps } from '../../organisms/QuoteRateSection';
import { QuoteBlockProps, defaultProps } from './QuoteBlock';
import { RateCardProps, defaultProps as defaultRateCardProps } from '../../molecules/RateCard/RateCard';
import { ModalProps, defaultProps as modalPropsDefaultProps } from '../../organisms/Modal/Modal';
import QuoteSentIcon from '../../../resources/icons/QuoteSentIllustration.svg';
import EmailIcon from '../../../resources/icons/Email.svg';
import {
  QuoteDetailItemProps,
  defaultProps as defaultQuoteDetailItemProps,
} from '../../molecules/QuoteDetailItem/QuoteDetailItem';

import { defaultProps as defaultRateDetailItemProps } from '../../molecules/RateDetailItem/RateDetailItem';
import { Quote, SendQuote } from '../../../modules/quote/types';
import { ContactInfo, ContentTypeTabs } from '../../../modules/types';
import { APIResponse } from '../../../lib/api/types';
import { sendQuote } from '../../../modules/quote/api';
import {
  convertMonth,
  getStretchMonth,
  isExpired,
  updateInstaQuoteCookie,
} from '../../../lib/utils';

import addLinksAndBreaks from '../../../lib/reactUtils';

export type QuoteBlockPresenterProps = QuoteBlockProps & {
  quote: Quote | null;
  error?: Error;
  loading: boolean;
  sendQuote?: (payload: SendQuote) => Promise<APIResponse<void>>;
};

const withPresenter = (
  View: React.FC<QuoteBlockProps>,
): React.FC<QuoteBlockPresenterProps> => {
  const Presenter: React.FC<QuoteBlockPresenterProps> = (props) => {
    const {
      loading,
      error,
      contactInfo,
      quote,
      flowType,
      quoteUserType,
    } = props;

    const history = useHistory();
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const [, setCookie, removeCookie] = useCookies();

    if (error) {
      // return error view
    }

    if (loading) {
      // return loading view
    }

    const onCloseModal = () => {
      setShowModal(false);
      if (flowType === 'instaQuote') {
        history.push('/account/signin');
      } else {
         history.push('/portal/quotes');
      }
    };

    const onSimpleCloseModal = () => {
      setShowModal(false);
    };

    const modal: ModalProps = {
      ...modalPropsDefaultProps,
      closeIcon: {
        ...modalPropsDefaultProps.closeIcon,
        onIconClicked: onCloseModal,
      },
      image: {
        image: flowType === 'instaQuote'? EmailIcon : QuoteSentIcon,
      },
      titleText: {
        ...modalPropsDefaultProps.titleText,
        value: flowType === 'instaQuote'? t('quote_email_sent.title') : t('quote_confirmation.header'),
      },
      descriptionText: {
        ...modalPropsDefaultProps.descriptionText,
        value: flowType === 'instaQuote'? t('quote_email_sent.description') : t('quote_confirmation.description'),
      },
      primaryButton: {
        ...modalPropsDefaultProps.primaryButton,
        text: {
          ...modalPropsDefaultProps.primaryButton.text,
          value: flowType === 'instaQuote'? t('quote_email_sent.primary_button') : t('quote_confirmation.button'),
        },
        onButtonClicked: onCloseModal,
      },
      secondaryButton: {
        ...modalPropsDefaultProps.secondaryButton,
        text: {
          ...modalPropsDefaultProps.secondaryButton.text,
          value: flowType === 'instaQuote'? t('quote_email_sent.secondary_button') : t('')
        },
        onButtonClicked: onSimpleCloseModal,
        visible: flowType === 'instaQuote'
      },

    };


    const handleApplyForFinance = (tab: ContentTypeTabs) => () => {
      switch (flowType) {
        case 'instaQuote':
          updateInstaQuoteCookie({ action: 'apply_finance_personal' }, setCookie, removeCookie);
          history.push('/account/signin');
          break;
        case 'createQuote':
          if (quote) {
            history.push(`/portal/application/applyQuote/${quote.quoteId}`, { fromTab: tab });
          }
          break;
      }
    };

    const handleSaveQuote = () => {
      updateInstaQuoteCookie({ action: 'save_quote' }, setCookie, removeCookie);
      handleSendQuote();
    };

    const getSubmittedBy = (info: ContactInfo) => {
      if (info.type === 'vendor') {
        return `${info.vendorName} (${info.businessEmail})`;
      }
      return `${info.customerName} (${info.customerEmail}`;
    };

    const handleSendQuote = async () => {
      if (quote && contactInfo) {
        await sendQuote({
          companyName: contactInfo.customerCompanyName,
          submittedBy: getSubmittedBy(contactInfo),
          email: contactInfo.customerEmail,
          quoteId: quote?.quoteId,
        });
        setShowModal(true);
      } else {
        if (quote && !contactInfo) {
          await sendQuote({
            companyName: quote.contactBusinessName,
            submittedBy: `${quote.vendorName} (${quote.vendorEmail})`,
            email: quote.contactEmail,
            quoteId: quote?.quoteId,
          });
          await sendQuote({
            companyName: quote.contactBusinessName,
            submittedBy: `${quote.vendorName} (${quote.vendorEmail}`,
            email: quote.vendorEmail,
            quoteId: quote.quoteId,
          });
          setShowModal(true);
        }
      }
    };

    const quoteExpired = quote ? isExpired(quote?.quoteExpiryDate) : true;

    let quoteDetailItems: QuoteDetailItemProps[] = [];
    let rateCards: RateCardProps[] = [];
    const termDetailItemArray: QuoteDetailItemProps[] = [];

    if (quote) {
      // quote rate section
      const {
        applicationAmount, asset, quoteId, leaseType,
      } = quote;

      const detailsLineItems: {label: string; value: string }[] = [
        {
          label: t('view_quote.quote_detail.application_amount.label'),
          value: t('view_quote.quote_detail.application_amount.value', {
            applicationAmount,
          }),
        },
        {
          label: t('view_quote.quote_detail.equipment_label'),
          value: asset,
        },
        {
          label: t('view_quote.quote_detail.quote_id_label'),
          value: quoteId,
        },
      ];

      quoteDetailItems = detailsLineItems.map(({ label, value }): QuoteDetailItemProps => ({
        ...defaultQuoteDetailItemProps,
        labelText: {
          ...defaultQuoteDetailItemProps.labelText,
          value: label,
        },
        infoText: {
          ...defaultQuoteDetailItemProps.infoText,
          value,
        },
      }));

      // generate rate cards props
      rateCards = quote.quoteOptions.map((quoteOption): RateCardProps => {
        const {
          term: termString, monthlyAmount, financeRate,
        } = quoteOption;
        const term = convertMonth(termString);
        return {
          ...defaultRateCardProps,
          rateDetailItemList: {
            ...defaultRateCardProps.rateDetailItemList,
            rateDetailItems: [
              {
                type: 'PerMonth',
                suffixText: {
                  ...defaultRateDetailItemProps.suffixText,
                  value: t('view_quote.rate_card.rate_suffix'),
                },
                numberText: {
                  ...defaultRateDetailItemProps.numberText,
                  value: `$${monthlyAmount}`,
                },
              },
              {
                type: 'PerMonth',
                suffixText: {
                  ...defaultRateDetailItemProps.suffixText,
                  value: t('view_quote.rate_card.months_suffix'),
                },
                numberText: {
                  ...defaultRateDetailItemProps.numberText,
                  value: (leaseType === 'stretch')
                    ? getStretchMonth(term)
                    : term,
                },
              },
              {
                type: 'PerMonth',
                suffixText: {
                  ...defaultRateDetailItemProps.suffixText,
                  value: t('view_quote.rate_card.cost_suffix'),
                },
                numberText: {
                  ...defaultRateDetailItemProps.numberText,
                  value: `${financeRate}%`,
                },
              },
              {
                type: 'Text',
                suffixText: {
                  ...defaultRateDetailItemProps.suffixText,
                  value: (leaseType === 'stretch')
                    ? t('view_quote.rate_card.stretch_purchase_term', { purchaseOptionMonths: term })
                    : t('view_quote.rate_card.ten_dollar_purchase_term'),
                },
              },
            ],
          },
        };
      });

      // lease terms
      let totalLines = 0;
      let baseKey = '';

      switch (leaseType) {
        case 'stretch':
          totalLines = 4;
          baseKey = 'view_quote.term_detail.stretch.term';
          break;
        case '$10':
          totalLines = 3;
          baseKey = 'view_quote.term_detail.ten_dollar.term';
          break;
        default:
          break;
      }

      for (let i = 1; i <= totalLines; i += 1) {
        const quoteDetailItem: QuoteDetailItemProps = {
          labelText: {
            ...defaultQuoteDetailItemProps.labelText,
            value: `${i}.`,
          },
          infoText: {
            ...defaultQuoteDetailItemProps.infoText,
            value: t(`${baseKey}_${i}`),
          },
        };
        termDetailItemArray.push(quoteDetailItem);
      }
    }

    const quoteRateSectionProps: QuoteRateSectionProps = {
      text: {
        ...defaultProps.quoteRateSection.text,
        value: t('view_quote.quote_rate_section_heading_text'),
      },
      detailItemList: {
        ...defaultProps.detailItemList,
        quoteDetailItems,
      },
      rateCardList: {
        rateCards,
      },
    };

    const quoteBlockProps: QuoteBlockProps = {
      ...defaultProps,
      quoteRateSection: quoteRateSectionProps,
      blockHeading: {
        ...defaultProps.blockHeading,
        value: t('view_quote.heading_text'),
      },
      disclaimerText: {
        ...defaultProps.disclaimerText,
        value: t('view_quote.disclaimer_text'),
      },
      validText: {
        ...defaultProps.validText,
        value: t('view_quote.valid_text'),
      },
      learnMoreText: {
        ...defaultProps.learnMoreText,
        value: addLinksAndBreaks(t('view_quote.learn_more_text')),
      },
      quoteExpired,
      expiryToast: {
        ...defaultProps.expiryToast,
        text: {
          ...defaultProps.expiryToast.text,
          value: t('view_quote.expiry_toast.message'),
        },
      },
      detailItemList: {
        ...defaultProps.detailItemList,
        quoteDetailItems: termDetailItemArray,
      },
    };

    if (quoteUserType === 'vendor') {
      quoteBlockProps.sendQuoteButton = {
        ...defaultProps.sendQuoteButton,
        text: {
          ...defaultProps.sendQuoteButton.text,
          value: t('view_quote.send_quote_button_text'),
        },
        onButtonClicked: handleSendQuote,
        disabled: quoteExpired,
      };
    } else {
      quoteBlockProps.applyButton = {
        ...defaultProps.applyButton,
        text: {
          ...defaultProps.applyButton.text,
          value: t('view_quote.apply_button_text'),
        },
        onButtonClicked: handleApplyForFinance('Personal'),
        disabled: quoteExpired,
      };

      if (flowType === 'instaQuote') {
        quoteBlockProps.saveQuoteButton = {
          ...defaultProps.saveQuoteButton,
          text: {
            ...defaultProps.saveQuoteButton.text,
            value: t('view_quote.save_quote_button_text'),
          },
          onButtonClicked: handleSaveQuote,
          disabled: quoteExpired,
        };
      }
    }

    return (
      <View {...props} {...quoteBlockProps} modal={modal} showModal={showModal} />
    );
  };

  return Presenter;
};

export default withPresenter;
