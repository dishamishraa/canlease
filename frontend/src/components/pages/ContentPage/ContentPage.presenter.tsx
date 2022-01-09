/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Profile } from '../../../modules/profile/types';
import { ContentFilter, ContentTypeTabs } from '../../../modules/types';
import { ContentPageProps } from './ContentPage';

export type ContentPagePresenterProps = ContentPageProps & {
  profile?: Profile | null;
};

const withPresenter = (
  View: React.FC<ContentPageProps>,
): React.FC<ContentPagePresenterProps> => {
  const Presenter: React.FC<ContentPagePresenterProps> = (props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<ContentFilter>('all');
    const { state, pathname } = useLocation<{statusFilter: ContentFilter}>();
    const { profile } = props;

    useEffect(() => {
      if (state) {
        const { statusFilter } = state;
        setStatusFilter(statusFilter);
      }
    }, [state]);

    let tab: ContentTypeTabs = 'Personal';
    if (pathname.toLowerCase().includes('/customer')) {
      tab = 'Customer';
    }

    return (
      <View
        {...props}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        tab={tab}
        profile={profile}
      />
    );
  };

  return Presenter;
};

export default withPresenter;
