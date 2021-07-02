import React, { useEffect, useState } from 'react';
import { ContentPageProps } from './ContentPage';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { Profile } from '../../../modules/types';

export type ContentPagePresenterProps = ContentPageProps & {
};

const withPresenter = (
    View: React.FC<ContentPageProps>,
  ): React.FC<ContentPagePresenterProps> => {
    const Presenter: React.FC<ContentPagePresenterProps> = (props) => {
      const {
      } = props;
      const [searchQuery, setSearchQuery] = useState('');
      const [contentType, setContentType] = useState('Quote');
      const [statusFilter, setStatusFilter] = useState('All');
      const [tab, setTab] = useState<'Customer' | 'Personal'>('Customer');

      return <View
          {...props}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          contentType={contentType}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          tab={tab}
          setTab={setTab}
          />;
  };
  return Presenter;
};
export default withPresenter;