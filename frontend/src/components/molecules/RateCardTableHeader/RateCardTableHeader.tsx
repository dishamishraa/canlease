import React from 'react';
import cx from 'classnames';

import styles from './RateCardTableHeader.module.scss';

import Text, { TextProps } from '../../atoms/Text';

export const defaultProps = {
  companyName: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph3',
  } as TextProps,
  contactName: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph3',
  } as TextProps,
  status: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph3',
  } as TextProps,
  createOn: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph3',
  } as TextProps,
  assetName: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph3',
  } as TextProps,
  cost: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph3',
  } as TextProps,
};

export type RateCardTableHeaderProps = {
  companyName?: TextProps;
  contactName?: TextProps;
  status?: TextProps;
  createOn?: TextProps;
  assetName?: TextProps;
  cost?: TextProps;
  className?: string;
};

const RateCardTableHeader: React.FC<RateCardTableHeaderProps> = ({
  companyName,
  contactName,
  status,
  createOn,
  assetName,
  cost,
  className,
}) => {
  return (
    <div className={cx(styles.rateCardTableHeader, className)}>
      <Text
        className={styles.companyName}
        {...companyName} />
      <Text
        className={styles.contactName}
        {...contactName} />
      <Text
        className={styles.status}
        {...status} />
      <Text
        className={styles.createOn}
        {...createOn} />
      <Text
        className={styles.assetName}
        {...assetName} />
      <Text
        className={styles.cost}
        {...cost} />
    </div>
  );
};

RateCardTableHeader.defaultProps = defaultProps;

export default RateCardTableHeader;
