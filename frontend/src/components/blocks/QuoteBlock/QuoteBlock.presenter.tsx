import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { UseQuoteDetailsResult } from '../../../modules/quote/useQuoteDetails';
import { QuoteRateSectionProps } from '../../organisms/QuoteRateSection';
import { RateCardListProps } from '../../organisms/RateCardList';
import { QuoteBlockProps, defaultProps } from './QuoteBlock';
import { addLinksAndBreaks } from '../../../lib/reactUtils';


export type QuoteBlockPresenterProps = QuoteBlockProps & {
    quote: UseQuoteDetailsResult
};

const withPresenter = (
    View: React.FC<QuoteBlockProps>
): React.FC<QuoteBlockPresenterProps> => {
    const Presenter: React.FC<QuoteBlockPresenterProps> = (props) => {
        const {
            quote
        } = props;

        const { t } = useTranslation();
        const history = useHistory();
        const matchCompletedRoute = useRouteMatch('/quote/:quoteId');

        const applyForFinanceButtonClicked = () =>{
        }

        const saveQuoteButtonClicked = () =>{
        }

        let disabled = false;
        if(quote.data){
            let today = new Date();
            let expiryDate = new Date(quote.data.quoteExpiryDate);
            if(today > expiryDate) disabled = true;
        }

        const quoteRateSectionProps: QuoteRateSectionProps = {
            text:{
                ...defaultProps.quoteRateSection.text,
                value: t('view_quote.quote_rate_section_heading_text')
            },
            quoteDetails:{
                ...defaultProps.quoteRateSection.quoteDetails,
                // label:{
                //     ...defaultProps.quoteRateSection.quoteDetails?.label,
                //     value: 'Label'
                // },
                text:{
                    ...defaultProps.quoteRateSection.quoteDetails?.text,
                    value: 'Text'
                }
            },
            rateCardList:{
                ...defaultProps.quoteRateSection.rateCardList
            }
        }

        const quoteBlockProps: QuoteBlockProps = {
            ...defaultProps,
            quoteRateSection: quoteRateSectionProps,
            blockHeading:{
                ...defaultProps.blockHeading,
                value:t('view_quote.heading_text')
            },
            disclaimerText:{
                ...defaultProps.disclaimerText,
                value: t('view_quote.disclaimer_text')
            },
            conditionsText:{
                ...defaultProps.conditionsText,
                value: t('view_quote.conditions_text')
            },
            validText:{
                ...defaultProps.validText,
                value: t('view_quote.valid_text')
            },
            learnMoreText:{
                ...defaultProps.learnMoreText,
                value: addLinksAndBreaks(t('view_quote.learn_more_text'))
            },
            viewQuoteButton:{
                ...defaultProps.viewQuoteButton,
                text:{
                    ...defaultProps.viewQuoteButton.text,
                    value: t('view_quote.apply_button_text')
                },
                onButtonClicked: applyForFinanceButtonClicked,
                disabled: disabled
            },
            saveQuoteButton:{
                ...defaultProps.saveQuoteButton,
                text:{
                    ...defaultProps.saveQuoteButton.text,
                    value:t('view_quote.save_quote_button_text')
                },
                onButtonClicked: saveQuoteButtonClicked,
                disabled: disabled
            },
            quoteExpired: disabled,
            expiryToast:{
                ...defaultProps.expiryToast,
                text:{
                    ...defaultProps.expiryToast.text,
                    value:t('view_quote.expiry_toast.message')
                }
            }
        }

        return (
            <View
            {...quoteBlockProps}
            />
        )
    }

    return Presenter;
}

export default withPresenter;