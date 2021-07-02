import React from 'react';
import cx from 'classnames';

import styles from './LeaseDetailsSection.module.scss';

import DetailItemList, { DetailItemListProps } from '../DetailItemList';

export const defaultProps = {
  detailItemList: {
    quoteDetailItems: [
    ],
  } as DetailItemListProps,
};

export type LeaseDetailsSectionProps = {
  detailItemList?: DetailItemListProps;
  className?: string;
};

const LeaseDetailsSection: React.FC<LeaseDetailsSectionProps> = ({
  detailItemList,
  className,
}) => (
    <div className={cx(styles.leaseDetailsSection, className)}>
      <DetailItemList
        className={styles.detailItemList}
        {...detailItemList} />
    </div>
);

LeaseDetailsSection.defaultProps = defaultProps;

export default LeaseDetailsSection;
