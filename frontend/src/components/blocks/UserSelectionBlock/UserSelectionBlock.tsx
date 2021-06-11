import React from 'react';
import cx from 'classnames';

import styles from './UserSelectionBlock.module.scss';

import Text, { TextProps } from '../../atoms/Text';
import CardList, { CardListProps } from '../../organisms/CardList';

export const defaultProps = {
  blockHeading: {
    style: 'Basic800',
    align: 'Center',
    size: 'Large',
    type: 'Heading1',
  } as TextProps,
  cardList: {
    userSelectionCards: [
    ],
  } as CardListProps,
};

export type UserSelectionBlockProps = {
  blockHeading?: TextProps;
  cardList?: CardListProps;
  setUserType?: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
};

const UserSelectionBlock: React.FC<UserSelectionBlockProps> = ({
  blockHeading,
  cardList,
  className,
}) => (
    <div className={cx(styles.userSelectionBlock, className)}>
      <Text
        className={styles.blockHeading}
        {...blockHeading} />
      <CardList
        className={styles.cardList}
        {...cardList} />
    </div>
);

UserSelectionBlock.defaultProps = defaultProps;

export default UserSelectionBlock;
