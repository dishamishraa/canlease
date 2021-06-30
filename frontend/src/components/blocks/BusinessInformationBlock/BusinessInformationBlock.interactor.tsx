import React, { useContext } from 'react';
import { BusinessInformationBlockProps } from './BusinessInformationBlock';
import { BusinessInformationBlockPresenterProps } from './BusinessInformationBlock.presenter';

const withInteractor = (
  Presenter: React.FC<BusinessInformationBlockPresenterProps>,
): React.FC <BusinessInformationBlockProps> => {
  const Interactor: React.FC <BusinessInformationBlockProps> = (props) => {
    return (
      <Presenter
        {...props}
      />
    );
  };
  return Interactor;
};
export default withInteractor;
