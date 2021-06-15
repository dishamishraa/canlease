import React, {useState} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserSelectionBlockProps, defaultProps as UserSelectionBlockDefaultProps } from './UserSelectionBlock';
import { TextProps } from '../../atoms/Text';
import { CardListProps } from '../../organisms/CardList';
import { ModalProps, defaultProps as modalPropsDefaultProps  } from '../../organisms/Modal/Modal';
import { defaultProps as userSelectionCardDefaultProps } from '../../molecules/UserSelectionCard/UserSelectionCard';
import ClientImage from '../../../resources/images/Client.png';
import EndUserImage from '../../../resources/images/EndUser.png';
import LimitReachedIcon from '../../../resources/icons/LimitReached.svg';
import Cookies from 'js-cookie';
import { INSTANT_QUOTE_COOKIE } from '../../../lib/config';

export type UserSelectionBlockPresenterProps = UserSelectionBlockProps & {
};

const withPresenter = (
  View: React.FC<UserSelectionBlockProps>,
): React.FC<UserSelectionBlockPresenterProps> => {
  const Presenter: React.FC<UserSelectionBlockPresenterProps> = (props) => {
    const { t } = useTranslation();
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const {
      className,
      setUserType,
    } = props;
    const onCloseModal = () => {
      setShowModal(false)
    }
    const onUserTypeSelected = (userType: 'vendor' | 'customer') => {
      if ((hasInstantQuote) && (setUserType)){
        setUserType(userType);
        history.push('/getQuote');
      } else {
        setShowModal(true);
      }
    }
    let hasInstantQuote = true;

    const quoteCookie = Cookies.get(INSTANT_QUOTE_COOKIE);
    if (quoteCookie){
        hasInstantQuote = false;
    }
  

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
        }
      },
      secondaryButton: {
        ...modalPropsDefaultProps.secondaryButton,
        text: {
          ...modalPropsDefaultProps.secondaryButton.text,
          value: t('instant_quote_limit.secondary_button'),
        }
      }
    };
 
    const blockHeading: TextProps = {
      ...UserSelectionBlockDefaultProps.blockHeading,
      value: t('user_type_selection.header'),
    };

    const handleClickUserType = (userType) => {
      if (setUserType) {
        setUserType('customer');
        history.push('/getQuote', {userType: userType});
      }
    }

    const cardList: CardListProps = {
      userSelectionCards:
            [
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
                  onButtonClicked: () => handleClickUserType("customer"),
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
                  onButtonClicked: () => handleClickUserType("vendor"),
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
