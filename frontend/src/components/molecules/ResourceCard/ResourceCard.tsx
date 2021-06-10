import React from 'react';
import cx from 'classnames';

import styles from './ResourceCard.module.scss';

import Image, { ImageProps } from '../../atoms/Image';
import Text, { TextProps } from '../../atoms/Text';
import Button, { ButtonProps } from '../../atoms/Button';

export const defaultProps = {
  titleText: {
    style: 'Basic800',
    align: 'Left',
    size: 'Large',
    type: 'Heading3',
  } as TextProps,
  paragraphText: {
    style: 'Basic600',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph2',
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

export type ResourceCardProps = {
  image?: ImageProps;
  titleText?: TextProps;
  paragraphText?: TextProps;
  button?: ButtonProps;
  className?: string;
};

const ResourceCard: React.FC<ResourceCardProps> = ({
  image,
  titleText,
  paragraphText,
  button,
  className,
}) => {
  return (
    <div className={cx(styles.resourceCard, className)}>
      <Image
        className={styles.image}
        {...image} />
      <div className={styles.content}>
        <Text
          className={styles.titleText}
          {...titleText} />
        <Text
          className={styles.paragraphText}
          {...paragraphText} />
        <Button
          className={styles.button}
          {...button} />
      </div>
      <div className={styles.conent}>
        <Text
          className={styles.titleText}
          {...titleText} />
        <Text
          className={styles.paragraphText}
          {...paragraphText} />
        <Button
          className={styles.button}
          {...button} />
      </div>
    </div>
  );
};

ResourceCard.defaultProps = defaultProps;

export default ResourceCard;
