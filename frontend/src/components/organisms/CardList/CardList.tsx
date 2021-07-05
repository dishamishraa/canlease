import React from 'react';
import cx from 'classnames';

import styles from './CardList.module.scss';

import UserSelectionCard, { UserSelectionCardProps } from '../../molecules/UserSelectionCard';

export const defaultProps = {
  userSelectionCards: [
  ] as UserSelectionCardProps[],
};

export type CardListProps = {
  userSelectionCards?: UserSelectionCardProps[];
  className?: string;
};

const CardList: React.FC<CardListProps> = ({
  userSelectionCards,
  className,
}) => {
  const userSelectionCardArray = userSelectionCards?.map((userSelectionCard) => (
    <UserSelectionCard
      className={styles.userSelectionCard}
      {...userSelectionCard} />
  ));
  return (
    <div className={cx(styles.cardList, className)}>
      {userSelectionCardArray}
    </div>
  );
};

CardList.defaultProps = defaultProps;

export default CardList;
