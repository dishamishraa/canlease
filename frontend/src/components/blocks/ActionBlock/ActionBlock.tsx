import React from 'react';
import cx from 'classnames';

import styles from './ActionBlock.module.scss';

import Text, { TextProps } from '../../atoms/Text';
import Button, { ButtonProps } from '../../atoms/Button';

export const defaultProps = {
  promptText: {
    style: 'Basic800',
    align: 'Center',
    size: 'Large',
    type: 'Paragraph1',
  } as TextProps,
  actionButton: {
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
  text: {
    style: 'Basic800',
    align: 'Center',
    size: 'Large',
    type: 'Paragraph1',
  } as TextProps,
  button: {
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

export type ActionBlockProps = {
  promptText?: TextProps;
  actionButton?: ButtonProps;
  className?: string;
  text?: TextProps;
  button?: ButtonProps;
};

const ActionBlock: React.FC<ActionBlockProps> = ({
  promptText,
  actionButton,
  className,
  text,
  button,
}) => {
  return (
    <div className={cx(styles.actionBlock, className)}>
      <Text
        className={styles.text}
        {...text} />
      <Button
        className={styles.button}
        {...button} />
      <Text
        className={styles.promptText}
        {...promptText} />
      <Button
        className={styles.actionButton}
        {...actionButton} />
    </div>
  );
};

ActionBlock.defaultProps = defaultProps;

export default ActionBlock;
