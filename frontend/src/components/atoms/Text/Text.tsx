import React from 'react';
import cx from 'classnames';

import styles from './Text.module.scss';

export type TextStyleType = 'Basic800' | 'Basic400' | 'Basic500' | 'Red200' | 'Basic600' | 'Brand500' | 'Basic100';
export type TextAlignType = 'Left' | 'Center';
export type TextSizeType = 'Large' | 'Medium' | 'Small';
export type TextTypeType = 'Heading1' | 'Heading2' | 'Heading3' | 'Heading4' | 'Subtitle1' | 'Subtitle2' | 'Paragraph1' | 'Paragraph2' | 'Paragraph3' | 'ButtonGiant';

export const defaultProps = {
  style: 'Basic100' as TextStyleType,
  align: 'Center' as TextAlignType,
  size: 'Small' as TextSizeType,
  type: 'ButtonGiant' as TextTypeType,
  value: '',
};

export type TextProps = {
  style?: TextStyleType;
  align?: TextAlignType;
  size?: TextSizeType;
  type?: TextTypeType;
  value?: string;
  className?: string;
};

const Text: React.FC<TextProps> = ({
  style,
  align,
  size,
  type,
  value,
  className,
}) => {

  const currentStyle = styles[`text${style}${align}${size}${type}`];

  let valueView;
  
  switch (type) {
    case 'Heading1':
      valueView = (
        <h1 className={styles.value}>
          {value}
        </h1>
      );
      break;
    case 'Heading2':
      valueView = (
        <h2 className={styles.value}>
          {value}
        </h2>
      );
      break;
    case 'Heading3':
      valueView = (
        <h3 className={styles.value}>
          {value}
        </h3>
      );
      break;
    case 'Heading4':
      valueView = (
        <h4 className={styles.value}>
          {value}
        </h4>
      );
      break;
    case 'Subtitle1':
      valueView = (
        <h5 className={styles.value}>
          {value}
        </h5>
      );
      break;
    case 'Subtitle2':
      valueView = (
        <h5 className={styles.value}>
          {value}
        </h5>
      );
      break;
    case 'Paragraph1':
      valueView = (
        <p className={styles.value}>
          {value}
        </p>
      );
      break;
    case 'Paragraph2':
      valueView = (
        <p className={styles.value}>
          {value}
        </p>
      );
      break;
    case 'Paragraph3':
      valueView = (
        <p className={styles.value}>
          {value}
        </p>
      );
      break;
    case 'ButtonGiant':
      valueView = (
        <p className={styles.value}>
          {value}
        </p>
      );
      break;
  }

  return (
    <div className={cx(currentStyle, className)}>
      {valueView}
    </div>
  );
};

Text.defaultProps = defaultProps;

export default Text;
