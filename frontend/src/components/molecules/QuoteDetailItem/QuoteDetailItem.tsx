import React from 'react';
import cx from 'classnames';

import styles from './QuoteDetailItem.module.scss';

import Text, { TextProps } from '../../atoms/Text';

export type QuoteDetailItemTypeType = 'Type1' | 'Type2' | 'Type3';

export const defaultProps = {
  type: 'Type3' as QuoteDetailItemTypeType,
  labelText: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph3',
  } as TextProps,
  infoText: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
};

export type QuoteDetailItemProps = {
  type?: QuoteDetailItemTypeType;
  labelText?: TextProps;
  infoText?: TextProps;
  className?: string;
};

const QuoteDetailItem: React.FC<QuoteDetailItemProps> = ({
  type,
  labelText,
  infoText,
  className,
}) => {

  const currentStyle = styles[`quoteDetailItem${type}`];

  let labelTextView;
  let infoTextView;
  
  switch (type) {
    case 'Type1':
      labelTextView = (
        <Text
          className={styles.labelText}
          {...labelText} />
      );
      infoTextView = (
        <Text
          className={styles.infoText}
          {...infoText} />
      );
      break;
    case 'Type2':
      labelTextView = (
        <Text
          className={styles.labelText}
          {...labelText} />
      );
      infoTextView = (
        <Text
          className={styles.infoText}
          {...infoText} />
      );
      break;
    case 'Type3':
      break;
  }

  return (
    <div className={cx(currentStyle, className)}>
      {labelTextView}
      {infoTextView}
    </div>
  );
};

QuoteDetailItem.defaultProps = defaultProps;

export default QuoteDetailItem;
