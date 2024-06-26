import React from 'react';
import cx from 'classnames';

import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
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
    show: true,
  } as ButtonProps,
};

export type TopBarProps = {
  showBackButton?: boolean;
  backButton?: ButtonProps;
  className?: string;
  show?: boolean;
};

const TopBar: React.FC<TopBarProps> = ({
  showBackButton,
  className,
}) => {
  const { t } = useTranslation();
  const { goBack } = useHistory();

  const backButton: ButtonProps = { ...defaultProps.backButton };
  backButton.text = {
    ...defaultProps.backButton.text,
    value: t('back_button'),
  };
  backButton.visible = showBackButton;
  backButton.onButtonClicked = goBack;

  return (
    <div className={cx(styles.topBar, className)}>
      <Button
        className={styles.backButton}
        {...backButton} />
    </div>
  );
};

TopBar.defaultProps = defaultProps;

export default TopBar;
