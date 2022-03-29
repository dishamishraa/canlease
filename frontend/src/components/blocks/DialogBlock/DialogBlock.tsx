import React from 'react';
import cx from 'classnames';

import styles from './DialogBlock.module.scss';

import Image, { ImageProps } from '../../atoms/Image';
import Text, { TextProps } from '../../atoms/Text';
import Button, { ButtonProps } from '../../atoms/Button';

export const defaultProps = {
  blockHeading: {
    style: 'Basic800',
    align: 'Left',
    size: 'Large',
    type: 'Heading1',
  } as TextProps,
  description: {
    style: 'Basic800',
    align: 'Left',
    size: 'Large',
    type: 'Paragraph1',
  } as TextProps,
  questionText: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph3',
  } as TextProps,
  resolutionText: {
    style: 'Basic800',
    align: 'Left',
    size: 'Large',
    type: 'Paragraph1',
  } as TextProps,
  doneButton: {
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
};

export type DialogBlockProps = {
  email?: string;
  contentType?: 'VerifyEmail' | 'ResetLink' | 'ApplicationSubmitted';
  image?: ImageProps;
  blockHeading?: TextProps;
  description?: TextProps;
  questionText?: TextProps;
  resolutionText?: TextProps;
  doneButton?: ButtonProps;
  className?: string;
  handleDone?: () => void;
};

const DialogBlock: React.FC<DialogBlockProps> = ({
  image,
  blockHeading,
  description,
  questionText,
  resolutionText,
  doneButton,
  className,
}) => (
    <div className={cx(styles.dialogBlock, className)}>
      <div className={styles.topContent}>
        <div className={styles.headingContent}>
          <Image
            className={styles.image}
            {...image} />
          <Text
            className={styles.blockHeading}
            {...blockHeading} />
          <Text
            className={styles.description}
            {...description} />
        </div>
        <div className={styles.midContent}>
          <Text
            className={styles.questionText}
            {...questionText} />
          <Text
            className={styles.resolutionText}
            {...resolutionText} />
        </div>
        <Button
          className={styles.doneButton}
          {...doneButton} />
      </div>
    </div>
);

DialogBlock.defaultProps = defaultProps;

export default DialogBlock;
