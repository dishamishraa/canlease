/* eslint-disable default-case */
import React from 'react';
import cx from 'classnames';

import styles from './TextInput.module.scss';

import Icon, { IconProps } from '../Icon';

export type TextInputTypeType = 'Text' | 'Password' | 'TextArea';
export type HTMLInputType = 'text' | 'password' | 'number' | 'date' ;

export const defaultProps = {
  type: 'Text' as TextInputTypeType,
  icon: {
    asset: 'Show',
    style: 'Basic400',
  } as IconProps,
};

export type TextInputProps = {
  type?: TextInputTypeType;
  textValue?: string;
  textPlaceholder?: string;
  onTextChanged?: (
    event: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  className?: string;
  icon?: IconProps;
  inputType?: HTMLInputType;
  min?: string;
  max?: string;
  disabled?: boolean;
};

const TextInput: React.FC<TextInputProps> = ({
  type,
  textValue,
  textPlaceholder,
  onTextChanged,
  className,
  icon,
  inputType,
  min,
  max,
  disabled,
}) => {
  const currentStyle = disabled
    ? styles[`textInput${type}Disabled`]
    : styles[`textInput${type}`];

  const textView = (
    <input
      type={inputType}
      disabled={disabled}
      placeholder={textPlaceholder}
      value={textValue}
      onChange={onTextChanged}
      min={min}
      max={max}
      className={styles.text}/>
  );

  let iconView;

  switch (type) {
    case 'Text':
      break;
    case 'Password':
      iconView = <Icon className={styles.icon} {...icon} />;
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
