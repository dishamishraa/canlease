import React from 'react';
import cx from 'classnames';

import styles from './TextInput.module.scss';

import Text, { TextProps } from '../Text';

export const defaultProps = {
};

export type TextInputProps = {
  textValue?: string;
  textPlaceholder?: string;
  onTextChanged?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  className?: string;
};

const TextInput: React.FC<TextInputProps> = ({
  textValue,
  textPlaceholder,
  onTextChanged,
  className,
}) => {
  return (
    <div className={cx(styles.textInput, className)}>
      <input
        placeholder={textPlaceholder}
        value={textValue}
        onChange={onTextChanged}
        className={styles.text}/>
    </div>
  );
};

TextInput.defaultProps = defaultProps;

export default TextInput;
