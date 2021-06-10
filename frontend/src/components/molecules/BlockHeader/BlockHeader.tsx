import React from 'react';
import cx from 'classnames';

import styles from './BlockHeader.module.scss';

import Text, { TextProps } from '../../atoms/Text';
import Button, { ButtonProps } from '../../atoms/Button';

export type BlockHeaderStyleType = 'Heading1' | 'Heading2';
export type BlockHeaderTypeType = 'Default' | 'WithButton';

export const defaultProps = {
  style: 'Heading2' as BlockHeaderStyleType,
  type: 'WithButton' as BlockHeaderTypeType,
  text: {
    style: 'Basic800',
    align: 'Left',
    size: 'Large',
    type: 'Heading2',
  } as TextProps,
  button: {
    type: 'Button',
    size: 'Medium',
    fill: 'Basic',
    colour: 'Basic',
    text: {
      style: 'Brand500',
      align: 'Center',
      size: 'Small',
      type: 'ButtonGiant',
    },
  } as ButtonProps,
};

export type BlockHeaderProps = {
  style?: BlockHeaderStyleType;
  type?: BlockHeaderTypeType;
  text?: TextProps;
  className?: string;
  button?: ButtonProps;
};

const BlockHeader: React.FC<BlockHeaderProps> = ({
  style,
  type,
  text,
  className,
  button,
}) => {

  const currentStyle = styles[`blockHeader${style}${type}`];

  const textView = (
    <Text
      className={styles.text}
      {...text} />
  );
  
  let buttonView;
  
  switch (type) {
    case 'Default':
      break;
    case 'WithButton':
      buttonView = (
        <Button
          className={styles.button}
          {...button} />
      );
      break;
  }

  return (
    <div className={cx(currentStyle, className)}>
      {textView}
      {buttonView}
    </div>
  );
};

BlockHeader.defaultProps = defaultProps;

export default BlockHeader;
