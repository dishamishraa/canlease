import React, { useContext } from 'react';
import { TopActionBlockProps } from './TopActionBlock';
import { TopActionBlockPresenterProps } from './TopActionBlock.presenter';

const withInteractor = (
  Presenter: React.FC<TopActionBlockPresenterProps>,
): React.FC <TopActionBlockProps> => {
  const Interactor: React.FC <TopActionBlockProps> = (props) => <Presenter
    {...props}
    />;
  return Interactor;
};
export default withInteractor;
