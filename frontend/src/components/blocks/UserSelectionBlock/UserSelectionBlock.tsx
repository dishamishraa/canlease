import React from 'react';
import cx from 'classnames';

import styles from './UserSelectionBlock.module.scss';

import Text, { TextProps } from '../../atoms/Text';
import CardList, { CardListProps } from '../../organisms/CardList';
import Modal, { ModalProps } from '../../organisms/Modal';
import { UserType } from '../../../modules/profile/types';
import { QuoteFlowType } from '../../../modules/types';

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
  cardList?: CardListProps;
  className?: string;
  setQuoteUserType?: (userType: UserType) => void;
  modal?: ModalProps;
  showModal?: boolean;
  flowType?: QuoteFlowType;
};

const UserSelectionBlock: React.FC<UserSelectionBlockProps> = ({
  blockHeading,
  cardList,
  className,
  modal,
  showModal,
}) => {
  let display;
  if (showModal) {
    display = (
      <Modal className={styles.modal} {...modal}/>
    );
  }

  return (
    <div className={cx(styles.userSelectionBlock, className)}>
      <Text
        className={styles.blockHeading}
        {...blockHeading} />
      <CardList
        className={styles.cardList}
        {...cardList}
        />
         {display}
    </div>
  );
};

UserSelectionBlock.defaultProps = defaultProps;
export default UserSelectionBlock;
