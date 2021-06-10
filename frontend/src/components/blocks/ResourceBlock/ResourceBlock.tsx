import React from 'react';
import cx from 'classnames';

import styles from './ResourceBlock.module.scss';

import BlockHeader, { BlockHeaderProps } from '../../molecules/BlockHeader';
import ResourceCardList, { ResourceCardListProps } from '../../organisms/ResourceCardList';

export const defaultProps = {
  blockHeader: {
    style: 'Heading2',
    type: 'WithButton',
    text: {
      style: 'Basic800',
      align: 'Left',
      size: 'Large',
      type: 'Heading2',
    },
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
    },
  } as BlockHeaderProps,
  resourceCardList: {
    resourceCards: [
    ],
  } as ResourceCardListProps,
};

export type ResourceBlockProps = {
  blockHeader?: BlockHeaderProps;
  resourceCardList?: ResourceCardListProps;
  className?: string;
};

const ResourceBlock: React.FC<ResourceBlockProps> = ({
  blockHeader,
  resourceCardList,
  className,
}) => {
  return (
    <div className={cx(styles.resourceBlock, className)}>
      <BlockHeader
        className={styles.blockHeader}
        {...blockHeader} />
      <ResourceCardList
        className={styles.resourceCardList}
        {...resourceCardList} />
    </div>
  );
};

ResourceBlock.defaultProps = defaultProps;

export default ResourceBlock;
