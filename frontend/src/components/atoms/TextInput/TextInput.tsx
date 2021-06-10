import React from 'react';
import cx from 'classnames';

import styles from './TextInput.module.scss';

import Text, { TextProps } from '../Text';
import Icon, { IconProps } from '../Icon';

export type TextInputTypeType = 'Text' | 'Password' | 'TextArea';

export const defaultProps = {
  type: 'Password' as TextInputTypeType,
  icon: {
    asset: 'Show',
    style: 'Basic400',
  } as IconProps,
};

export type TextInputProps = {
  type?: TextInputTypeType;
  textValue?: string;
  textPlaceholder?: string;
  onTextChanged?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  className?: string;
  icon?: IconProps;
};

const TextInput: React.FC<TextInputProps> = ({
  type,
  textValue,
  textPlaceholder,
  onTextChanged,
  className,
  icon,
}) => {

  const currentStyle = styles[`textInput${type}`];

  const textView = (
    <input
      placeholder={textPlaceholder}
      value={textValue}
      onChange={onTextChanged}
      className={styles.text}/>
  );
  
  let iconView;
  
  switch (type) {
    case 'Text':
      break;
    case 'Password':
      iconView = (
        <Icon
          className={styles.icon}
          {...icon} />
      );
      break;
    case 'TextArea':
      break;
  }

  return (
    <div className={cx(currentStyle, className)}>
      {textView}
      {iconView}
    </div>
  );
};

TextInput.defaultProps = defaultProps;

export default TextInput;
