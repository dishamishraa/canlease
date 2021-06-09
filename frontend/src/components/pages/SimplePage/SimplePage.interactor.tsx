import React, { useContext } from 'react';
import { SimplePageProps } from './SimplePage';
import { SimplePagePropsPresenterProps } from './SimplePage.presenter';

const withInteractor = (
  Presenter: React.FC<SimplePagePropsPresenterProps>,
): React.FC <SimplePageProps> => {
  const Interactor: React.FC <SimplePageProps> = (props) => <Presenter
    {...props}
    />;
  return Interactor;
};
export default withInteractor;
