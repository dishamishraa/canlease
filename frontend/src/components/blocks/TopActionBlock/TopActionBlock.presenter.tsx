/* eslint-disable default-case, consistent-return */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TopActionBlockProps, defaultProps } from './TopActionBlock';
import { ContextualMenuProps } from '../../molecules/ContextualMenu';
import { ContentFilter } from '../../../modules/types';
import {
  ContextualMenuItemProps,
  defaultProps as defaultMenuItemProps,
} from '../../atoms/ContextualMenuItem/ContextualMenuItem';

export type TopActionBlockPresenterProps = TopActionBlockProps & {};

const withPresenter = (
  View: React.FC<TopActionBlockProps>,
): React.FC<TopActionBlockPresenterProps> => {
  const Presenter: React.FC<TopActionBlockPresenterProps> = (props) => {
    const {
      className,
      contentType,
      searchQuery,
      setSearchQuery,
      statusFilter,
      setStatusFilter,
      tab,
      profile,
    } = props;
    const { t } = useTranslation();
    const history = useHistory();

    const handleSetStatusFilter = (value: ContentFilter) => () => {
      if (setStatusFilter) {
        setStatusFilter(value);
      }
    };

    const filterOptions: ContentFilter[] = contentType === 'Application'
      ? ['all', 'under_review', 'financed', 'rejected', 'not_active']
      : ['all', 'active', 'expiring', 'applied', 'expired'];

    const contextualMenu: ContextualMenuProps = {
      contextualMenuItemList: {
        contextualMenuItems: filterOptions.map((option): ContextualMenuItemProps => ({
          onContextualMenuItemClicked: handleSetStatusFilter(option),
          text: {
            ...defaultMenuItemProps.text,
            value: t(`application_page.status.${option}`),
          },
        })),
      },
    };

    const getButtonText = () => {
      if (contentType === 'Application') {
        switch (tab) {
          case 'Customer':
            return t('top_action_block.button.customer_application');
          case 'Personal':
            return t('top_action_block.button.personal_application');
        }
      } else {
        switch (tab) {
          case 'Customer':
            return t('top_action_block.button.customer_quote');
          case 'Personal':
            if (profile?.userType === 'customer') {
              return t('top_action_block.button.personal_quote.customer');
            }
            return t('top_action_block.button.personal_quote.vendor');
        }
      }
    };

    const topActionBlockProps: TopActionBlockProps = {
      ...defaultProps,
      textInput: {
        ...defaultProps.textInput,
        textPlaceholder: t('application_page.search_placeholder'),
        textValue: searchQuery,
        onTextChanged: (e) => {
          if (setSearchQuery) {
            setSearchQuery(e.target.value);
          }
        },
      },
      statusSearchField: {
        ...defaultProps.statusSearchField,
        select: {
          ...defaultProps.statusSearchField.select,
          text: {
            ...defaultProps.statusSearchField.select?.text,
            value: t(`application_page.status.${statusFilter}`),
          },
        },
        contextualMenu,
      },
      button: {
        ...defaultProps.button,
        onButtonClicked: () => {
          history.push('/portal/quote/getQuote', { fromTab: tab });
        },
        text: {
          ...defaultProps.button.text,
          value: getButtonText(),
        },

      },
    };

    return <View {...topActionBlockProps} className={className} />;
  };

  return Presenter;
};

export default withPresenter;
