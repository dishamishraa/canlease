import React from 'react';
import cx from 'classnames';

import styles from './RateCardPage.module.scss';

import DashboardRateCardBlock, { DashboardRateCardBlockProps } from '../../blocks/DashboardRateCardBlock';
import ConfirmationModal, { ConfirmationModalProps } from '../../organisms/ConfirmationModal';
import NewRateCardModal, { NewRateCardModalProps } from '../../organisms/NewRateCardModal';

export const defaultProps = {
  dashboardRateCardBlock: {
    blockHeader: {
      style: 'Heading1',
      type: 'Default',
      text: {
        style: 'Basic800',
        align: 'Left',
        size: 'Large',
        type: 'Heading1',
      },
    },
    dashboardRateCardList: {
      dashboardRateCards: [
      ],
    },
  } as DashboardRateCardBlockProps,
};

export type RateCardPageProps = {
  dashboardRateCardBlock?: DashboardRateCardBlockProps;
  className?: string;
  confirmationModal?: ConfirmationModalProps;
  deleteModalOpen?: boolean;
  rateCardModal?: NewRateCardModalProps;
  rateCardModalOpen?: boolean;
};

const RateCardPage: React.FC<RateCardPageProps> = ({
  dashboardRateCardBlock,
  className,
  confirmationModal,
  deleteModalOpen,
  rateCardModal,
  rateCardModalOpen,
}) => {
  let modalDisplay;
  if (deleteModalOpen) {
    modalDisplay = (<ConfirmationModal {...confirmationModal} />);
  } else if (rateCardModalOpen) {
    modalDisplay = (<NewRateCardModal {...rateCardModal} />);
  }
  return (
      <div className={cx(styles.rateCardPage, className)}>
        <DashboardRateCardBlock
          className={styles.dashboardRateCardBlock}
          {...dashboardRateCardBlock} />
          {modalDisplay}
      </div>
  );
};

RateCardPage.defaultProps = defaultProps;

export default RateCardPage;
