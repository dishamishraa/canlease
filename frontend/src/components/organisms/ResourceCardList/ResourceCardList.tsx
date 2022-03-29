import React from 'react';
import cx from 'classnames';

import styles from './ResourceCardList.module.scss';

import ResourceCard, { ResourceCardProps } from '../../molecules/ResourceCard';

export const defaultProps = {
  resourceCards: [
  ] as ResourceCardProps[],
};

export type ResourceCardListProps = {
  resourceCards?: ResourceCardProps[];
  className?: string;
};

const ResourceCardList: React.FC<ResourceCardListProps> = ({
  resourceCards,
  className,
}) => {
  const resourceCardArray = resourceCards?.map((resourceCard, index) => (
    <ResourceCard
      key={index}
      className={styles.resourceCard}
      {...resourceCard} />
  ));
  return (
    <div className={cx(styles.resourceCardList, className)}>
      {resourceCardArray}
    </div>
  );
};

ResourceCardList.defaultProps = defaultProps;

export default ResourceCardList;
