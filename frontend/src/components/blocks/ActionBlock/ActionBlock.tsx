import React from 'react';
import cx from 'classnames';

import styles from './ActionBlock.module.scss';

import Text, { TextProps } from '../../atoms/Text';
import Button, { ButtonProps } from '../../atoms/Button';
import { useTranslation } from 'react-i18next';

export const defaultProps = {
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
  text?: TextProps;
  button?: ButtonProps;
  className?: string;
};

const onButtonClicked = () => {
  window.open('https://canlease.net/contact/', "_blank")
}

const ActionBlock: React.FC<ActionBlockProps> = ({
  text,
  button,
  className,
}) => {
  const { t } = useTranslation();
  const descriptionText = t('contact_us.description');
  const buttonText = t('contact_us.button_text');

  text = {
    ...defaultProps.text,
    value: descriptionText
  }

  button = {
    ...defaultProps.button,
    text:{
      ...defaultProps.button.text,
      value: buttonText
    }
  }

  return (
    <div className={cx(styles.actionBlock, className)}>
      <Text
        className={styles.text}
        {...text} />
      <Button
        className={styles.button}
        {...button}
        onButtonClicked={onButtonClicked}/>
    </div>
  );
};

ActionBlock.defaultProps = defaultProps;

export default ActionBlock;
