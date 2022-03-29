import React from 'react';
import cx from 'classnames';

import styles from './ContextualMenuItem.module.scss';

import Text, { TextProps } from '../Text';

export type ContextualMenuItemContextualMenuItemTypeType = 'button' | 'submit' | 'reset';

export const defaultProps = {
  text: {
    style: 'Basic100',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
};

export type ContextualMenuItemProps = {
  contextualMenuItemType?: ContextualMenuItemContextualMenuItemTypeType;
  onContextualMenuItemClicked?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  text?: TextProps;
  className?: string;
};

const ContextualMenuItem: React.FC<ContextualMenuItemProps> = ({
  contextualMenuItemType,
  onContextualMenuItemClicked,
  text,
  className,
}) => (
    <button
      type={contextualMenuItemType}
      onClick={onContextualMenuItemClicked}
      className={cx(styles.contextualMenuItem, className)}>
      <Text
        className={styles.text}
        {...text} />
    </button>
);

ContextualMenuItem.defaultProps = defaultProps;

export default ContextualMenuItem;
