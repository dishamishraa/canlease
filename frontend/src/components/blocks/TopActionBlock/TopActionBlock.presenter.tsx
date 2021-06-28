import React, {useState} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TopActionBlockProps, defaultProps} from './TopActionBlock';
import Text, { TextProps } from '../../atoms/Text';
import TableItem, { defaultProps as TableItemDefaultProps } from '../../molecules/TableItem/TableItem';
import { ContextualMenuProps } from '../../molecules/ContextualMenu';
import { defaultProps as defaultMenuItemProps } from '../../atoms/ContextualMenuItem/ContextualMenuItem';

export type TopActionBlockPresenterProps = TopActionBlockProps & {
    searchQuery?: string;
    setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
    statusFilter?: string;
    setStatusFilter?: React.Dispatch<React.SetStateAction<string>>;
};

const withPresenter = (
  View: React.FC<TopActionBlockProps>,
): React.FC<TopActionBlockPresenterProps> => {
  const Presenter: React.FC<TopActionBlockPresenterProps> = (props) => {
    const {
        className,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
    } = props;
    const { t } = useTranslation();
    const history = useHistory();

    const handleSetStatusFilter = (value) => (event: any) => {
        if (setStatusFilter){
            setStatusFilter(value);
        }
    }

    const contextualMenu: ContextualMenuProps = {
        contextualMenuItemList: {
          contextualMenuItems: [
            {
              onContextualMenuItemClicked: handleSetStatusFilter(t('application_page.select.all')),
              text: {
                ...defaultMenuItemProps.text,
                value: t('application_page.select.all'),
              },
            },
            {
              onContextualMenuItemClicked: handleSetStatusFilter(t('application_page.select.active')),
              text: {
                ...defaultMenuItemProps.text,
                value: t('application_page.select.active'),
              },
            },
            {
                onContextualMenuItemClicked: handleSetStatusFilter(t('application_page.select.expiring_soon')),
                text: {
                  ...defaultMenuItemProps.text,
                  value: t('application_page.select.expiring_soon'),
                },
            },
            {
              onContextualMenuItemClicked: handleSetStatusFilter(t('application_page.select.applied')),
              text: {
                ...defaultMenuItemProps.text,
                value: t('application_page.select.applied'),
              },
            },
            {
              onContextualMenuItemClicked: handleSetStatusFilter(t('application_page.select.expired')),
              text: {
                ...defaultMenuItemProps.text,
                value: t('application_page.select.expired'),
              },
            },
          ],
        },
      };

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
        statusSearchField:{
            ...defaultProps.statusSearchField,
            select: {
                ...defaultProps.statusSearchField.select,
                text: {
                  ...defaultProps.statusSearchField.select?.text,
                  value: statusFilter,
                },
            },
            contextualMenu,
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