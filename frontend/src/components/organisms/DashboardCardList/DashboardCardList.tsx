import React from 'react';
import cx from 'classnames';

import styles from './DashboardCardList.module.scss';

import DashboardCard, { DashboardCardProps } from '../../molecules/DashboardCard';

export const defaultProps = {
  dashboardCards: [
  ] as DashboardCardProps[],
};

export type DashboardCardListProps = {
  dashboardCards?: DashboardCardProps[];
  className?: string;
};

const DashboardCardList: React.FC<DashboardCardListProps> = ({
  dashboardCards,
  className,
}) => {
  const dashboardCardArray = dashboardCards?.map((dashboardCard) => (
    <DashboardCard
      className={styles.dashboardCard}
      {...dashboardCard} />
  ));
  return (
    <div className={cx(styles.dashboardCardList, className)}>
      {dashboardCardArray}
    </div>
  );
};

DashboardCardList.defaultProps = defaultProps;

export default DashboardCardList;
