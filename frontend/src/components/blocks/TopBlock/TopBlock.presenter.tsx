import React, {useState, useEffect} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TopBlockProps, defaultProps } from './TopBlock';
import TabItem, { TabItemProps, defaultProps as  TabItemDefaultProps} from '../../atoms/TabItem/TabItem';
import { Profile } from '../../../modules/types';

export type TopBlockPresenterProps = TopBlockProps & {
    contentType?: string;
    tab?: string;
    setTab?: React.Dispatch<React.SetStateAction<string>>;
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
        setTab,
        profile,
    } = props;
    const { t } = useTranslation();
    const history = useHistory();
    const [hideTabs, setHideTabs] = useState(false);

    useEffect(() => {
      if(profile){
        const { userType } = profile;
        if (userType === 'customer' && setTab){
          setHideTabs(true);
          setTab("Personal");
        }
      }
    }, [profile])

    const handleTabClicked = (value) => (event: any) => {
      if (setTab){
        setTab(value);
      }
    }

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
                    state: tab === 'Customer' ? 'Selected' : 'Unselected',
                    text:{
                        ...TabItemDefaultProps.text,
                        style: 'Basic800',
                        value: contentType === "Quote" ? t('application_page.quotes.customer_quotes') : t('application_page.applications.customer_applications')
                    },
                    onTabClicked: handleTabClicked("Customer"),
                  }, 
                  {
                    ...TabItemDefaultProps,
                    state: tab === 'Personal' ? 'Selected' : 'Unselected',
                    text:{
                        ...TabItemDefaultProps.text,
                        style: 'Basic800',
                        value: contentType === "Quote" ? t('application_page.quotes.personal_quotes') : t('application_page.applications.personal_applications')
                    },
                    onTabClicked: handleTabClicked("Personal"),

                  }
                  
              ],
            }
        }
    }


    return <View
        {...topBlockProps}
        className={className}
        hideTabs={hideTabs}
        />;
  };
  return Presenter;
};
export default withPresenter;