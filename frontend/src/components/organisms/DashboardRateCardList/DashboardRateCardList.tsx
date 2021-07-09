import React from 'react';
import cx from 'classnames';

import styles from './DashboardRateCardList.module.scss';

import DashboardRateCard, { DashboardRateCardProps } from '../../molecules/DashboardRateCard';

export const defaultProps = {
  dashboardRateCards: [
  ] as DashboardRateCardProps[],
};

export type DashboardRateCardListProps = {
  dashboardRateCards?: DashboardRateCardProps[];
  className?: string;
};

const DashboardRateCardList: React.FC<DashboardRateCardListProps> = ({
  dashboardRateCards,
  className,
}) => {
  const dashboardRateCardArray = dashboardRateCards?.map((dashboardRateCard) => (
    <DashboardRateCard
      className={styles.dashboardRateCard}
      {...dashboardRateCard} />
  ));

  return (
    <div className={cx(styles.dashboardRateCardList, className)}>
      {dashboardRateCardArray}
    </div>
  );
};

DashboardRateCardList.defaultProps = defaultProps;

export default DashboardRateCardList;
