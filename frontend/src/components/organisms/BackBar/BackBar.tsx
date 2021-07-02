import React from 'react';
import cx from 'classnames';

import styles from './BackBar.module.scss';

import Button, { ButtonProps } from '../../atoms/Button';

export const defaultProps = {
  backButton: {
    type: 'IconTextButton',
    size: 'Small',
    fill: 'None',
    colour: 'Basic',
    icon: {
      asset: 'ArrowLeft',
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

export type BackBarProps = {
  backButton?: ButtonProps;
  className?: string;
};

const BackBar: React.FC<BackBarProps> = ({
  backButton,
  className,
}) => (
    <div className={cx(styles.backBar, className)}>
      <Button
        className={styles.backButton}
        {...backButton} />
    </div>
);

BackBar.defaultProps = defaultProps;

export default BackBar;
