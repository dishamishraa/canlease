import React from 'react';
import cx from 'classnames';

import styles from './RateCardPage.module.scss';

import DashboardRateCardBlock, { DashboardRateCardBlockProps } from '../../blocks/DashboardRateCardBlock';
import ConfirmationModal, { ConfirmationModalProps } from '../../organisms/ConfirmationModal';

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
  confirmationModalOpen?: boolean;
};

const RateCardPage: React.FC<RateCardPageProps> = ({
  dashboardRateCardBlock,
  className,
  confirmationModal,
  confirmationModalOpen,
}) => {
  let confirmationModalDisplay;
  if (confirmationModalOpen) {
    confirmationModalDisplay = ( <ConfirmationModal {...confirmationModal} />)
  }
  return (
      <div className={cx(styles.rateCardPage, className)}>
        <DashboardRateCardBlock
          className={styles.dashboardRateCardBlock}
          {...dashboardRateCardBlock} />
        {confirmationModalDisplay}
      </div>
  );
}

RateCardPage.defaultProps = defaultProps;

export default RateCardPage;
