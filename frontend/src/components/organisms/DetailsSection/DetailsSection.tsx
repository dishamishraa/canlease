import React from 'react';
import cx from 'classnames';

import styles from './DetailsSection.module.scss';

import Text, { TextProps } from '../../atoms/Text';
import DetailItemList, { DetailItemListProps } from '../DetailItemList';
import Button, { ButtonProps } from '../../atoms/Button';

export type DetailsSectionTypeType = 'Default' | 'WithEditButton';

export const defaultProps = {
  type: 'WithEditButton' as DetailsSectionTypeType,
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
};

export type DetailsSectionProps = {
  type?: DetailsSectionTypeType;
  text?: TextProps;
  detailItemList?: DetailItemListProps;
  className?: string;
  button?: ButtonProps;
};

const DetailsSection: React.FC<DetailsSectionProps> = ({
  type,
  text,
  detailItemList,
  className,
  button,
}) => {

  const currentStyle = styles[`detailsSection${type}`];

  const detailItemListView = (
    <DetailItemList
      className={styles.detailItemList}
      {...detailItemList} />
  );
  
  let topContentView;
  
  switch (type) {
    case 'Default':
      topContentView = (
        <div className={styles.topContent}>
          <Text
            className={styles.text}
            {...text} />
        </div>
      );
      break;
    case 'WithEditButton':
      topContentView = (
        <div className={styles.topContent}>
          <Text
            className={styles.text}
            {...text} />
          <Button
            className={styles.button}
            {...button} />
        </div>
      );
      break;
  }

  return (
    <div className={cx(currentStyle, className)}>
      {topContentView}
      {detailItemListView}
    </div>
  );
};

DetailsSection.defaultProps = defaultProps;

export default DetailsSection;
