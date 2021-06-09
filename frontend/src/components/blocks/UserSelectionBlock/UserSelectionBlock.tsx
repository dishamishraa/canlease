import React from 'react';
import cx from 'classnames';

import styles from './UserSelectionBlock.module.scss';

import Text, { TextProps } from '../../atoms/Text';
import Button, { ButtonProps } from '../../atoms/Button';
import CardList, { CardListProps } from '../../organisms/CardList';
import { UserSelectionCardProps } from '../../molecules/UserSelectionCard';

export const defaultProps = {
  blockHeading: {
    style: 'Basic800',
    align: 'Center',
    size: 'Large',
    type: 'Heading1',
  } as TextProps,
  cardList: {
    userSelectionCards: [],  
  } as CardListProps,
};

export type UserSelectionBlockProps = {
  blockHeading?: TextProps;
  className?: string;
  cardList?: CardListProps;
  setUserType?: React.Dispatch<React.SetStateAction<string>>;
};

const UserSelectionBlock: React.FC<UserSelectionBlockProps> = ({
  blockHeading,
  className,
  cardList,
}) => {

  return (
    <div className={cx(styles.userSelectionBlock, className)}>
      <Text
        className={styles.blockHeading}
        {...blockHeading} />
      <CardList
        className={styles.cardList}
        {...cardList} 
        />
      
    </div>
  );
};

UserSelectionBlock.defaultProps = defaultProps;

export default UserSelectionBlock;
