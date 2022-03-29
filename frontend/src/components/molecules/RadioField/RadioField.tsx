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
  radioButtonItems: [{
    state: 'Unselected',
    unselectedIcon: {
      asset: 'RadioButtonOff',
      style: 'Brand500',
    },
    text: {
      style: 'Basic800',
      align: 'Left',
      size: 'Large',
      type: 'Paragraph1',
    },
  }] as RadioButtonItemProps[],
};

export type RadioFieldProps = {
  label?: TextProps;
  radioButtonItems?: RadioButtonItemProps[];
  className?: string;
};

const RadioField: React.FC<RadioFieldProps> = ({
  label,
  radioButtonItems,
  className,
}) => {
  const radioButtonItemsArray = radioButtonItems?.map((radioButtonItem, index) => (
    <RadioButtonItem
      key={index}
      className={styles.radioButtonItem}
      {...radioButtonItem} />
  ));
  return (
      <div className={cx(styles.radioField, className)}>
      <Text
        className={styles.label}
        {...label} />
      {radioButtonItemsArray}
    </div>
  );
};

RadioField.defaultProps = defaultProps;

export default RadioField;
