/* eslint-disable no-restricted-syntax, guard-for-in, no-shadow */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { defaultProps as defaultQuoteDetailItemProps } from '../../molecules/QuoteDetailItem/QuoteDetailItem';
import { ClickableRateCardProps } from '../../molecules/ClickableRateCard';
import { DetailsSectionProps } from '../../organisms/DetailsSection';
import { QuoteSelectionBlockProps, defaultProps } from './QuoteSelectionBlock';
import { defaultProps as defaultRateDetailItemProps } from '../../molecules/RateDetailItem/RateDetailItem';
import { Quote, QuoteOption } from '../../../modules/quote/types';
import { convertMonth } from '../../../lib/utils';

export type QuoteSelectionBlockPresenterProps = QuoteSelectionBlockProps & {
  quoteDetails: Quote | null;
};

const withPresenter = (
  View: React.FC<QuoteSelectionBlockProps>,
): React.FC<QuoteSelectionBlockPresenterProps> => {
  const Presenter: React.FC<QuoteSelectionBlockPresenterProps> = (props) => {
    const {
      quoteDetails,
      className,
      setQuoteSelected,
      quoteSelected,
      stepperCurrentValue,
      stepperTotalValue,
    } = props;
    const { t } = useTranslation();
    const [quoteOption, setQuoteOption] = useState<QuoteOption | undefined>(quoteSelected);

    const handleQuoteOptionClick = (quoteOption: QuoteOption) => () => {
      setQuoteOption(quoteOption);
    };

    const nextClicked = () => {
      if (quoteDetails && quoteOption && setQuoteSelected) {
        setQuoteSelected(quoteDetails, quoteOption);
      }
    };

    const isFormValid = () => {
      if (quoteOption) {
        const { financeRate, monthlyAmount, term } = quoteOption;
        if (financeRate && monthlyAmount && term) {
          return true;
        }
        return false;
      }
      return false;
    };

    const isEqual = (firstObject: any, secondObject: any) => {
      for (const key in firstObject) {
        const firstValue = firstObject[key];
        const secondValue = secondObject[key];
        if (firstValue !== secondValue) {
          return false;
        }
      }
      return true;
    };

    let detailsSectionProps: DetailsSectionProps = {};
    const clickableRateCardsArray: ClickableRateCardProps[] = [];
    if (quoteDetails) {
      const {
        applicationAmount, asset, quoteId, leaseType,
      } = quoteDetails;

      detailsSectionProps = {
        text: {
          ...defaultProps.detailsSection.text,
          value: t('view_quote.quote_rate_section_heading_text'),
        },
        detailItemList: {
          ...defaultProps.detailsSection.detailItemList,
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
      };

      quoteDetails.quoteOptions.forEach((option) => {
        const {
          term: termString, monthlyAmount, financeRate,
        } = option;
        const term = convertMonth(termString);

        const clickableRateCardProps: ClickableRateCardProps = {
          onRateCardClicked: handleQuoteOptionClick(option),
          state: quoteOption && isEqual(quoteOption, option) ? 'Selected' : 'Default',
          rateDetailItemList: {
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
                  value: term,
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
        clickableRateCardsArray.push(clickableRateCardProps);
      });
    }

    const quoteSelectionBlockProps: QuoteSelectionBlockProps = {
      ...defaultProps,
      detailsSection: detailsSectionProps,
      stepper: {
        text: {
          ...defaultProps.stepper.text,
          value: t('application_form.stepper', {
            current: stepperCurrentValue,
            total: stepperTotalValue,
          }),
        },
      },
      blockHeading: {
        ...defaultProps.blockHeading,
        value: t('application_form.select_lease.heading_text'),
      },
      disclaimerText: {
        ...defaultProps.disclaimerText,
        value: t('view_quote.disclaimer_text'),
      },
      clickableRateCardList: {
        clickableRateCards: clickableRateCardsArray,
      },
      viewQuoteButton: {
        ...defaultProps.viewQuoteButton,
        text: {
          ...defaultProps.viewQuoteButton.text,
          value: t('application_form.select_lease.next_button'),
        },
        onButtonClicked: nextClicked,
        disabled: !isFormValid(),
      },
    };

    return (
      <View
      className={className}
      {...quoteSelectionBlockProps}
      />
    );
  };

  return Presenter;
};

export default withPresenter;
