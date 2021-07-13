import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { UserSelectionBlockProps, defaultProps as UserSelectionBlockDefaultProps } from './UserSelectionBlock';
import { TextProps } from '../../atoms/Text';
import { CardListProps } from '../../organisms/CardList';
import { ModalProps, defaultProps as modalPropsDefaultProps } from '../../organisms/Modal/Modal';
import { defaultProps as userSelectionCardDefaultProps } from '../../molecules/UserSelectionCard/UserSelectionCard';
import ClientImage from '../../../resources/images/Client.png';
import EndUserImage from '../../../resources/images/EndUser.png';
import LimitReachedIcon from '../../../resources/icons/LimitReached.svg';
import { INSTANT_QUOTE_COOKIE } from '../../../lib/config';
import { UserType } from '../../../modules/profile/types';

export type UserSelectionBlockPresenterProps = UserSelectionBlockProps & {
};

const withPresenter = (
  View: React.FC<UserSelectionBlockProps>,
): React.FC<UserSelectionBlockPresenterProps> => {
  const Presenter: React.FC<UserSelectionBlockPresenterProps> = (props) => {
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const {
      flowType,
      className,
      setQuoteUserType,
    } = props;
    const onCloseModal = () => {
      setShowModal(false);
    };

    const onUserTypeSelected = (userType: UserType) => {
      const quoteCookie = Cookies.get(INSTANT_QUOTE_COOKIE);

      if ((flowType === 'createQuote' || !quoteCookie) && setQuoteUserType) {
        setQuoteUserType(userType);
      } else {
        setShowModal(true);
      }
    };
    
    const modal: ModalProps = {
      ...modalPropsDefaultProps,
      closeIcon: {
        ...modalPropsDefaultProps.closeIcon,
        onIconClicked: onCloseModal,
      },
      image: {
        image: LimitReachedIcon,
      },
      titleText: {
        ...modalPropsDefaultProps.titleText,
        value: t('instant_quote_limit.title'),
      },
      descriptionText: {
        ...modalPropsDefaultProps.descriptionText,
        value: t('instant_quote_limit.description'),
      },
      primaryButton: {
        ...modalPropsDefaultProps.primaryButton,
        text: {
          ...modalPropsDefaultProps.primaryButton.text,
          value: t('instant_quote_limit.primary_button'),
        },
      },
      secondaryButton: {
        ...modalPropsDefaultProps.secondaryButton,
        text: {
          ...modalPropsDefaultProps.secondaryButton.text,
          value: t('instant_quote_limit.secondary_button'),
        },
      },
    };

    const blockHeading: TextProps = {
      ...UserSelectionBlockDefaultProps.blockHeading,
      value: t('user_type_selection.header'),
    };

    const cardList: CardListProps = {
      userSelectionCards:[
        {
          image: {
            image: EndUserImage,
          },
          text: {
            ...userSelectionCardDefaultProps.text,
            value: t('user_type_selection.end_user'),
          },
          button: {
            ...userSelectionCardDefaultProps.button,
            type: 'TextIconButton',
            onButtonClicked: () => onUserTypeSelected('customer'),
            text: {
              ...userSelectionCardDefaultProps.button.text,
              value: t('user_type_selection.button'),
            },
          },
        },
        {
          image: {
            image: ClientImage,
          },
          text: {
            ...userSelectionCardDefaultProps.text,
            value: t('user_type_selection.vendor'),
          },
          button: {
            ...userSelectionCardDefaultProps.button,
            type: 'TextIconButton',
            onButtonClicked: () => onUserTypeSelected('vendor'),
            text: {
              ...userSelectionCardDefaultProps.button.text,
              value: t('user_type_selection.button'),
            },
          },
        },
      ],
    };

    return <View
        blockHeading={blockHeading}
        className={className}
        cardList={cardList}
        modal={modal}
        showModal={showModal}
        />;
  };
  return Presenter;
};
export default withPresenter;
