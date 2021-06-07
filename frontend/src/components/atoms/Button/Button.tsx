import React from 'react';
import cx from 'classnames';

import styles from './Button.module.scss';

import Text, { TextProps } from '../Text';
import Icon, { IconProps } from '../Icon';
import { Link } from 'react-router-dom';

export type ButtonTypeType = 'Button' | 'TextIconButton' | 'IconTextButton';
export type ButtonSizeType = 'Large' | 'Medium' | 'Small';
export type ButtonFillType = 'Colour' | 'Basic' | 'None';
export type ButtonColourType = 'Brand' | 'Basic' | 'Danger';
export type ButtonButtonTypeType = 'button' | 'submit' | 'reset';

export const defaultProps = {
  type: 'TextIconButton' as ButtonTypeType,
  size: 'Large' as ButtonSizeType,
  fill: 'Colour' as ButtonFillType,
  colour: 'Brand' as ButtonColourType,
  text: {
    style: 'Basic100',
    align: 'Center',
    size: 'Small',
    type: 'ButtonGiant',
  } as TextProps,
  icon: {
    asset: 'Plus',
    style: 'Basic100',
  } as IconProps,
};

export type ButtonProps = {
  type?: ButtonTypeType;
  size?: ButtonSizeType;
  fill?: ButtonFillType;
  colour?: ButtonColourType;
  buttonType?: ButtonButtonTypeType;
  onButtonClicked?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  linkPath?: string; // use for general navigation between pages
  text?: TextProps;
  className?: string;
  icon?: IconProps;
};

const Button: React.FC<ButtonProps> = ({
  type,
  size,
  fill,
  colour,
  buttonType,
  onButtonClicked,
  linkPath,
  text,
  className,
  icon,
}) => {

  const currentStyle = styles[`button${type}${size}${fill}${colour}`];

  let textView;
  let contentView;
  
  switch (type) {
    case 'Button':
      contentView = (
        <div className={styles.content}>
          <Text
            className={styles.text}
            {...text} />
        </div>
      );
      break;
    case 'TextIconButton':
      contentView = (
        <div className={styles.content}>
          <Text
            className={styles.text}
            {...text} />
          <Icon
            className={styles.icon}
            {...icon} />
        </div>
      );
      break;
    case 'IconTextButton':
      contentView = (
        <div className={styles.content}>
          <Icon
            className={styles.icon}
            {...icon} />
          <Text
            className={styles.text}
            {...text} />
        </div>
      );
      break;
  }

  if(linkPath) {
    return (
      <Link
        to={linkPath}
        className={cx(currentStyle, className)}>
        {textView}
        {contentView}
      </Link>
    )
  }
  return (
    <button
      type={buttonType}
      onClick={onButtonClicked}
      className={cx(currentStyle, className)}>
      {textView}
      {contentView}
    </button>
  );
};

Button.defaultProps = defaultProps;

export default Button;
