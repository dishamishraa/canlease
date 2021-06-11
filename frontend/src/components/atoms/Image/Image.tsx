import React from 'react';
import cx from 'classnames';

import styles from './Image.module.scss';

export const defaultProps = {
};

export type ImageProps = {
  className?: string;
  image?: string;
};

const Image: React.FC<ImageProps> = ({
  className,
  image,
}) => (
    <div className={cx(styles.image, className)} style={{ backgroundImage: `url(${image})` }}/>

);

Image.defaultProps = defaultProps;

export default Image;
