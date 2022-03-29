/* eslint-disable default-case */
import React from 'react';
import cx from 'classnames';

import styles from './TabItem.module.scss';

import Text, { TextProps } from '../Text';

export type TabItemStateType = 'Selected' | 'Unselected';

export const defaultProps = {
  state: 'Unselected' as TabItemStateType,
  text: {
    style: 'Basic400',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
};

export type TabItemProps = {
  state?: TabItemStateType;
  text?: TextProps;
  className?: string;
  onTabClicked?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
};

const TabItem: React.FC<TabItemProps> = ({
  state,
  text,
  className,
  onTabClicked,
}) => {
  const currentStyle = styles[`tabItem${state}`];

  const containerView = (
    <div className={styles.container}>
      <Text
        className={styles.text}
        {...text} />
    </div>
  );
  const selectorView = (
    <div className={styles.selector}/>
  );
  switch (state) {
    case 'Selected':
      break;
    case 'Unselected':
      break;
  }

  return (
     <button className={cx(currentStyle, className)}
     onClick={onTabClicked}>
        {containerView}
        {selectorView}
    </button>
  );
};

TabItem.defaultProps = defaultProps;

export default TabItem;
