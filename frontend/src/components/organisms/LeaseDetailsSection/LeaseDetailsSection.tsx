import React from 'react';
import cx from 'classnames';

import styles from './LeaseDetailsSection.module.scss';

import DetailItemList, { DetailItemListProps } from '../DetailItemList';
import Text, { TextProps } from '../../atoms/Text';

export const defaultProps = {
  text: {
    style: 'Basic800',
    align: 'Left',
    size: 'Large',
    type: 'Heading2',
  } as TextProps,
  detailItemList: {
    quoteDetailItems: [
    ],
  } as DetailItemListProps,
};

export type LeaseDetailsSectionProps = {
  text?: TextProps;
  detailItemList?: DetailItemListProps;
  className?: string;
};

const LeaseDetailsSection: React.FC<LeaseDetailsSectionProps> = ({
  text,
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
