import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TopBlockProps, defaultProps } from './TopBlock';
import { defaultProps as TabItemDefaultProps } from '../../atoms/TabItem/TabItem';
import { Profile } from '../../../modules/profile/types';
import { ContentTypeTabs } from '../../../modules/types';
import { useHistory } from 'react-router';

export type TopBlockPresenterProps = TopBlockProps & {
  profile: Profile | null;
};

const withPresenter = (
  View: React.FC<TopBlockProps>,
): React.FC<TopBlockPresenterProps> => {
  const Presenter: React.FC<TopBlockPresenterProps> = (props) => {
    const {
      className,
      contentType,
      tab,
      profile,
    } = props;
    const { t } = useTranslation();
    const history = useHistory();
    const [hideTabs, setHideTabs] = useState(true);

    useEffect(() => {
      if (profile) {
        const { userType } = profile;
        if (userType === 'customer') {
          setHideTabs(true);
        }
      }
    }, [profile]);

    const handleTabClicked = (value: ContentTypeTabs) => () => {
      if(contentType === 'Quote' && value === 'Personal'){
        history.push('/portal/quotes');
      } else if(contentType === 'Quote' && value === 'Customer'){
        history.push('/portal/quotes/customer');
      } else if(contentType === 'Application' && value === 'Personal'){
        history.push('/portal/applications');
      } else if(contentType === 'Application' && value === 'Customer'){
        history.push('/portal/applications/customer');
      }
    };

    const topBlockProps: TopBlockProps = {
      ...defaultProps,
      blockHeader: {
        ...defaultProps.blockHeader,
        text: {
          ...defaultProps.blockHeader.text,
          value: contentType === 'Quote' ? t('application_page.quotes.header') : t('application_page.applications.header'),
        },
      },
      tabs: {
        tabsList: {
          tabItems: [
            {
              ...TabItemDefaultProps,
              state: tab === 'Customer' ? 'Selected' : 'Unselected',
              text: {
                ...TabItemDefaultProps.text,
                style: 'Basic800',
                value: contentType === 'Quote' ? t('application_page.quotes.customer_quotes') : t('application_page.applications.customer_applications'),
              },
              onTabClicked: handleTabClicked('Customer'),
            },
            {
              ...TabItemDefaultProps,
              state: tab === 'Personal' ? 'Selected' : 'Unselected',
              text: {
                ...TabItemDefaultProps.text,
                style: 'Basic800',
                value: contentType === 'Quote' ? t('application_page.quotes.personal_quotes') : t('application_page.applications.personal_applications'),
              },
              onTabClicked: handleTabClicked('Personal'),

            },

          ],
        },
      },
    };

    return <View
        {...topBlockProps}
        className={className}
        hideTabs={hideTabs}
        />;
  };
  return Presenter;
};
export default withPresenter;
