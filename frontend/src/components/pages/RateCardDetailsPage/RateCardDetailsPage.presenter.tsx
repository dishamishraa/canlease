import React from 'react';
import { useTranslation } from 'react-i18next';
import { Rate } from '../../../modules/rateCard/types';
import { defaultProps as defaultRateCardTableProps, RateCardTableProps } from '../../blocks/RateCardTable/RateCardTable';
import { RateCardTableItemListProps } from '../../organisms/RateCardTableItemList';
import { RateCardDetailsPageProps, defaultProps } from './RateCardDetailsPage';
import { RateCardTableItemProps, defaultProps as defaultRteCardTableItemProps } from '../../molecules/RateCardTableItem/RateCardTableItem';


export type RateCardDetailsPagePresenterProps = RateCardDetailsPageProps & {
    rates: Rate[] | null;
    error?: Error;
    loading: boolean;
    rateCardName?: string;
};

const withPresenter = (
    View: React.FC<RateCardDetailsPageProps>
) => {
    const Presenter: React.FC<RateCardDetailsPagePresenterProps> = (props) => {
        const { rateCardName, rates } = props;

        const { t } = useTranslation();

        const blockHeader = {
            ...defaultProps.blockHeader,
            text: {
                ...defaultProps.blockHeader.text,
                value: rateCardName,
            },
            button: {
                ...defaultProps.blockHeader.button,
                text: {
                    ...defaultProps.blockHeader.button?.text,
                    value: t('rate_card_details_page.header.button_text'),
                }
            }
        };

        const rateCardTableHeader = {
            ...defaultRateCardTableProps.rateCardTableHeader,
            term: {
                ...defaultRateCardTableProps.rateCardTableHeader.term,
                value: t('rate_card_table.headers.term'),
            },
            minMonthlyReturn: {
                ...defaultRateCardTableProps.rateCardTableHeader.minMonthlyReturn,
                value: t('rate_card_table.headers.min_monthly_return'),
            },
            maxMonthlyReturn: {
                ...defaultRateCardTableProps.rateCardTableHeader.maxMonthlyReturn,
                value: t('rate_card_table.headers.max_monthly_return'),
            },
            interestRate: {
                ...defaultRateCardTableProps.rateCardTableHeader.interestRate,
                value: t('rate_card_table.headers.interest_rate'),
            },
            tenAtEndOfInterestRate: {
                ...defaultRateCardTableProps.rateCardTableHeader.interestRate,
                value: t('rate_card_table.headers.ten_end_interest_rate'),
            },
            action: {
                ...defaultRateCardTableProps.rateCardTableHeader.action,
                value: t('rate_card_table.headers.action'),
            },
        };

        const rateCardTableItems: RateCardTableItemProps[] = [];

        rates?.forEach((rate) => {
            const { term, minmonthlyreturn, maxmonthlyreturn, regularir, tenatendir } = rate;
            const rateCardTableItem: RateCardTableItemProps = {
                ...defaultRteCardTableItemProps,
                type: 'Default',
                term: {
                    ...defaultRteCardTableItemProps.term,
                    value: term,
                },
                minMonthlyReturn: {
                    ...defaultRteCardTableItemProps.minMonthlyReturn,
                    value: minmonthlyreturn,
                },
                maxMonthlyReturn: {
                    ...defaultRteCardTableItemProps.maxMonthlyReturn,
                    value: maxmonthlyreturn,
                },
                interestRate: {
                    ...defaultRteCardTableItemProps.interestRate,
                    value: regularir,
                },
                tenAtEndOfInterestRate: {
                    ...defaultRteCardTableItemProps.tenAtEndOfInterestRate,
                    value: tenatendir,
                },
                editButton: {
                    ...defaultRteCardTableItemProps.editButton,
                    onButtonClicked: () => {
                        console.log('edit');
                    },
                },
                deleteButton: {
                    ...defaultRteCardTableItemProps.deleteButton,
                    onButtonClicked: () => {
                        console.log('delete');
                    },
                },
            };
            rateCardTableItems.push(rateCardTableItem);
        })

        const rateCardTableItemList = {
            ...defaultRateCardTableProps.rateCardTableItemList,
            rateCardTableItems: [
                ...rateCardTableItems,
                {
                    type: 'Empty',
                    button: {
                        ...defaultRteCardTableItemProps.button,
                        text: {
                            ...defaultRteCardTableItemProps.button.text,
                            value: t('rate_card_table.addButton')
                        },
                    },
                }
            ]
        } as RateCardTableItemListProps;

        const rateCardTable = {
            ...defaultRateCardTableProps,
            rateCardTableHeader: rateCardTableHeader,
            rateCardTableItemList: rateCardTableItemList,
        } as RateCardTableProps;

        const rateCardDetailsPageProps: RateCardDetailsPageProps = {
            ...defaultProps,
            blockHeader: blockHeader,
            rateCardTable: rateCardTable,
        }
        return <View {...rateCardDetailsPageProps}/>;
    }
    return Presenter;
};
export default withPresenter;