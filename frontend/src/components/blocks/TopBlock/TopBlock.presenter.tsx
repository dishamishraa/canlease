import React, {useState} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TopBlockProps, defaultProps } from './TopBlock';
import TabItem, { TabItemProps, defaultProps as  TabItemDefaultProps} from '../../atoms/TabItem/TabItem';

export type TopBlockPresenterProps = TopBlockProps & {
    contentType?: string;
};

const withPresenter = (
  View: React.FC<TopBlockProps>,
): React.FC<TopBlockPresenterProps> => {
  const Presenter: React.FC<TopBlockPresenterProps> = (props) => {
    const {
        className,
        contentType,
    } = props;
    const { t } = useTranslation();
    const history = useHistory();

    const topBlockProps: TopBlockProps = {
        ...defaultProps,
        blockHeader:{
            ...defaultProps.blockHeader,
            text: {
                ...defaultProps.blockHeader.text,
                value: contentType === "Quote"? t('application_page.quotes.header') : t('application_page.applications.header')
            }
        },
        tabs: {
            tabsList: {
              tabItems: [
                  {
                    ...TabItemDefaultProps,
                    text:{
                        ...TabItemDefaultProps.text,
                        style: 'Basic800',
                        value: contentType === "Quote" ? t('application_page.quotes.customer_quotes') : t('application_page.applications.customer_quotes')
                    }
                  }, 
                  {
                    ...TabItemDefaultProps,
                    text:{
                        ...TabItemDefaultProps.text,
                        style: 'Basic800',
                        value: contentType === "Quote" ? t('application_page.quotes.personal_quotes') : t('application_page.applications.personal_quotes')
                    }

                  }
                  
              ],
            }
        }
    }


    return <View
        {...topBlockProps}
        className={className}
        />;
  };
  return Presenter;
};
export default withPresenter;