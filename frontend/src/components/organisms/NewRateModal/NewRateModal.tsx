import React from 'react';
import cx from 'classnames';

import styles from './NewRateModal.module.scss';

import Icon, { IconProps } from '../../atoms/Icon';
import Text, { TextProps } from '../../atoms/Text';
import TextFieldList, { TextFieldListProps } from '../TextFieldList';
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
  textFieldList: {
    textFields: [
    ],
  } as TextFieldListProps,
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

export type NewRateModalProps = {
  icon?: IconProps;
  title?: TextProps;
  textFieldList?: TextFieldListProps;
  primary?: ButtonProps;
  secondary?: ButtonProps;
  className?: string;
};

const NewRateModal: React.FC<NewRateModalProps> = ({
  icon,
  title,
  textFieldList,
  primary,
  secondary,
  className,
}) => {
  return (
    <div className={cx(styles.newRateModal, className)}>
      <div className={styles.topContainer}>
        <Icon
          className={styles.icon}
          {...icon} />
      </div>
      <div className={styles.container}>
        <Text
          className={styles.title}
          {...title} />
        <TextFieldList
          className={styles.textFieldList}
          {...textFieldList} />
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

NewRateModal.defaultProps = defaultProps;

export default NewRateModal;
