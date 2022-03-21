import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { RateCardPageProps, defaultProps } from './RateCardPage';
import { defaultProps as DashboardRateCardDefaultProps, DashboardRateCardProps } from '../../molecules/DashboardRateCard/DashboardRateCard';
import { RateCard, CreateRateCard } from '../../../modules/rateCard/types';
import { APIResponse } from '../../../lib/api/types';

export type RateCardPagePresenterProps = RateCardPageProps & {
  rateCards: RateCard[] | null;
  createRateCard: (payload: CreateRateCard) => Promise<APIResponse<RateCard>>;
  deleteRateCard: (id: number) => Promise<APIResponse<void>>;
  refetch: () => void;
};

const withPresenter = (
  View: React.FC<RateCardPageProps>,
): React.FC<RateCardPagePresenterProps> => {
  const Presenter: React.FC<RateCardPagePresenterProps> = (props) => {
    const {
      className,
      rateCards,
      refetch,
    } = props;

    const { t } = useTranslation();
    const history = useHistory();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [rateCardModalOpen, setRateCardModalOpen] = useState(false);
    const rateCardArray: DashboardRateCardProps[] = [];

    const handleViewRateCard = (id: number) => () => {
      history.push(`/portal/ratecard/${id}`);
    };

    rateCards?.forEach((rateCard) => {
      const { cardtype: name, id } = rateCard;
      const rateCardProps: DashboardRateCardProps = {
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
          onButtonClicked: handleViewRateCard(id),
        },
        id: id.toString(),
      };
      rateCardArray.push(rateCardProps);
    });

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
    };

    return (
      <View
        {...rateCardPageProps}
        deleteModalOpen={deleteModalOpen}
        className={className}
        rateCardModalOpen={rateCardModalOpen}
      />
    );
  };

  return Presenter;
};

export default withPresenter;
