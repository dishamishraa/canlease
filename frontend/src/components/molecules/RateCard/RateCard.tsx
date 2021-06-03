import React from 'react';
import cx from 'classnames';

import styles from './RateCard.module.scss';

import Text, { TextProps } from '../../atoms/Text';

export const defaultProps = {
  text: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
};

export type RateCardProps = {
  text?: TextProps;
  className?: string;
};

const RateCard: React.FC<RateCardProps> = ({
  text,
  className,
}) => {
  return (
    <div className={cx(styles.rateCard, className)}>
      <div className={styles.row}>
        <Text
          className={styles.text}
          {...text} />
        <Text
          className={styles.text}
          {...text} />
      </div>
      <div className={styles.row}>
        <Text
          className={styles.text}
          {...text} />
      </div>
    </div>
  );
};

RateCard.defaultProps = defaultProps;

export default RateCard;
