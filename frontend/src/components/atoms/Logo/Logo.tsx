import React from 'react';
import cx from 'classnames';

import styles from './Logo.module.scss';

export type LogoSizeType = 'Large' | 'Small';

export const defaultProps = {
  size: 'Small' as LogoSizeType,
  content: ContentAsset,
};

export type LogoProps = {
  size?: LogoSizeType;
  content?: string;
  contentAlt?: string;
  className?: string;
};

const Logo: React.FC<LogoProps> = ({
  size,
  content,
  contentAlt,
  className,
}) => {

  const currentStyle = styles[`logo${size}`];

  return (
    <div className={cx(currentStyle, className)}>
      <img
        className={styles.content}
        alt={contentAlt}
        src={content} />
      <img
        className={styles.content}
        alt={contentAlt}
        src={content} />
    </div>
  );
};

Logo.defaultProps = defaultProps;

export default Logo;
