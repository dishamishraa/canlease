import React from 'react';
import cx from 'classnames';

import styles from './ConfirmationModal.module.scss';

import Icon, { IconProps } from '../../atoms/Icon';
import Text, { TextProps } from '../../atoms/Text';
import Button, { ButtonProps } from '../../atoms/Button';

export const defaultProps = {
  icon: {
    asset: 'Close',
    style: 'Basic800',
  } as IconProps,
  title: {
    style: 'Basic800',
    align: 'Left',
    size: 'Large',
    type: 'Heading1',
  } as TextProps,
  body: {
    style: 'Basic800',
    align: 'Left',
    size: 'Large',
    type: 'Paragraph1',
  } as TextProps,
  primary: {
    type: 'Button',
    size: 'Large',
    fill: 'Colour',
    colour: 'Danger',
    text: {
      style: 'Basic100',
      align: 'Center',
      size: 'Small',
      type: 'ButtonGiant',
    },
  } as ButtonProps,
  secondary: {
    type: 'Button',
    size: 'Large',
    fill: 'Basic',
    colour: 'Basic',
    text: {
      style: 'Brand500',
      align: 'Center',
      size: 'Small',
      type: 'ButtonGiant',
    },
  } as ButtonProps,
};

export type ConfirmationModalProps = {
  icon?: IconProps;
  title?: TextProps;
  body?: TextProps;
  primary?: ButtonProps;
  secondary?: ButtonProps;
  className?: string;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  icon,
  title,
  body,
  primary,
  secondary,
  className,
}) => {
  return (
    <div className={cx(styles.confirmationModal, className)}>
      <div className={styles.topContainer}>
        <Icon
          className={styles.icon}
          {...icon} />
      </div>
      <div className={styles.container}>
        <Text
          className={styles.title}
          {...title} />
        <Text
          className={styles.body}
          {...body} />
        <div className={styles.buttonGroup}>
          <Button
            className={styles.primary}
            {...primary} />
          <Button
            className={styles.secondary}
            {...secondary} />
        </div>
      </div>
    </div>
  );
};

ConfirmationModal.defaultProps = defaultProps;

export default ConfirmationModal;
