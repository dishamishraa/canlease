import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserSelectionBlockProps, defaultProps as UserSelectionBlockDefaultProps } from './UserSelectionBlock';
import Text, { TextProps } from '../../atoms/Text';
import CardList, { CardListProps } from '../../organisms/CardList';
import { UserSelectionCardProps, defaultProps as userSelectionCardDefaultProps } from '../../molecules/UserSelectionCard/UserSelectionCard';

import ClientImage from '../../../resources/images/Client.png';
import EndUserImage from '../../../resources/images/EndUser.png';

export type UserSelectionBlockPresenterProps = UserSelectionBlockProps & {
};

const withPresenter = (
  View: React.FC<UserSelectionBlockProps>,
): React.FC<UserSelectionBlockPresenterProps> => {
  const Presenter: React.FC<UserSelectionBlockPresenterProps> = (props) => {
    const { t } = useTranslation();
    const history = useHistory();
    const location = useLocation();
    const {
      className,
      setUserType,
    } = props;

    const blockHeading: TextProps = {
      ...UserSelectionBlockDefaultProps.blockHeading,
      value: t('user_type_selection.header'),
    };
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
                  onButtonClicked: () => {
                    if (setUserType) {
                      setUserType('customer');
                      history.push('/getQuote');
                    }
                  },
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
                  onButtonClicked: () => {
                    if (setUserType) {
                      setUserType('vendor');
                      history.push('/getQuote');
                    }
                  },
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
        cardList={cardList} />;
  };
  return Presenter;
};
export default withPresenter;
