import React from 'react';
import cx from 'classnames';

import styles from './Stepper.module.scss';

import Text, { TextProps } from '../Text';

export const defaultProps = {
  text: {
    style: 'Brand500',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph3',
  } as TextProps,
};

export type StepperProps = {
  text?: TextProps;
  className?: string;
};

const Stepper: React.FC<StepperProps> = ({
  text,
  className,
}) => {
  return (
    <div className={cx(styles.stepper, className)}>
      <Text
        className={styles.text}
        {...text} />
    </div>
  );
};

Stepper.defaultProps = defaultProps;

export default Stepper;
