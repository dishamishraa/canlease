import React, { useContext } from 'react';
import { TopBlockProps } from './TopBlock';
import { TopBlockPresenterProps } from './TopBlock.presenter';

const withInteractor = (
  Presenter: React.FC<TopBlockPresenterProps>,
): React.FC <TopBlockProps> => {
  const Interactor: React.FC <TopBlockProps> = (props) => <Presenter
    {...props}
    />;
  return Interactor;
};
export default withInteractor;
