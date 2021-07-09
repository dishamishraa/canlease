import React from 'react';
import cx from 'classnames';

import styles from './TextFieldList.module.scss';

import TextField, { TextFieldProps } from '../../molecules/TextField';

export const defaultProps = {
  textFields: [
  ] as TextFieldProps[],
};

export type TextFieldListProps = {
  textFields?: TextFieldProps[];
  className?: string;
};

const TextFieldList: React.FC<TextFieldListProps> = ({
  textFields,
  className,
}) => {
  const textFieldItemArray = textFields?.map((textField) => (
    <TextField
      className={styles.textFieldItem}
      {...textField} />
  ));

  return (
    <div className={cx(styles.textFieldList, className)}>
      {textFieldItemArray}
    </div>
  );
};

TextFieldList.defaultProps = defaultProps;

export default TextFieldList;
