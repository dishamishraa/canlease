import React from 'react';
import cx from 'classnames';

import styles from './LeaseInfoBlock.module.scss';

import Text, { TextProps } from '../../atoms/Text';
import LeaseDetailsSection, { LeaseDetailsSectionProps } from '../../organisms/LeaseDetailsSection';

export const defaultProps = {
  blockHeading: {
    style: 'Basic800',
    align: 'Left',
    size: 'Large',
    type: 'Heading1',
  } as TextProps,
  leaseDetailsSection: {
    detailItemList: {
      quoteDetailItems: [
      ],
    },
  } as LeaseDetailsSectionProps,
};

export type LeaseInfoBlockProps = {
  blockHeading?: TextProps;
  leaseDetailsSection?: LeaseDetailsSectionProps;
  className?: string;
};

const LeaseInfoBlock: React.FC<LeaseInfoBlockProps> = ({
  blockHeading,
  leaseDetailsSection,
  className,
}) => (
    <div className={cx(styles.leaseInfoBlock, className)}>
      <Text
        className={styles.blockHeading}
        {...blockHeading} />
      <LeaseDetailsSection
        className={styles.leaseDetailsSection}
        {...leaseDetailsSection} />
    </div>
);

LeaseInfoBlock.defaultProps = defaultProps;

export default LeaseInfoBlock;
