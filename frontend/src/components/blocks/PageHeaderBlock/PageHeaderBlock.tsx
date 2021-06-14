import React from 'react';
import cx from 'classnames';

import styles from './PageHeaderBlock.module.scss';

import BlockHeader, { BlockHeaderProps } from '../../molecules/BlockHeader';

export const defaultProps = {
  blockHeader: {
    style: 'Heading1',
    type: 'Default',
    text: {
      style: 'Basic800',
      align: 'Left',
      size: 'Large',
      type: 'Heading1',
    },
  } as BlockHeaderProps,
};

export type PageHeaderBlockProps = {
  blockHeader?: BlockHeaderProps;
  className?: string;
};

const PageHeaderBlock: React.FC<PageHeaderBlockProps> = ({
  blockHeader,
  className,
}) => (
    <div className={cx(styles.pageHeaderBlock, className)}>
      <BlockHeader
        className={styles.blockHeader}
        {...blockHeader} />
    </div>
);

PageHeaderBlock.defaultProps = defaultProps;

export default PageHeaderBlock;
