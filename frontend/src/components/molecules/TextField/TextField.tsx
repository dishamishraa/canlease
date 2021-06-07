import React from 'react';
import cx from 'classnames';

import styles from './TextField.module.scss';

import Text, { TextProps } from '../../atoms/Text';
import TextInput, { TextInputProps } from '../../atoms/TextInput';

export type TextFieldStateType = 'Default' | 'Error';
export type TextFieldTypeType = 'Text' | 'Password';

export const defaultProps = {
  state: 'Error' as TextFieldStateType,
  type: 'Password' as TextFieldTypeType,
  label: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
  textInput: {
    type: 'Password',
    icon: {
      asset: 'Show',
      style: 'Brand500',
    },
  } as TextInputProps,
  errorMessage: {
    style: 'Red200',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
};

export type TextFieldProps = {
  state?: TextFieldStateType;
  type?: TextFieldTypeType;
  label?: TextProps;
  textInput?: TextInputProps;
  className?: string;
  errorMessage?: TextProps;
};

const TextField: React.FC<TextFieldProps> = ({
  state,
  type,
  label,
  textInput,
  className,
  errorMessage,
}) => {

  const currentStyle = styles[`textField${state}${type}`];

  const labelView = (
    <Text
      className={styles.label}
      {...label} />
  );
  const textInputView = (
    <TextInput
      className={styles.textInput}
      {...textInput} />
  );
  
  let errorMessageView;
  
  switch (`${state}${type}`) {
    case 'DefaultText':
      break;
    case 'ErrorText':
      errorMessageView = (
        <Text
          className={styles.errorMessage}
          {...errorMessage} />
      );
      break;
    case 'DefaultPassword':
      break;
    case 'ErrorPassword':
      errorMessageView = (
        <Text
          className={styles.errorMessage}
          {...errorMessage} />
      );
      break;
  }

  return (
    <div className={cx(currentStyle, className)}>
      {labelView}
      {textInputView}
      {errorMessageView}
    </div>
  );
};

TextField.defaultProps = defaultProps;

export default TextField;
