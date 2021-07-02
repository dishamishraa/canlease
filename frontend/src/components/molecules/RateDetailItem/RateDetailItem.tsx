import React from 'react';
import cx from 'classnames';

import styles from './RateDetailItem.module.scss';

import Text, { TextProps } from '../../atoms/Text';

export type RateDetailItemTypeType = 'PerMonth' | 'Text';

export const defaultProps = {
  type: 'Text' as RateDetailItemTypeType,
  numberText: {
    style: 'Brand500',
    align: 'Left',
    size: 'Large',
    type: 'CardData',
  } as TextProps,
  suffixText: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
};

export type RateDetailItemProps = {
  type?: RateDetailItemTypeType;
  numberText?: TextProps;
  suffixText?: TextProps;
  className?: string;
};

const RateDetailItem: React.FC<RateDetailItemProps> = ({
  type,
  numberText,
  suffixText,
  className,
}) => {
  const currentStyle = styles[`rateDetailItem${type}`];

  const suffixTextView = (
    <Text
      className={styles.suffixText}
      {...suffixText} />
  );

  let numberTextView;

  switch (type) {
    case 'PerMonth':
      numberTextView = (
        <Text
          className={styles.numberText}
          {...numberText} />
      );
      break;
    case 'Text':
      break;
  }

  return (
    <div className={cx(currentStyle, className)}>
      {numberTextView}
      {suffixTextView}
    </div>
  );
};

RateDetailItem.defaultProps = defaultProps;

export default RateDetailItem;
