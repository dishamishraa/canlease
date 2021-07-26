import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Rate, UpdateRateCard } from '../../../modules/rateCard/types';
import { defaultProps as defaultRateCardTableProps, RateCardTableProps } from '../../blocks/RateCardTable/RateCardTable';
import { RateCardTableItemListProps } from '../../organisms/RateCardTableItemList';
import { RateCardDetailsPageProps, defaultProps } from './RateCardDetailsPage';
import { RateCardTableItemProps, defaultProps as defaultRteCardTableItemProps } from '../../molecules/RateCardTableItem/RateCardTableItem';
import { APIResponse } from '../../../lib/api/types';
import { defaultProps as defaultConfirmationModalProps } from '../../organisms/ConfirmationModal/ConfirmationModal';
import { defaultProps as defaultRateCardModalProps } from '../../organisms/NewRateCardModal/NewRateCardModal';

export type RateCardDetailsPagePresenterProps = RateCardDetailsPageProps & {
    rates: Rate[] | null;
    error?: Error;
    loading: boolean;
    rateCardName?: string;
    deleteRate: (rateId: number) => Promise<APIResponse<void>>;
    refetchRates: () => void;
    updateRateCard: (payload: UpdateRateCard) => Promise<void>;
    refetchRateCard: () => void;
    rateCardId?: number;
};

const withPresenter = (
    View: React.FC<RateCardDetailsPageProps>
) => {
    const Presenter: React.FC<RateCardDetailsPagePresenterProps> = (props) => {
        const { 
        rateCardName, 
        rates, 
        deleteRate, 
        refetchRates, 
        updateRateCard,
        refetchRateCard,
        className,
        rateCardId,
        } = props;

        const { t } = useTranslation();
        const [deleteModalOpen, setDeleteModalOpen] = useState(false);
        const [deleteRateId, setDeleteRateId] = useState<number>();
        const [rateCardModalOpen, setRateCardModalOpen] = useState(false);
        const [newRateCardName, setNewRateCardName] = useState(rateCardName);

        const handleDeleteRate = async(): Promise<void>  => {
            if (deleteRateId){
                await deleteRate(deleteRateId);
            }
            setDeleteModalOpen(false);
            refetchRates();
            setDeleteRateId(undefined);
        }
        const handleUpdateRateCard = async(): Promise<void>  => {
            if (rateCardId){
                await updateRateCard({cardtype: newRateCardName, id: rateCardId});
            }
            setRateCardModalOpen(false);
            refetchRateCard();
            setNewRateCardName("");
        }
        const handleCloseDeleteModal = (): void => {
            setDeleteModalOpen(false);
        }
        const handleOpenDeleteModal = (id: number) => () => {
            setDeleteRateId(id);
            setDeleteModalOpen(true);
        };
        const handleOpenRateCardModal = (): void => {
            setRateCardModalOpen(true);
        };
        const handleCloseRateCardModal = (): void => {
            setRateCardModalOpen(false);
            setNewRateCardName("");
        }
        const handleTextChange = ({ target: { value }}) => {
            setNewRateCardName(value);
        }

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
                },
                onButtonClicked: handleOpenRateCardModal,
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
            const { term, minmonthlyreturn, maxmonthlyreturn, regularir, tenatendir, id } = rate;
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
                    onButtonClicked: handleOpenDeleteModal(id),
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

        const confirmationModal = {
            ...defaultConfirmationModalProps,
            icon: {
                ...defaultConfirmationModalProps.icon,
                onIconClicked: handleCloseDeleteModal,
            },
            title: {
                ...defaultConfirmationModalProps.title,
                value: t('delete_rate_entry.heading'),
            },
            body: {
                ...defaultConfirmationModalProps.body,
                value: t('delete_rate_entry.body'),
            },
            primary: {
                ...defaultConfirmationModalProps.primary,
                text: {
                    ...defaultConfirmationModalProps.primary.text,
                    value: t('delete_rate_entry.delete_button'),
                },
                onButtonClicked: handleDeleteRate,
            },
            secondary: {
                ...defaultConfirmationModalProps.secondary,
                text: {
                    ...defaultConfirmationModalProps.secondary.text,
                    value: t('delete_rate_entry.cancel_button'),
                },
                onButtonClicked: handleCloseDeleteModal,
            }
        }
        const rateCardModal = {
            ...defaultRateCardModalProps,
            icon: {
                ...defaultRateCardModalProps.icon,
                onIconClicked: handleCloseRateCardModal,
            },
            title: {
                ...defaultRateCardModalProps.title,
                value: t('add_rate_card.heading'),
            },
            textField: {
                ...defaultRateCardModalProps.textField,
                label: {
                    ...defaultRateCardModalProps.textField.label,
                    value: t('add_rate_card.label'),
                },
                textInput: {
                    ...defaultRateCardModalProps.textField.textInput,
                    textValue: newRateCardName,
                    onTextChanged: handleTextChange,
                },
              },
            primary: {
                ...defaultRateCardModalProps.primary,
                text: {
                    ...defaultRateCardModalProps.primary.text,
                    value: t('add_rate_card.save_button'),
                },
                onButtonClicked: handleUpdateRateCard,
            },
            secondary: {
                ...defaultRateCardModalProps.secondary,
                text: {
                    ...defaultRateCardModalProps.secondary.text,
                    value: t('add_rate_card.cancel_button'),
                },
                onButtonClicked: handleCloseRateCardModal,
            }
        }

        const rateCardDetailsPageProps: RateCardDetailsPageProps = {
            ...defaultProps,
            blockHeader: blockHeader,
            rateCardTable: rateCardTable,
            confirmationModal: confirmationModal,
            rateCardModal: rateCardModal,
        }
        return <View 
                {...rateCardDetailsPageProps}
                deleteModalOpen={deleteModalOpen} 
                className={className}
                rateCardModalOpen={rateCardModalOpen} />;
    }
    return Presenter;
};
export default withPresenter;