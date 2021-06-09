import React, { useState } from 'react';
import { SimplePageProps} from './SimplePage';

export type SimplePagePropsPresenterProps = SimplePageProps & {
};

const withPresenter = (
    View: React.FC<SimplePageProps>,
  ): React.FC<SimplePagePropsPresenterProps> => {
    const Presenter: React.FC<SimplePagePropsPresenterProps> = (props) => {
        const {

        } = props;
        
        const [userType, setUserType] = useState('');

        const handleUserTypeChange = (type) => {
            setUserType(type);
        }
       
        return <View
            handleUserTypeChange={handleUserTypeChange}
            userType={userType}/>;
  };
  return Presenter;
};
export default withPresenter;