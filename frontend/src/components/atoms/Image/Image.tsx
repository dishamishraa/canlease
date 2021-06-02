import React from 'react';
import cx from 'classnames';

import styles from './Image.module.scss';

export const defaultProps = {
};

export type ImageProps = {
  className?: string;
};

const Image: React.FC<ImageProps> = ({
  className,
}) => {
  return (
    <div className={cx(styles.image, className)}/>
  );
};

Image.defaultProps = defaultProps;

export default Image;
