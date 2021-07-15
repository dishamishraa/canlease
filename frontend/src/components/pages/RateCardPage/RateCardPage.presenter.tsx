import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RateCardPageProps, defaultProps } from './RateCardPage';
import { defaultProps as DashboardRateCardDefaultProps, DashboardRateCardProps} from '../../molecules/DashboardRateCard/DashboardRateCard';
import { defaultProps as defaultConfirmationModalProps } from '../../organisms/ConfirmationModal/ConfirmationModal';

export type RateCardPagePresenterProps = RateCardPageProps & {
};

const withPresenter = (
  View: React.FC<RateCardPageProps>,
): React.FC<RateCardPagePresenterProps> => {
  const Presenter: React.FC<RateCardPagePresenterProps> = (props) => {
    const {
        className,
    } = props;
    const rateCards = [
        {
            name: "test1"
        },
        {
            name: "test2"
        },
        {
            name: "test3"
        },
    ]
    const { t } = useTranslation();
    const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const handleOpenModal = (): void => {
        setConfirmationModalOpen(true);
    };
    const handleCloseModal = (): void => {
        setConfirmationModalOpen(false);
    }
    const handleDeleteRateCard = () => {

    }

    const rateCardArray: DashboardRateCardProps[] = [];

    rateCards.forEach((rateCard) => {
        const { name } = rateCard;
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
                onButtonClicked: handleOpenModal,
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
                onIconClicked: handleCloseModal,
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
                }
            },
            secondary: {
                ...defaultConfirmationModalProps.secondary,
                text: {
                    ...defaultConfirmationModalProps.secondary.text,
                    value: t('delete_rate_card.cancel_button'),
                },
                onButtonClicked: handleCloseModal,
            }
        },
    }

    return <View
        {...rateCardPageProps}
        confirmationModalOpen={confirmationModalOpen}
        className={className}
    />;
};
return Presenter;
};
export default withPresenter;