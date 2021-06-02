import React from 'react';
import cx from 'classnames';

import styles from './Modal.module.scss';

import Icon, { IconProps } from '../../atoms/Icon';
import Image, { ImageProps } from '../../atoms/Image';
import Text, { TextProps } from '../../atoms/Text';
import Button, { ButtonProps } from '../../atoms/Button';

export const defaultProps = {
  closeIcon: {
    asset: 'Close',
    style: 'Basic800',
  } as IconProps,
  titleText: {
    style: 'Basic800',
    align: 'Center',
    size: 'Large',
    type: 'Heading1',
  } as TextProps,
  descriptionText: {
    style: 'Basic800',
    align: 'Center',
    size: 'Large',
    type: 'Paragraph1',
  } as TextProps,
  primaryButton: {
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
  secondaryButton: {
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

export type ModalProps = {
  closeIcon?: IconProps;
  image?: ImageProps;
  titleText?: TextProps;
  descriptionText?: TextProps;
  primaryButton?: ButtonProps;
  secondaryButton?: ButtonProps;
  className?: string;
};

const Modal: React.FC<ModalProps> = ({
  closeIcon,
  image,
  titleText,
  descriptionText,
  primaryButton,
  secondaryButton,
  className,
}) => {
  return (
    <div className={cx(styles.modal, className)}>
      <div className={styles.topContent}>
        <Icon
          className={styles.closeIcon}
          {...closeIcon} />
      </div>
      <div className={styles.content}>
        <Image
          className={styles.image}
          {...image} />
        <Text
          className={styles.titleText}
          {...titleText} />
        <Text
          className={styles.descriptionText}
          {...descriptionText} />
        <Button
          className={styles.primaryButton}
          {...primaryButton} />
        <Button
          className={styles.secondaryButton}
          {...secondaryButton} />
      </div>
    </div>
  );
};

Modal.defaultProps = defaultProps;

export default Modal;
