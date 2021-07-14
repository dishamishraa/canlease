import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { QuoteRateSectionProps } from '../../organisms/QuoteRateSection';
import { QuoteBlockProps, defaultProps } from './QuoteBlock';
import { addLinksAndBreaks } from '../../../lib/reactUtils';
import { QuoteDetailItemProps, defaultProps as defaultQuoteDetailItemProps } from '../../molecules/QuoteDetailItem/QuoteDetailItem';
import { RateCardProps, defaultProps as defaultRateCardProps } from '../../molecules/RateCard/RateCard';
import { ModalProps, defaultProps as modalPropsDefaultProps } from '../../organisms/Modal/Modal';
import EmailIcon from '../../../resources/icons/Email.svg';

import { defaultProps as defaultRateDetailItemProps } from '../../molecules/RateDetailItem/RateDetailItem';
import { Quote, SendQuote } from '../../../modules/quote/types';
import { TermDisplay } from '../../../modules/types';
import { isExpired } from '../../../lib/utils';
import { APIResponse } from '../../../lib/api/types';
import { sendQuote } from '../../../modules/quote/api';
import { INSTANT_QUOTE_COOKIE } from '../../../lib/config';
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';

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
    };

    const modal: ModalProps = {
      ...modalPropsDefaultProps,
      closeIcon: {
        ...modalPropsDefaultProps.closeIcon,
        onIconClicked: onCloseModal,
      },
      image: {
        image: EmailIcon,
      },
      titleText: {
        ...modalPropsDefaultProps.titleText,
        value: t('quote_email_sent.title'),
      },
      descriptionText: {
        ...modalPropsDefaultProps.descriptionText,
        value: t('quote_email_sent.description'),
      },
      primaryButton: {
        ...modalPropsDefaultProps.primaryButton,
        text: {
          ...modalPropsDefaultProps.primaryButton.text,
          value: t('quote_email_sent.primary_button'),
        },
      },
      secondaryButton: {
        ...modalPropsDefaultProps.secondaryButton,
        text: {
          ...modalPropsDefaultProps.secondaryButton.text,
          value: t('quote_email_sent.secondary_button'),
        },
        onButtonClicked: onCloseModal,
      },
    };

    const handleApplyForFinance = () => {
      if(flowType === 'instaQuote') {
        const quoteCookie = Cookies.get(INSTANT_QUOTE_COOKIE);
        let quoteCookieObj;
        if (quoteCookie){
          quoteCookieObj = JSON.parse(quoteCookie)
        }
        removeCookie(INSTANT_QUOTE_COOKIE);
        setCookie(INSTANT_QUOTE_COOKIE, {...quoteCookieObj, "action": "apply_finance"}, { expires: new Date(quoteCookieObj.expires) });
        history.push('/account/signin');
      } else {
        // TODO
        history.push('/portal/applications');
      }
    };

    const handleSaveQuote = () => {
      const quoteCookie = Cookies.get(INSTANT_QUOTE_COOKIE);
      let quoteCookieObj;
      if (quoteCookie){
        quoteCookieObj = JSON.parse(quoteCookie)
      }
      removeCookie(INSTANT_QUOTE_COOKIE);
      setCookie(INSTANT_QUOTE_COOKIE, {...quoteCookieObj, "action": "save_quote"}, { expires: new Date(quoteCookieObj.expires) });
      history.push('/account/signin');
    };

    const handleSendQuote = async () => {
      if(quote) {
        await sendQuote({
          email: '', // TODO
          quoteId: quote?.quoteId,
        });
        setShowModal(true);
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

      const detailsLineItems: {label: string, value: string }[] = [
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

      quoteDetailItems = detailsLineItems.map(({ label, value }): QuoteDetailItemProps => {
        return {
          ...defaultQuoteDetailItemProps,
          labelText: {
            ...defaultQuoteDetailItemProps.labelText,
            value: label,
          },
          infoText: {
            ...defaultQuoteDetailItemProps.infoText,
            value: value,
          },
        }
      });

      // generate rate cards props
      rateCards = quote.quoteOptions.map((quoteOption): RateCardProps => {
        const {
          term, monthlyAmount, financeRate, purchaseOptionDate,
        } = quoteOption;

        const purchaseOptionDuration = new Date(purchaseOptionDate).getTime() - Date.now();
        const totalMonths = Math.round(purchaseOptionDuration / (30 * 24 * 60 * 60 * 1000));

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
                  value: TermDisplay[term],
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
                    ? t('view_quote.rate_card.stretch_purchase_term', { purchaseOptionDate: totalMonths })
                    : t('view_quote.rate_card.ten_dollar_purchase_term'),
                },
              },
            ],
          },
        }
      })

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
      for (let i = 1; i <= totalLines; i++) {
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
      }
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
      quoteExpired: quoteExpired,
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

    if(quoteUserType === 'vendor') {
      quoteBlockProps.sendQuoteButton = {
        ...defaultProps.sendQuoteButton,
        text: {
          ...defaultProps.sendQuoteButton.text,
          value: t('view_quote.send_quote_button_text'),
        },
        onButtonClicked: handleSendQuote,
        disabled: quoteExpired,
      }
    } else {
      quoteBlockProps.applyButton = {
        ...defaultProps.applyButton,
        text: {
          ...defaultProps.applyButton.text,
          value: t('view_quote.apply_button_text'),
        },
        onButtonClicked: handleApplyForFinance,
        disabled: quoteExpired,
      }

      if (flowType === 'instaQuote') {
        quoteBlockProps.saveQuoteButton = {
          ...defaultProps.saveQuoteButton,
          text: {
            ...defaultProps.saveQuoteButton.text,
            value: t('view_quote.save_quote_button_text'),
          },
          onButtonClicked: handleSaveQuote,
          disabled: quoteExpired,
        }
      }
    }

    return (
            <View
            {...props}
            {...quoteBlockProps}
            modal={modal}
            showModal={showModal}
            />
    );
  };

  return Presenter;
};

export default withPresenter;
