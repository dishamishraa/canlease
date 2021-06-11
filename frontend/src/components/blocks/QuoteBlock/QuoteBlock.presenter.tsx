import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { UseQuoteDetailsResult } from '../../../modules/quote/useQuoteDetails';
import { QuoteRateSectionProps } from '../../organisms/QuoteRateSection';
import { QuoteBlockProps, defaultProps } from './QuoteBlock';
import { addLinksAndBreaks } from '../../../lib/reactUtils';
import { QuoteDetailItemProps } from '../../molecules/QuoteDetailItem/QuoteDetailItem';
import { RateCardProps } from '../../molecules/RateCard';
import { Quote } from '../../../modules/types'


export type QuoteBlockPresenterProps = QuoteBlockProps & {
    quoteDetails: UseQuoteDetailsResult
};

const withPresenter = (
    View: React.FC<QuoteBlockProps>
): React.FC<QuoteBlockPresenterProps> => {
    const Presenter: React.FC<QuoteBlockPresenterProps> = (props) => {
        const {
            quoteDetails
        } = props;

        const { t } = useTranslation();

        const applyForFinanceButtonClicked = () =>{
        }

        let disabled = false;
        let rateCardsArray: RateCardProps[] = [];
        if(quoteDetails.data){
            let today = new Date();
            let expiryDate = new Date(quoteDetails.data.quoteExpiryDate);
            if(today > expiryDate) disabled = true;
            for(let i = 0; i < quoteDetails.data.quoteOptions.length; i++){
                const term = quoteDetails.data.quoteOptions[i].term
                const monthlyAmount = quoteDetails.data.quoteOptions[i].monthlyAmount
                const financeRate = quoteDetails.data.quoteOptions[i].financeRate
                const rateCardProp: RateCardProps = {
                    rateDetailsItemList:{
                        rateDetailItems:[
                            {
                                ...defaultProps.rateDetailItem,
                                type:"PerMonth",
                                suffixText:{
                                    ...defaultProps.rateDetailItem.suffixText,
                                    value: t('view_quote.rate_card.rate_label')
                                },
                                numberText:{
                                    ...defaultProps.rateDetailItem.numberText,
                                    value: `$${monthlyAmount}`
                                }
                            },
                            {
                                ...defaultProps.rateDetailItem,
                                type:"PerMonth",
                                suffixText:{
                                    ...defaultProps.rateDetailItem.suffixText,
                                    value:  t('view_quote.rate_card.months_label')
                                },
                                numberText:{
                                    ...defaultProps.rateDetailItem.numberText,
                                    value: term
                                }
                            },
                            {
                                ...defaultProps.rateDetailItem,
                                type:"PerMonth",
                                suffixText:{
                                    ...defaultProps.rateDetailItem.suffixText,
                                    value:  t('view_quote.rate_card.cost_label')
                                },
                                numberText:{
                                    ...defaultProps.rateDetailItem.numberText,
                                    value: `${financeRate}%`
                                }
                            },
                            {
                                ...defaultProps.rateDetailItem,
                                type:"Text",
                                suffixText:{
                                    ...defaultProps.rateDetailItem.suffixText,
                                    value: `Own at ${financeRate}% for ${term} months`
                                }
                            }
                        ],
                    }
                }
                rateCardsArray.push(rateCardProp);
            }
        }

        let termDetailItemArray: QuoteDetailItemProps[] = []
        for(let i = 1; i <= 4; i++){
            const quoteDetailItem: QuoteDetailItemProps = {
                labelText:{
                    ...defaultProps.quoteItemList.labelText,
                    value: `${i}`
                },
                infoText:{
                    ...defaultProps.quoteItemList.infoText,
                    value:t('view_quote.term_detail.term_'+(i))
                }
            }
            termDetailItemArray.push(quoteDetailItem)
        }

        const quoteRateSectionProps: QuoteRateSectionProps = {
            text:{
                ...defaultProps.quoteRateSection.text,
                value: t('view_quote.quote_rate_section_heading_text')
            },
            detailItemList:{
                ...defaultProps.detailItemList,
                quoteDetailItems:[
                    {
                        labelText:{
                            ...defaultProps.quoteItemList.labelText,
                            value:t('view_quote.quote_detail.based_on_label')
                        },
                        infoText:{
                            ...defaultProps.quoteItemList.infoText,
                            value: quoteDetails.data?.applicationAmount
                        }
                    },
                    {
                        labelText:{
                            ...defaultProps.quoteItemList.labelText,
                            value:t('view_quote.quote_detail.equipment_label')
                        },
                        infoText:{
                            ...defaultProps.quoteItemList.infoText,
                            value: quoteDetails.data?.asset
                        }
                    },
                    {
                        labelText:{
                            ...defaultProps.quoteItemList.labelText,
                            value:t('view_quote.quote_detail.quote_id_label')
                        },
                        infoText:{
                            ...defaultProps.quoteItemList.infoText,
                            value: quoteDetails.data?.quoteId
                        }
                    }
                ]
            },
            rateCardList:{
                rateCards:rateCardsArray
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
            quoteExpired: disabled,
            expiryToast:{
                ...defaultProps.expiryToast,
                text:{
                    ...defaultProps.expiryToast.text,
                    value:t('view_quote.expiry_toast.message')
                }
            },
            detailItemList:{
                ...defaultProps.detailItemList,
                quoteDetailItems: termDetailItemArray
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