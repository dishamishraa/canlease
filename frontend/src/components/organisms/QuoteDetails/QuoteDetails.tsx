import React from 'react';
import cx from 'classnames';

import styles from './QuoteDetails.module.scss';

import Text, { TextProps } from '../../atoms/Text';

export const defaultProps = {
  text: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph3',
  } as TextProps,
};

export type QuoteDetailsProps = {
  text?: TextProps;
  className?: string;
};

const QuoteDetails: React.FC<QuoteDetailsProps> = ({
  text,
  className,
}) => (
    <div className={cx(styles.quoteDetails, className)}>
      <div className={styles.row}>
        <Text
          className={styles.text}
          {...text} />
        <Text
          className={styles.text}
          {...text} />
      </div>
    </div>
);

QuoteDetails.defaultProps = defaultProps;

export default QuoteDetails;
