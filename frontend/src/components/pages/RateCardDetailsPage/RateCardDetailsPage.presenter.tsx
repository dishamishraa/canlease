import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CreateRate, Rate, RateCard, UpdateRate } from '../../../modules/rateCard/types';
import { defaultProps as defaultRateCardTableProps, RateCardTableProps } from '../../blocks/RateCardTable/RateCardTable';
import { RateCardTableItemListProps } from '../../organisms/RateCardTableItemList';
import { RateCardDetailsPageProps, defaultProps } from './RateCardDetailsPage';
import { RateCardTableItemProps, defaultProps as defaultRteCardTableItemProps } from '../../molecules/RateCardTableItem/RateCardTableItem';
import { APIResponse } from '../../../lib/api/types';
import { NewRateModalProps, defaultProps as newRateModalDefaultProps } from '../../organisms/NewRateModal/NewRateModal';
import { defaultProps as defaultTextFieldProps } from '../../molecules/TextField/TextField';
import { isEmpty } from '../../../lib/utils';


export type RateCardDetailsPagePresenterProps = RateCardDetailsPageProps & {
    rates: Rate[] | null;
    error?: Error;
    loading: boolean;
    rateCard?: RateCard | undefined;
    createRate?: (payload: CreateRate) => Promise<APIResponse<Rate>>
    updateRate?: (payload: UpdateRate) => Promise<void>
    refetchRates?: () => void;
};

const withPresenter = (
    View: React.FC<RateCardDetailsPageProps>
) => {
    const Presenter: React.FC<RateCardDetailsPagePresenterProps> = (props) => {
        const { rateCard, rates, createRate, updateRate, refetchRates} = props;
        const { t } = useTranslation();
        const [showRateModal, setShowRateModal] = useState(false);
        const [term, setTerm] = useState<number|null>();
        const [currRate, setCurrRate] = useState<Rate|null>();
        const [minMonthlyReturn, setMinMonthlyReturn] = useState<number|null>();
        const [maxMonthlyReturn, setMaxMonthlyReturn] = useState<number|null>();
        const [interestRate, setInterestRate] = useState<number|null>();
        const [tenAtEndIR, setTenAtEndIR] = useState<number|null>()

        const handleChangeTerm = ({ target: { value }}) => {
            setTerm(value);
        }

        const handleChangeMin = ({ target: { value }}) => {
            setMinMonthlyReturn(value);
        }

        const handleChangeMax = ({ target: { value }}) => {
            setMaxMonthlyReturn(value);
        }

        const handleChangeInterestRate = ({ target: { value }}) => {
            setInterestRate(value);
        }

        const handleChangeTenAtEndIR = ({ target: { value }}) => {
            setTenAtEndIR(value);
        }
        
        const onCloseRateModal = () => {
            setShowRateModal(false);
            setTerm(null);
            setMinMonthlyReturn(null);
            setMaxMonthlyReturn(null);
            setInterestRate(null);
            setTenAtEndIR(null);
            setCurrRate(null);
        };

        const handleOpenAddRateModal = () => {
            setCurrRate(null);
            setShowRateModal(true);
        };

        const handleOpenEditRateModal = (rate: Rate) => {
            const { tenatendir, term, minmonthlyreturn, maxmonthlyreturn, regularir } = rate;
            setTerm(term);
            setMinMonthlyReturn(minmonthlyreturn);
            setMaxMonthlyReturn(maxmonthlyreturn);
            setInterestRate(regularir);
            setTenAtEndIR(tenatendir);
            setCurrRate(rate);
            setShowRateModal(true);
        }

        const isFormValid = !isEmpty(term) && !isEmpty(minMonthlyReturn) && 
            !isEmpty(maxMonthlyReturn) && !isEmpty(interestRate) &&
            !isEmpty(tenAtEndIR);

        const handleSaveRate = async () => {
            if(term && minMonthlyReturn && maxMonthlyReturn && 
                interestRate && tenAtEndIR && rateCard && refetchRates){
                if (!currRate && createRate){
                    await createRate({
                        term: term,
                        minmonthlyreturn: minMonthlyReturn,
                        maxmonthlyreturn: maxMonthlyReturn,
                        regularir: interestRate,
                        tenatendir: tenAtEndIR,
                        ratecardid: rateCard?.id,
                    });
                } else if (currRate && updateRate){
                    await updateRate({
                        rateId: currRate.id,
                        term: term,
                        minmonthlyreturn: minMonthlyReturn,
                        maxmonthlyreturn: maxMonthlyReturn,
                        regularir: interestRate,
                        tenatendir: tenAtEndIR,
                        ratecardid: rateCard?.id,
                    })
                }
                onCloseRateModal();
                refetchRates();
            }
        }


        const newRateModal: NewRateModalProps = {
            ...newRateModalDefaultProps,
            icon: {
                ...newRateModalDefaultProps.icon,
                onIconClicked: onCloseRateModal,
            },
            title: {
                ...newRateModalDefaultProps.title,
                value: t('new_rate_modal.title'),
            },
            textFieldList: {
                ...newRateModalDefaultProps.textFieldList,
                textFields:[
                    {
                        ...defaultTextFieldProps,
                        label: {
                            ...defaultTextFieldProps.label,
                            value: t('new_rate_modal.term'),
                        },
                        textInput: {
                            ...defaultTextFieldProps.textInput,
                            inputType: 'number',
                            textValue: term !== undefined ? `${term}` : undefined,
                            onTextChanged: handleChangeTerm,
                        },
                    },
                    {
                        ...defaultTextFieldProps,
                        label: {
                            ...defaultTextFieldProps.label,
                            value: t('new_rate_modal.min'),
                        },
                        textInput: {
                            ...defaultTextFieldProps.textInput,
                            inputType: 'number',
                            textValue: minMonthlyReturn !== undefined ? `${minMonthlyReturn}` : undefined,
                            onTextChanged: handleChangeMin,
                        },
                    },
                    {
                        ...defaultTextFieldProps,
                        label: {
                            ...defaultTextFieldProps.label,
                            value: t('new_rate_modal.max'),
                        },
                        textInput: {
                            ...defaultTextFieldProps.textInput,
                            inputType: 'number',
                            textValue: maxMonthlyReturn !== undefined ? `${maxMonthlyReturn}` : undefined,
                            onTextChanged: handleChangeMax,
                        },
                    },
                    {
                        ...defaultTextFieldProps,
                        label: {
                            ...defaultTextFieldProps.label,
                            value: t('new_rate_modal.interest_rate'),
                        },
                        textInput: {
                            ...defaultTextFieldProps.textInput,
                            inputType: 'number',
                            textValue: interestRate !== undefined ? `${interestRate}` : undefined,
                            onTextChanged: handleChangeInterestRate,
                        },
                    },
                    {
                        ...defaultTextFieldProps,
                        label: {
                            ...defaultTextFieldProps.label,
                            value: t('new_rate_modal.ten'),
                        },
                        textInput: {
                            ...defaultTextFieldProps.textInput,
                            inputType: 'number',
                            textValue: tenAtEndIR !== undefined ? `${tenAtEndIR}` : undefined,
                            onTextChanged: handleChangeTenAtEndIR,
                        },
                    },
                ]
            },
            primary: {
                ...newRateModalDefaultProps.primary,
                text: {
                    ...newRateModalDefaultProps.primary.text,
                    value: t('new_rate_modal.primary'),
                },
                disabled: !isFormValid,
                onButtonClicked: handleSaveRate,
            },
            secondary: {
                ...newRateModalDefaultProps.secondary,
                text: {
                    ...newRateModalDefaultProps.secondary.text,
                    value: t('new_rate_modal.secondary'),
                },
                onButtonClicked: onCloseRateModal
            },
        };

        const blockHeader = {
            ...defaultProps.blockHeader,
            text: {
                ...defaultProps.blockHeader.text,
                value: rateCard?.cardtype,
            },
            button: {
                ...defaultProps.blockHeader.button,
                text: {
                    ...defaultProps.blockHeader.button?.text,
                    value: t('rate_card_details_page.header.button_text'),
                },
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

        const sortedRates = rates?.sort((a, b) => a.id > b.id && 1 || -1);
        sortedRates?.forEach((rate) => {
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
                    onButtonClicked: () => handleOpenEditRateModal(rate),
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
                        onButtonClicked: handleOpenAddRateModal
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
        return <View {
            ...rateCardDetailsPageProps}
            newRateModal={newRateModal}
            showRateModal={showRateModal}
            />;
    }
    return Presenter;
};
export default withPresenter;