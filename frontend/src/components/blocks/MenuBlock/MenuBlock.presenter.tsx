import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { 
    MainMenuItemProps, 
    defaultProps as defaultMainMenutItemProps,
} from '../../atoms/MainMenuItem/MainMenuItem';
import { MenuItemListProps } from '../../organisms/MenuItemList';
import { defaultProps, MenuBlockProps } from './MenuBlock';
import { Profile } from '../../../modules/profile/types';

export type MenuBlockPresenterProps = MenuBlockProps & {
    profile: Profile | null;
};

const withPresenter = (
  View: React.FC<MenuBlockProps>,
): React.FC<MenuBlockPresenterProps> => {
  const Presenter: React.FC<MenuBlockPresenterProps> = (props) => {
    const {
        profile,
    } = props
    const { t } = useTranslation();
    const history = useHistory();
    const { pathname } = useLocation();

    const normalizedPathname = pathname.toLowerCase();

    const menuItems: MainMenuItemProps[] = [
        {
            ...defaultMainMenutItemProps,
            type: normalizedPathname === '/portal/dashboard' ? 'Selected' : 'Default',
            icon: {
                ...defaultMainMenutItemProps.icon,
                asset: 'Dashboard',
            },
            text: {
                ...defaultMainMenutItemProps.text,
                value:  t('main_menu_items.dashboard'),
            },
            onMainMenuItemClicked: () => {
                history.push('/portal/dashboard');
            },
        },
        {
            ...defaultMainMenutItemProps,
            type: normalizedPathname.startsWith('/portal/quote') ? 'Selected' : 'Default',
            icon: {
                ...defaultMainMenutItemProps.icon,
                asset: 'Quotes',
            },
            text: {
                ...defaultMainMenutItemProps.text,
                value:  t('main_menu_items.quotes'),
            },
            onMainMenuItemClicked: () => {
                history.push('/portal/quotes');
            },
        },
        {
            ...defaultMainMenutItemProps,
            type: normalizedPathname.startsWith('/portal/applications') ? 'Selected' : 'Default',
            icon: {
                ...defaultMainMenutItemProps.icon,
                asset: 'Applications',
            },
            text: {
                ...defaultMainMenutItemProps.text,
                value: t('main_menu_items.applications'),
            },
            onMainMenuItemClicked: () => {
                history.push('/portal/applications');
            },
        },
    ];
    if (profile?.userType === 'admin') { 
        const rateCardMenuItem: MainMenuItemProps = {
            ...defaultMainMenutItemProps,
            type: normalizedPathname.startsWith('/portal/ratecard') ? 'Selected' : 'Default',
            icon: {
                ...defaultMainMenutItemProps.icon,
                asset: 'RateCards',
            },
            text: {
                ...defaultMainMenutItemProps.text,
                value: t('main_menu_items.rate_cards'),
            },
            onMainMenuItemClicked: () => {
                history.push('/portal/ratecard');
            }
        }
        menuItems.push(rateCardMenuItem);
    }
    const menuItemList: MenuItemListProps = {
        ...defaultProps.menuItemList,
        mainMenuItems: menuItems,
    }
    return <View
      {...props}
      menuItemList={menuItemList}
      />;
  };
  return Presenter;
};

export default withPresenter;
