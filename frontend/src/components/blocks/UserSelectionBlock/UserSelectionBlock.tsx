import React from 'react';
import cx from 'classnames';

import styles from './UserSelectionBlock.module.scss';

import Text, { TextProps } from '../../atoms/Text';
import Button, { ButtonProps } from '../../atoms/Button';
import CardList, { CardListProps } from '../../organisms/CardList';
import Modal, { ModalProps } from '../../organisms/Modal';

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
  modal: {
    titleText: {
      style: 'Basic800',
      align: 'Center',
      size: 'Large',
      type: 'Heading1',
    } as TextProps,
  } as ModalProps,
};

export type UserSelectionBlockProps = {
  blockHeading?: TextProps;
  className?: string;
  cardList?: CardListProps;
  setUserType?: React.Dispatch<React.SetStateAction<string>>;
  modal?: ModalProps;
  access?: boolean;
  showModal?: boolean;
};

const UserSelectionBlock: React.FC<UserSelectionBlockProps> = ({
  blockHeading,
  className,
  cardList,
  modal,
  access,
  showModal,
}) => {
  console.log(access);
  let display 
  if (!access && showModal){
    display = (
      <Modal className={styles.modal} {...modal}/>
    );
  }

  return (
    <div className={cx(styles.userSelectionBlock, className)}>
      {display}
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
