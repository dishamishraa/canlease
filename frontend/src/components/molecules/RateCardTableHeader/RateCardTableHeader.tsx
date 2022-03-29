import React from 'react';
import cx from 'classnames';

import styles from './RateCardTableHeader.module.scss';

import Text, { TextProps } from '../../atoms/Text';

export const defaultProps = {
  term: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph3',
  } as TextProps,
  minMonthlyReturn: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph3',
  } as TextProps,
  maxMonthlyReturn: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph3',
  } as TextProps,
  interestRate: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph3',
  } as TextProps,
  tenAtEndOfInterestRate: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph3',
  } as TextProps,
  action: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph3',
  } as TextProps,
};

export type RateCardTableHeaderProps = {
  term?: TextProps;
  minMonthlyReturn?: TextProps;
  maxMonthlyReturn?: TextProps;
  interestRate?: TextProps;
  tenAtEndOfInterestRate?: TextProps;
  action?: TextProps;
  className?: string;
};

const RateCardTableHeader: React.FC<RateCardTableHeaderProps> = ({
  term,
  minMonthlyReturn,
  maxMonthlyReturn,
  interestRate,
  tenAtEndOfInterestRate,
  action,
  className,
}) => (
    <div className={cx(styles.rateCardTableHeader, className)}>
      <Text
        className={styles.term}
        {...term} />
      <Text
        className={styles.minMonthlyReturn}
        {...minMonthlyReturn} />
      <Text
        className={styles.maxMonthlyReturn}
        {...maxMonthlyReturn} />
      <Text
        className={styles.interestRate}
        {...interestRate} />
      <Text
        className={styles.tenAtEndOfInterestRate}
        {...tenAtEndOfInterestRate} />
      <Text
        className={styles.action}
        {...action} />
    </div>
);

RateCardTableHeader.defaultProps = defaultProps;

export default RateCardTableHeader;
