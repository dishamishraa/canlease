import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { QuoteRateSectionProps } from '../../organisms/QuoteRateSection';
import { QuoteBlockProps, defaultProps } from './QuoteBlock';
import { addLinksAndBreaks } from '../../../lib/reactUtils';
import { QuoteDetailItemProps, defaultProps as defaultQuoteDetailItemProps } from '../../molecules/QuoteDetailItem/QuoteDetailItem';
import { RateCardProps } from '../../molecules/RateCard';
import { ModalProps, defaultProps as modalPropsDefaultProps } from '../../organisms/Modal/Modal';
import EmailIcon from '../../../resources/icons/Email.svg';

import { defaultProps as defaultRateDetailItemProps } from '../../molecules/RateDetailItem/RateDetailItem';
import { Quote } from '../../../modules/quote/types';

export type QuoteBlockPresenterProps = QuoteBlockProps & {
  quoteDetails: Quote | null;
  error?: Error;
  loading: boolean;
};

const withPresenter = (
  View: React.FC<QuoteBlockProps>,
): React.FC<QuoteBlockPresenterProps> => {
  const Presenter: React.FC<QuoteBlockPresenterProps> = (props) => {
    const {
      loading,
      error,
      quoteDetails,
    } = props;

    const { t } = useTranslation();
    const location = useLocation<({userType: string})>();
    const { state } = location;
    const applyForFinanceButtonClicked = () => {
    };

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
      if (state) {
        setShowModal(true);
      }
    }, [state]);

    const onCloseModal = () => {
      setShowModal(false);
    };

    if (error) {
      // return error view
    }

    if (loading) {
      // return loading view
    }

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

    let disabled = false;
    const rateCardsArray: RateCardProps[] = [];
    let quoteRateSectionProps: QuoteRateSectionProps = {};
    const termDetailItemArray: QuoteDetailItemProps[] = [];
    const termDisplay = {
      '12M': 12,
      '24M': 24,
      '36M': 36,
      '48M': 48,
      '60M': 60,
      '72M': 72,
    };
    if (quoteDetails) {
      // check if quote has expired
      const today = new Date();
      const expiryDate = new Date(quoteDetails.quoteExpiryDate);
      if (today > expiryDate) {
        disabled = true;
      }

      // quote rate section
      const {
        applicationAmount, asset, quoteId, leaseType,
      } = quoteDetails;
      quoteRateSectionProps = {
        text: {
          ...defaultProps.quoteRateSection.text,
          value: t('view_quote.quote_rate_section_heading_text'),
        },
        detailItemList: {
          ...defaultProps.detailItemList,
          quoteDetailItems: [
            {
              labelText: {
                ...defaultQuoteDetailItemProps.labelText,
                value: t('view_quote.quote_detail.application_amount.label'),
              },
              infoText: {
                ...defaultQuoteDetailItemProps.infoText,
                value: t('view_quote.quote_detail.application_amount.value', {
                  applicationAmount,
                }),
              },
            },
            {
              labelText: {
                ...defaultQuoteDetailItemProps.labelText,
                value: t('view_quote.quote_detail.equipment_label'),
              },
              infoText: {
                ...defaultQuoteDetailItemProps.infoText,
                value: asset,
              },
            },
            {
              labelText: {
                ...defaultQuoteDetailItemProps.labelText,
                value: t('view_quote.quote_detail.quote_id_label'),
              },
              infoText: {
                ...defaultQuoteDetailItemProps.infoText,
                value: quoteId,
              },
            },
          ],
        },
        rateCardList: {
          rateCards: rateCardsArray,
        },
      };

      // generate rate cards props
      quoteDetails.quoteOptions.forEach((quoteOption) => {
        const {
          term, monthlyAmount, financeRate, purchaseOptionDate,
        } = quoteOption;
        const purchaseOptionDuration = ((new Date(purchaseOptionDate)).getTime() - Date.now());
        const totalMonths = Math.round(purchaseOptionDuration / (30 * 24 * 60 * 60 * 1000));
        const rateCardProp: RateCardProps = {
          rateDetailsItemList: {
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
                  value: termDisplay[term],
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
        };
        rateCardsArray.push(rateCardProp);
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
      viewQuoteButton: {
        ...defaultProps.viewQuoteButton,
        text: {
          ...defaultProps.viewQuoteButton.text,
          value: t('view_quote.apply_button_text'),
        },
        onButtonClicked: applyForFinanceButtonClicked,
        disabled,
      },
      quoteExpired: disabled,
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
