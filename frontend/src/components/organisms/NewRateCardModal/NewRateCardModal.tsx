import React from 'react';
import cx from 'classnames';

import styles from './NewRateCardModal.module.scss';

import Icon, { IconProps } from '../../atoms/Icon';
import Text, { TextProps } from '../../atoms/Text';
import TextField, { TextFieldProps } from '../../molecules/TextField';
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
  textField: {
    state: 'Default',
    type: 'Text',
    label: {
      style: 'Basic800',
      align: 'Left',
      size: 'Medium',
      type: 'Paragraph2',
    },
    textInput: {
      type: 'Text',
    },
  } as TextFieldProps,
  primary: {
    type: 'Button',
    size: 'Large',
    fill: 'Colour',
    colour: 'Brand',
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

export type NewRateCardModalProps = {
  icon?: IconProps;
  title?: TextProps;
  textField?: TextFieldProps;
  primary?: ButtonProps;
  secondary?: ButtonProps;
  className?: string;
};

const NewRateCardModal: React.FC<NewRateCardModalProps> = ({
  icon,
  title,
  textField,
  primary,
  secondary,
  className,
}) => {
  return (
    <div className={cx(styles.newRateCardModal, className)}>
      <div className={styles.topContainer}>
        <Icon
          className={styles.icon}
          {...icon} />
      </div>
      <div className={styles.container}>
        <Text
          className={styles.title}
          {...title} />
        <TextField
          className={styles.textField}
          {...textField} />
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

NewRateCardModal.defaultProps = defaultProps;

export default NewRateCardModal;
