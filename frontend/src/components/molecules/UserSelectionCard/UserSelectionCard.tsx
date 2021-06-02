import React from 'react';
import cx from 'classnames';

import styles from './UserSelectionCard.module.scss';

import Image, { ImageProps } from '../../atoms/Image';
import Text, { TextProps } from '../../atoms/Text';
import Button, { ButtonProps } from '../../atoms/Button';

export const defaultProps = {
  text: {
    style: 'Basic800',
    align: 'Center',
    size: 'Large',
    type: 'Heading2',
  } as TextProps,
  button: {
    type: 'Button',
    size: 'Small',
    fill: 'None',
    colour: 'Basic',
    text: {
      style: 'Brand500',
      align: 'Center',
      size: 'Small',
      type: 'ButtonGiant',
    },
  } as ButtonProps,
};

export type UserSelectionCardProps = {
  image?: ImageProps;
  text?: TextProps;
  button?: ButtonProps;
  className?: string;
};

const UserSelectionCard: React.FC<UserSelectionCardProps> = ({
  image,
  text,
  button,
  className,
}) => {
  return (
    <div className={cx(styles.userSelectionCard, className)}>
      <Image
        className={styles.image}
        {...image} />
      <div className={styles.contect}>
        <Text
          className={styles.text}
          {...text} />
        <Button
          className={styles.button}
          {...button} />
      </div>
    </div>
  );
};

UserSelectionCard.defaultProps = defaultProps;

export default UserSelectionCard;
