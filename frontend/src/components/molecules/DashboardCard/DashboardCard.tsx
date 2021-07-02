import React from 'react';
import cx from 'classnames';

import styles from './DashboardCard.module.scss';

import Text, { TextProps } from '../../atoms/Text';
import Button, { ButtonProps } from '../../atoms/Button';
import Image, { ImageProps } from '../../atoms/Image';

export type DashboardCardTypeType = 'DataCard' | 'CreateQuoteCard' | 'LeaseCard';

export const defaultProps = {
  type: 'LeaseCard' as DashboardCardTypeType,
  dataText: {
    style: 'Brand500',
    align: 'Center',
    size: 'Large',
    type: 'Data',
  } as TextProps,
  labelText: {
    style: 'Basic600',
    align: 'Center',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
  button: {
    type: 'Button',
    size: 'Small',
    fill: 'None',
    colour: 'Basic',
    text: {
      style: 'Brand500',
      align: 'Center',
      size: 'Small',
      type: 'ButtonGiant',
    },
  } as ButtonProps,
  statusText: {
    style: 'Brand500',
    align: 'Center',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
  assetNameText: {
    style: 'Basic800',
    align: 'Center',
    size: 'Large',
    type: 'CardData',
  } as TextProps,
  costText: {
    style: 'Basic600',
    align: 'Center',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
  vendorNameText: {
    style: 'Basic800',
    align: 'Center',
    size: 'Large',
    type: 'Paragraph1',
  } as TextProps,
  numberText: {
    style: 'Basic600',
    align: 'Center',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
};

export type DashboardCardProps = {
  type?: DashboardCardTypeType;
  dataText?: TextProps;
  labelText?: TextProps;
  button?: ButtonProps;
  className?: string;
  statusText?: TextProps;
  assetNameText?: TextProps;
  costText?: TextProps;
  vendorNameText?: TextProps;
  numberText?: TextProps;
  image?: ImageProps;
};

const DashboardCard: React.FC<DashboardCardProps> = ({
  type,
  dataText,
  labelText,
  button,
  className,
  statusText,
  assetNameText,
  costText,
  vendorNameText,
  numberText,
  image,
}) => {

  const currentStyle = styles[`dashboardCard${type}`];

  const buttonView = (
    <Button
      className={styles.button}
      {...button} />
  );
  
  let contentView;
  
  switch (type) {
    case 'DataCard':
      contentView = (
        <div className={styles.content}>
          <Text
            className={styles.dataText}
            {...dataText} />
          <Text
            className={styles.labelText}
            {...labelText} />
        </div>
      );
      break;
    case 'LeaseCard':
      contentView = (
        <div className={styles.content}>
          <Text
            className={styles.statusText}
            {...statusText} />
          <Text
            className={styles.assetNameText}
            {...assetNameText} />
          <Text
            className={styles.costText}
            {...costText} />
          <Text
            className={styles.vendorNameText}
            {...vendorNameText} />
          <Text
            className={styles.numberText}
            {...numberText} />
        </div>
      );
      break;
    case 'CreateQuoteCard':
      contentView = (
        <div className={styles.content}>
          <Image
            className={styles.image}
            {...image} />
        </div>
      );
      break;
  }

  return (
    <div className={cx(currentStyle, className)}>
      {contentView}
      {buttonView}
    </div>
  );
};

DashboardCard.defaultProps = defaultProps;

export default DashboardCard;
