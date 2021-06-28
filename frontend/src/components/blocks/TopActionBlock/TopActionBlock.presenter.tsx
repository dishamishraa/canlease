import React, {useState} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TopActionBlockProps, defaultProps} from './TopActionBlock';
import Text, { TextProps } from '../../atoms/Text';
import TableItem, { defaultProps as TableItemDefaultProps } from '../../molecules/TableItem/TableItem';

export type TopActionBlockPresenterProps = TopActionBlockProps & {
    searchQuery?: string;
    setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
};

const withPresenter = (
  View: React.FC<TopActionBlockProps>,
): React.FC<TopActionBlockPresenterProps> => {
  const Presenter: React.FC<TopActionBlockPresenterProps> = (props) => {
    const {
        className,
        searchQuery,
        setSearchQuery
    } = props;
    const { t } = useTranslation();
    const history = useHistory();

    const topActionBlockProps: TopActionBlockProps = {
        ...defaultProps,
        textInput: {
            ...defaultProps.textInput,
            textPlaceholder: t('application_page.search_placeholder'),
            textValue: searchQuery,
            onTextChanged: (e) => {
                if(setSearchQuery){
                    setSearchQuery(e.target.value)
                }
            },
        },
        select: {
            ...defaultProps.select,
        },
        button: {
            ...defaultProps.button,
            onButtonClicked: () => {
                history.push('/portal/application')
            },
            text:{
                value: t('view_quote.apply_button_text')
            }

        }
    }


    return <View
        {...topActionBlockProps}
        className={className}
        />;
  };
  return Presenter;
};
export default withPresenter;