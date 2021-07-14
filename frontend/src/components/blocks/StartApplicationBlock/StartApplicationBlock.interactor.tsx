import React, { useContext } from 'react';
import { StartApplicationBlockPresenterProps } from './StartApplicationBlock.presenter';
import { StartApplicationBlockProps } from './StartApplicationBlock';

const withInteractor = (
  Presenter: React.FC<StartApplicationBlockPresenterProps>,
): React.FC<StartApplicationBlockProps> => {
  const Interactor: React.FC<StartApplicationBlockProps> = (props) => <Presenter
              {...props}
          />;
  return Interactor;
};

export default withInteractor;
