import React, { useContext } from 'react';
import { DialogBlockProps } from './DialogBlock';
import { DialogBlockPresenterProps } from './DialogBlock.presenter';

const withInteractor = (
  Presenter: React.FC<DialogBlockPresenterProps>,
): React.FC <DialogBlockProps> => {
  
  const Interactor: React.FC <DialogBlockProps> = (props) => {
    return (
      <Presenter
        {...props}
      />
    );
  }
  return Interactor;
};
export default withInteractor;
