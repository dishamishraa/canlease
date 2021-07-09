import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { ContentFilter, ContentTypeTabs } from '../../../modules/types';
import { ContentPageProps } from './ContentPage';

export type ContentPagePresenterProps = ContentPageProps & {
};

const withPresenter = (
  View: React.FC<ContentPageProps>,
): React.FC<ContentPagePresenterProps> => {
  const Presenter: React.FC<ContentPagePresenterProps> = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<ContentFilter>('all');
    const { pathname } = useLocation();

    let tab: ContentTypeTabs = 'Personal';
    if(pathname.toLowerCase().includes('/customer')) {
      tab = 'Customer';
    }

    return <View
          {...props}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          tab={tab}
          />;
  };
  return Presenter;
};
export default withPresenter;
