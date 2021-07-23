import React from 'react';
import cx from 'classnames';

import styles from './DashboardRateCard.module.scss';

import Text, { TextProps } from '../../atoms/Text';
import Button, { ButtonProps } from '../../atoms/Button';
import Image, { ImageProps } from '../../atoms/Image';

export type DashboardRateCardTypeType = 'RateCard' | 'AddRateCard';

export const defaultProps = {
  type: 'AddRateCard' as DashboardRateCardTypeType,
  dataText: {
    style: 'Basic800',
    align: 'Left',
    size: 'Large',
    type: 'Heading2',
  } as TextProps,
  button: {
    type: 'Button',
    size: 'Medium',
    fill: 'Basic',
    colour: 'Basic',
    text: {
      style: 'Brand500',
      align: 'Center',
      size: 'Small',
      type: 'ButtonGiant',
    },
  } as ButtonProps,
  viewButton: {
    type: 'Button',
    size: 'Small',
    text: {
      style: 'Brand500',
      align: 'Center',
      size: 'Small',
      type: 'ButtonGiant',
    },
  } as ButtonProps,
  deleteButton: {
    type: 'Button',
    size: 'Small',
    text: {
      style: 'Red200',
      align: 'Center',
      size: 'Small',
      type: 'ButtonGiant',
    },
  } as ButtonProps,
};

export type DashboardRateCardProps = {
  type?: DashboardRateCardTypeType;
  dataText?: TextProps;
  button?: ButtonProps;
  className?: string;
  image?: ImageProps;
  deleteButton?: ButtonProps;
  viewButton?: ButtonProps;
};

const DashboardRateCard: React.FC<DashboardRateCardProps> = ({
  type,
  dataText,
  button,
  className,
  image,
  deleteButton,
  viewButton,
}) => {
  const currentStyle = styles[`dashboardRateCard${type}`];

  let dataTextView;
  let contentView;
  let bottamContentView;
  let buttonView;

  switch (type) {
    case 'RateCard':
      dataTextView = (
        <Text
          className={styles.dataText}
          {...dataText} />
      );
      bottamContentView = (
        <div className={styles.bottamContent}>
          <Button
            className={styles.button}
            {...viewButton} />
          <Button
            className={styles.button}
            {...deleteButton} />
        </div>
      );
      break;
    case 'AddRateCard':
      contentView = (
        <div className={styles.content}>
          <Image
            className={styles.image}
            {...image} />
        </div>
      );
      buttonView = (
        <Button
          className={styles.button}
          {...button} />
      );
      break;
  }

  return (
    <div className={cx(currentStyle, className)}>
      {dataTextView}
      {contentView}
      {bottamContentView}
      {buttonView}
    </div>
  );
};

DashboardRateCard.defaultProps = defaultProps;

export default DashboardRateCard;
