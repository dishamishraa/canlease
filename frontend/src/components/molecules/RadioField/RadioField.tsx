import React from 'react';
import cx from 'classnames';

import styles from './RadioField.module.scss';

import Text, { TextProps } from '../../atoms/Text';
import RadioButtonItem, { RadioButtonItemProps } from '../../atoms/RadioButtonItem';

export const defaultProps = {
  label: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
  radioButtonItem: {
    state: 'Unselected',
    icon: {
      asset: 'RadioButtonOff',
      style: 'Basic800',
    },
    text: {
      style: 'Basic800',
      align: 'Left',
      size: 'Large',
      type: 'Paragraph1',
    },
  } as RadioButtonItemProps,
};

export type RadioFieldProps = {
  label?: TextProps;
  radioButtonItem?: RadioButtonItemProps;
  className?: string;
};

const RadioField: React.FC<RadioFieldProps> = ({
  label,
  radioButtonItem,
  className,
}) => (
    <div className={cx(styles.radioField, className)}>
      <Text
        className={styles.label}
        {...label} />
      <RadioButtonItem
        className={styles.radioButtonItem}
        {...radioButtonItem} />
      <RadioButtonItem
        className={styles.radioButtonItem}
        {...radioButtonItem} />
    </div>
);

RadioField.defaultProps = defaultProps;

export default RadioField;
