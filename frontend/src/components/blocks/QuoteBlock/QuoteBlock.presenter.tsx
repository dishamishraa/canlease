import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { QuoteBlockProps, defaultProps } from './QuoteBlock';


export type QuoteBlockPresenterProps = {

};

const withPresenter = (
    View: React.FC<QuoteBlockProps>
): React.FC<QuoteBlockPresenterProps> => {
    const Presenter: React.FC<QuoteBlockPresenterProps> = (props) => {
        const { t } = useTranslation();

        const applyForFinanceButtonClicked = () =>{
            console.log('apply')
        }

        const saveQuoteButtonClicked = () =>{
            console.log('save')
        }

        const quoteBlockProps: QuoteBlockProps = {
            ...defaultProps,
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
                value: t('view_quote.learn_more_text')
            },
            viewQuoteButton:{
                ...defaultProps.viewQuoteButton,
                text:{
                    ...defaultProps.viewQuoteButton.text,
                    value: t('view_quote.apply_button_text')
                },
                onButtonClicked: applyForFinanceButtonClicked
            },
            saveQuoteButton:{
                ...defaultProps.saveQuoteButton,
                text:{
                    ...defaultProps.saveQuoteButton.text,
                    value:t('view_quote.save_quote_button_text')
                },
                onButtonClicked: saveQuoteButtonClicked
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