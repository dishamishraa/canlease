import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RateCardPageProps, defaultProps } from './RateCardPage';
import { defaultProps as DashboardRateCardDefaultProps, DashboardRateCardProps} from '../../molecules/DashboardRateCard/DashboardRateCard';
import { defaultProps as defaultConfirmationModalProps } from '../../organisms/ConfirmationModal/ConfirmationModal';
import { defaultProps as defaultRateCardModalProps } from '../../organisms/NewRateCardModal/NewRateCardModal';
import { RateCard, CreateRateCard } from '../../../modules/rateCard/types';
import { APIResponse } from '../../../lib/api/types';

export type RateCardPagePresenterProps = RateCardPageProps & {
    rateCards: RateCard[] | null;
    createRateCard: (payload: CreateRateCard) => Promise<APIResponse<RateCard>>;
};

const withPresenter = (
  View: React.FC<RateCardPageProps>,
): React.FC<RateCardPagePresenterProps> => {
  const Presenter: React.FC<RateCardPagePresenterProps> = (props) => {
    const {
        className,
        rateCards,
        createRateCard,
    } = props;
    
    const { t } = useTranslation();
    const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const [rateCardModalOpen, setRateCardModalOpen] = useState(false);
    const [textValue, setTextValue] = useState("");

    const handleTextChange = ({ target: { value }}) => {
        setTextValue(value);
    }

    const handleOpenDeleteModal = (): void => {
        setConfirmationModalOpen(true);
    };
    const handleCloseDeleteModal = (): void => {
        setConfirmationModalOpen(false);
    }
    const handleOpenRateCardModal = (): void => {
        setRateCardModalOpen(true);
    };
    const handleCloseRateCardModal = (): void => {
        setRateCardModalOpen(false);
    }
    const handleDeleteRateCard = (): void => {
        //TODO
    }
    const handleCreateRateCard = async () => {
        const { data } = await createRateCard({cardtype: textValue});
        if (data) {
            console.log(data)
        }
    }
 
    const rateCardArray: DashboardRateCardProps[] = [];

    rateCards?.forEach((rateCard) => {
        const { cardtype: name } = rateCard;
        const rateCardProps: DashboardRateCardProps =  {
            ...DashboardRateCardDefaultProps,
            type: 'RateCard',
            dataText: {
                ...DashboardRateCardDefaultProps.dataText,
                value: name,
            },
            viewButton: {
                ...DashboardRateCardDefaultProps.viewButton,
                text: {
                    ...DashboardRateCardDefaultProps.viewButton.text,
                    value: t('rate_cards.view_button'),
                },
            },
            deleteButton: {
                ...DashboardRateCardDefaultProps.deleteButton,
                text: {
                    ...DashboardRateCardDefaultProps.deleteButton.text,
                    value: t('rate_cards.delete_button'),
                },
                onButtonClicked: handleOpenDeleteModal,
            }
        }
        rateCardArray.push(rateCardProps);
    })

    const addRateCard: DashboardRateCardProps = {
        ...DashboardRateCardDefaultProps,
        type: 'AddRateCard',
        button: {
            ...DashboardRateCardDefaultProps.button,
            text: {
                ...DashboardRateCardDefaultProps.button.text,
                value: t('rate_cards.add_rate_card_button'),
            },
            onButtonClicked: handleOpenRateCardModal,
        },
    }
    rateCardArray.push(addRateCard);

    const rateCardPageProps: RateCardPageProps = {
        ...defaultProps,
        dashboardRateCardBlock: {
            ...defaultProps.dashboardRateCardBlock,
            blockHeader: {
                ...defaultProps.dashboardRateCardBlock.blockHeader,
              text: {
                ...defaultProps.dashboardRateCardBlock.blockHeader?.text,
                value: t('rate_cards.heading'),
              },
            },
            dashboardRateCardList: {
              dashboardRateCards: rateCardArray,
            },
        },
        confirmationModal: {
            ...defaultConfirmationModalProps,
            icon: {
                ...defaultConfirmationModalProps.icon,
                onIconClicked: handleCloseDeleteModal,
            },
            title: {
                ...defaultConfirmationModalProps.title,
                value: t('delete_rate_card.heading'),
            },
            body: {
                ...defaultConfirmationModalProps.body,
                value: t('delete_rate_card.body'),
            },
            primary: {
                ...defaultConfirmationModalProps.primary,
                text: {
                    ...defaultConfirmationModalProps.primary.text,
                    value: t('delete_rate_card.delete_button'),
                },
                onButtonClicked: handleDeleteRateCard,
            },
            secondary: {
                ...defaultConfirmationModalProps.secondary,
                text: {
                    ...defaultConfirmationModalProps.secondary.text,
                    value: t('delete_rate_card.cancel_button'),
                },
                onButtonClicked: handleCloseDeleteModal,
            }
        },
        rateCardModal: {
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
                    textValue,
                    onTextChanged: handleTextChange,
                },
              },
            primary: {
                ...defaultRateCardModalProps.primary,
                text: {
                    ...defaultRateCardModalProps.primary.text,
                    value: t('add_rate_card.save_button'),
                },
                onButtonClicked: handleCreateRateCard
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
    }

    return <View
        {...rateCardPageProps}
        confirmationModalOpen={confirmationModalOpen}
        className={className}
        rateCardModalOpen={rateCardModalOpen}
    />;
};
return Presenter;
};
export default withPresenter;