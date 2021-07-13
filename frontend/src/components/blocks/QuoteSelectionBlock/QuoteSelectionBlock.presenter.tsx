import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { defaultProps as defaultQuoteDetailItemProps } from '../../molecules/QuoteDetailItem/QuoteDetailItem';
import { ClickableRateCardProps } from '../../molecules/ClickableRateCard';
import { DetailsSectionProps } from '../../organisms/DetailsSection';
import { QuoteSelectionBlockProps , defaultProps} from './QuoteSelectionBlock';
import { defaultProps as defaultRateDetailItemProps } from '../../molecules/RateDetailItem/RateDetailItem';
import { Quote } from '../../../modules/quote/types';
import { DefaultQuoteOption, TermDisplay } from '../../../modules/types';
import { QuoteFlowType } from '../../../modules/types';

export type QuoteSelectionBlockPresenterProps = QuoteSelectionBlockProps & {
    quoteDetails: Quote | null;
    setQuoteSelected?: React.Dispatch<React.SetStateAction<DefaultQuoteOption>>;
    quoteSelected?: DefaultQuoteOption;
    stepperCurrentValue?: number,
    setStepperCurrentValue?: React.Dispatch<React.SetStateAction<number>>;
    stepperTotalValue?: number,
    setStepperTotalValue?: React.Dispatch<React.SetStateAction<number>>;
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
      setStepperCurrentValue,
      stepperTotalValue,
      setStepperTotalValue,
    } = props;

    const { t } = useTranslation();
    const history = useHistory();
    const { state } = useLocation<{flowType: QuoteFlowType}>();
    const { flowType } = state || {};
    if (flowType === 'instaQuote' && setStepperCurrentValue && setStepperTotalValue) {
      setStepperCurrentValue(1);
      setStepperTotalValue(5);
    }

    const clickableRateCardsArray: ClickableRateCardProps[] = [];
  
    let detailsSectionProps: DetailsSectionProps = {};
    const handleClick = (quoteOption) => (event: any) => {
      if (setQuoteSelected){
        setQuoteSelected(quoteOption);
      }
    }
    const isEqual = (firstObject, secondObject) => {
     for(let key in firstObject) {
        let firstValue = firstObject[key];
        let secondValue = secondObject[key];
        if (firstValue != secondValue){
          return false;
        }
      }
      return true;
    }
    
    const handleState = (quoteOption) => {
      if (isEqual(quoteSelected, quoteOption)){
        return 'Selected';
      }
      return 'Default';
    }
    const nextClicked = () => {
      if (isFormValid() && setStepperCurrentValue && stepperCurrentValue) {
        setStepperCurrentValue(stepperCurrentValue + 1);
        history.push('/portal/application/assetInfo');
      }
    };

    const isFormValid = () => {
      if (quoteSelected){
        const {financeRate, monthlyAmount, purchaseOptionDate, term } = quoteSelected
        if (financeRate && monthlyAmount && purchaseOptionDate && term) {
          return true;
        }
        return false;
      }
    }

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
      }

      quoteDetails.quoteOptions.forEach((quoteOption) => {
        const {
          term, monthlyAmount, financeRate, purchaseOptionDate,
        } = quoteOption;
        const purchaseOptionDuration = ((new Date(purchaseOptionDate)).getTime() - Date.now());
        const totalMonths = Math.round(purchaseOptionDuration / (30 * 24 * 60 * 60 * 1000));
        const clickableRateCardProps: ClickableRateCardProps = {
          onRateCardClicked: handleClick(quoteOption),
          state: handleState(quoteOption),
          rateDetailItemList:{
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
          }
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
            value: t(`application_form.stepper`, {
              current: stepperCurrentValue,
              total: stepperTotalValue,
            })
        }
      },
      blockHeading: {
        ...defaultProps.blockHeading,
        value: t('application_form.select_lease.heading_text'),
      },
      disclaimerText: {
        ...defaultProps.disclaimerText,
        value: t('view_quote.disclaimer_text'),
      },
      clickableRateCardList:{
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
    }
  
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


