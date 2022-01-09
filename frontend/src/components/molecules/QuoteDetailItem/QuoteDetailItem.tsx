/* eslint-disable default-case */
import React from 'react';
import cx from 'classnames';

import styles from './QuoteDetailItem.module.scss';

import Text, { TextProps } from '../../atoms/Text';

export type QuoteDetailItemTypeType = 'Type1' | 'Type2';

export const defaultProps = {
  type: 'Type2' as QuoteDetailItemTypeType,
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

  const labelTextView = (
    <Text
      className={styles.labelText}
      {...labelText} />
  );
  const infoTextView = (
    <Text
      className={styles.infoText}
      {...infoText} />
  );

  switch (type) {
    case 'Type1':
      break;
    case 'Type2':
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
