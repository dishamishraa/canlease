import React from 'react';
import cx from 'classnames';

import styles from './SimpleDetailsSection.module.scss';

import Text, { TextProps } from '../../atoms/Text';

export const defaultProps = {
  text: {
    style: 'Basic800',
    align: 'Left',
    size: 'Large',
    type: 'Paragraph1',
  } as TextProps,
};

export type SimpleDetailsSectionProps = {
  text?: TextProps;
  className?: string;
};

const SimpleDetailsSection: React.FC<SimpleDetailsSectionProps> = ({
  text,
  className,
}) => (
    <div className={cx(styles.simpleDetailsSection, className)}>
      <Text
        className={styles.text}
        {...text} />
    </div>
);

SimpleDetailsSection.defaultProps = defaultProps;

export default SimpleDetailsSection;
