import React from 'react';
import cx from 'classnames';

import styles from './RateCardTableItem.module.scss';

import Text, { TextProps } from '../../atoms/Text';
import Button, { ButtonProps } from '../../atoms/Button';

export type RateCardTableItemTypeType = 'Default' | 'Empty';

export const defaultProps = {
  type: 'Default' as RateCardTableItemTypeType,
  term: {
    style: 'Basic600',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
  minMonthlyReturn: {
    style: 'Basic600',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
  maxMonthlyReturn: {
    style: 'Basic600',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
  interestRate: {
    style: 'Basic600',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
  tenAtEndOfInterestRate: {
    style: 'Basic600',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
  editButton: {
    type: 'Icon',
    size: 'Medium',
    fill: 'Basic',
    colour: 'Basic',
    icon: {
      asset: 'Edit',
      style: 'Brand500',
    },
  } as ButtonProps,
  deleteButton: {
    type: 'Icon',
    size: 'Medium',
    fill: 'Basic',
    colour: 'Basic',
    icon: {
      asset: 'Trash',
      style: 'Red200',
    },
  } as ButtonProps,
  button: {
    type: 'IconTextButton',
    size: 'Medium',
    fill: 'None',
    colour: 'Basic',
    icon: {
      asset: 'Plus',
      style: 'Brand500',
    },
    text: {
      style: 'Brand500',
      align: 'Center',
      size: 'Small',
      type: 'ButtonGiant',
    },
  } as ButtonProps,
};

export type RateCardTableItemProps = {
  type?: RateCardTableItemTypeType;
  term?: TextProps;
  minMonthlyReturn?: TextProps;
  maxMonthlyReturn?: TextProps;
  interestRate?: TextProps;
  tenAtEndOfInterestRate?: TextProps;
  editButton?: ButtonProps;
  deleteButton?: ButtonProps;
  className?: string;
  button?: ButtonProps;
  id?: string;
};

const RateCardTableItem: React.FC<RateCardTableItemProps> = ({
  type,
  term,
  minMonthlyReturn,
  maxMonthlyReturn,
  interestRate,
  tenAtEndOfInterestRate,
  editButton,
  deleteButton,
  className,
  button,
}) => {
  const currentStyle = styles[`rateCardTableItem${type}`];

  let termView;
  let minMonthlyReturnView;
  let maxMonthlyReturnView;
  let interestRateView;
  let tenAtEndOfInterestRateView;
  let buttonGroupView;
  let buttonView;

  switch (type) {
    case 'Default':
      termView = (
        <Text
          className={styles.term}
          {...term} />
      );
      minMonthlyReturnView = (
        <Text
          className={styles.minMonthlyReturn}
          {...minMonthlyReturn} />
      );
      maxMonthlyReturnView = (
        <Text
          className={styles.maxMonthlyReturn}
          {...maxMonthlyReturn} />
      );
      interestRateView = (
        <Text
          className={styles.interestRate}
          {...interestRate} />
      );
      tenAtEndOfInterestRateView = (
        <Text
          className={styles.tenAtEndOfInterestRate}
          {...tenAtEndOfInterestRate} />
      );
      buttonGroupView = (
        <div className={styles.buttonGroup}>
          <Button
            className={styles.editButton}
            {...editButton} />
          <Button
            className={styles.deleteButton}
            {...deleteButton} />
        </div>
      );
      break;
    case 'Empty':
      buttonView = (
        <Button
          className={styles.button}
          {...button} />
      );
      break;
  }

  return (
    <div className={cx(currentStyle, className)}>
      {termView}
      {buttonView}
      {minMonthlyReturnView}
      {maxMonthlyReturnView}
      {interestRateView}
      {tenAtEndOfInterestRateView}
      {buttonGroupView}
    </div>
  );
};

RateCardTableItem.defaultProps = defaultProps;

export default RateCardTableItem;
