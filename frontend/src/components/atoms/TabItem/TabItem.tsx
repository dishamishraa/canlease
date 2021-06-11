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
};

const TabItem: React.FC<TabItemProps> = ({
  state,
  text,
  className,
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
    <div className={cx(currentStyle, className)}>
      {containerView}
      {selectorView}
    </div>
  );
};

TabItem.defaultProps = defaultProps;

export default TabItem;
