import React from 'react';
import cx from 'classnames';

import styles from './TopBar.module.scss';

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

export type TopBarProps = {
  backButton?: ButtonProps;
  className?: string;
};

const TopBar: React.FC<TopBarProps> = ({
  backButton,
  className,
}) => (
    <div className={cx(styles.topBar, className)}>
      <Button
        className={styles.backButton}
        {...backButton} />
    </div>
);

TopBar.defaultProps = defaultProps;

export default TopBar;
