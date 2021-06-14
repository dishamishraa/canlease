import React, { useState } from 'react';
import { SimplePageProps } from './SimplePage';

export type SimplePagePropsPresenterProps = SimplePageProps & {
};

const withPresenter = (
  View: React.FC<SimplePageProps>,
): React.FC<SimplePagePropsPresenterProps> => {
  const Presenter: React.FC<SimplePagePropsPresenterProps> = (props) => {
    const {

    } = props;

    const [userType, setUserType] = useState('');

    return <View
            {...props}
            setUserType={setUserType}
            userType={userType}
            {...props} />;
  };
  return Presenter;
};
export default withPresenter;
