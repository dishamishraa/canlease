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

export type MenuBlockPresenterProps = MenuBlockProps & {
};

const withPresenter = (
  View: React.FC<MenuBlockProps>,
): React.FC<MenuBlockPresenterProps> => {
  const Presenter: React.FC<MenuBlockPresenterProps> = (props) => {
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
                value: 'Dashboard', //TODO localize
            },
            onMainMenuItemClicked: () => {
                history.push('/portal/dashboard');
            },
        },
        {
            ...defaultMainMenutItemProps,
            type: normalizedPathname.startsWith('/portal/quotes') ? 'Selected' : 'Default',
            icon: {
                ...defaultMainMenutItemProps.icon,
                asset: 'Quotes',
            },
            text: {
                ...defaultMainMenutItemProps.text,
                value: 'Quotes', //TODO localize
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
                value: 'Applications', //TODO localize
            },
            onMainMenuItemClicked: () => {
                history.push('/portal/applications');
            },
        },
    ];
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
