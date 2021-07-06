import React from 'react';
import cx from 'classnames';

import styles from './RadiobuttonList.module.scss';

import RadioButtonItem, { RadioButtonItemProps } from '../../atoms/RadioButtonItem';

export const defaultProps = {
  radioButtonItems: [
  ] as RadioButtonItemProps[],
};

export type RadiobuttonListProps = {
  radioButtonItems?: RadioButtonItemProps[];
  className?: string;
};

const RadiobuttonList: React.FC<RadiobuttonListProps> = ({
  radioButtonItems,
  className,
}) => {
  const radioButtonItemArray = radioButtonItems?.map((radioButtonItem) => (
    <RadioButtonItem
      className={styles.radioButtonItem}
      {...radioButtonItem} />
  ));
  return (
    <div className={cx(styles.radiobuttonList, className)}>
      {radioButtonItemArray}
    </div>
  );
};

RadiobuttonList.defaultProps = defaultProps;

export default RadiobuttonList;
