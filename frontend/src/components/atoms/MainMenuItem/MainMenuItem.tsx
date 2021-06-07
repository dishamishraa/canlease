import React from 'react';
import cx from 'classnames';

import styles from './MainMenuItem.module.scss';

import Icon, { IconProps } from '../Icon';
import Text, { TextProps } from '../Text';

export type MainMenuItemTypeType = 'Default' | 'Selected';
export type MainMenuItemMainMenuItemTypeType = 'button' | 'submit' | 'reset';

export const defaultProps = {
  type: 'Selected' as MainMenuItemTypeType,
  icon: {
    asset: 'Plus',
    style: 'Brand500',
  } as IconProps,
  text: {
    style: 'Brand500',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
};

export type MainMenuItemProps = {
  type?: MainMenuItemTypeType;
  mainMenuItemType?: MainMenuItemMainMenuItemTypeType;
  onMainMenuItemClicked?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: IconProps;
  text?: TextProps;
  className?: string;
};

const MainMenuItem: React.FC<MainMenuItemProps> = ({
  type,
  mainMenuItemType,
  onMainMenuItemClicked,
  icon,
  text,
  className,
}) => {

  const currentStyle = styles[`mainMenuItem${type}`];

  const containerView = (
    <div className={styles.container}>
      <Icon
        className={styles.icon}
        {...icon} />
      <Text
        className={styles.text}
        {...text} />
    </div>
  );
  
  let selectorView;
  
  switch (type) {
    case 'Default':
      break;
    case 'Selected':
      selectorView = (
        <div className={styles.selector}/>
      );
      break;
  }

  return (
    <button
      type={mainMenuItemType}
      onClick={onMainMenuItemClicked}
      className={cx(currentStyle, className)}>
      {selectorView}
      {containerView}
    </button>
  );
};

MainMenuItem.defaultProps = defaultProps;

export default MainMenuItem;
