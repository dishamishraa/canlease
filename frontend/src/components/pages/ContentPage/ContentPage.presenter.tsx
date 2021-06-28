import React, { useEffect, useState } from 'react';
import { ContentPageProps } from './ContentPage';
import { Redirect, useLocation, useHistory } from 'react-router-dom';

export type ContentPagePresenterProps = ContentPageProps & {
};

const withPresenter = (
    View: React.FC<ContentPageProps>,
  ): React.FC<ContentPagePresenterProps> => {
    const Presenter: React.FC<ContentPagePresenterProps> = (props) => {
      const {
        
      } = props;
      const { search } = useLocation();
      const queryParams = new URLSearchParams(search).get('search');
      const [searchQuery, setSearchQuery] = useState(queryParams || '');


      const [contentType, setContentType] = useState('Quote');

      return <View
          {...props}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          contentType={contentType} />;
  };
  return Presenter;
};
export default withPresenter;