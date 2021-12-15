import React from 'react';
import { AssetInformationBlockProps } from './AssetInformationBlock';
import { AssetInformationBlockPresenterProps } from './AssetInformationBlock.presenter';

const withInteractor = (
  Presenter: React.FC<AssetInformationBlockPresenterProps>,
): React.FC<AssetInformationBlockProps> => {
  const Interactor: React.FC<AssetInformationBlockProps> = (props) => {

    return (
      <Presenter
      {...props}
      />
    );
  };

  return Interactor;
};

export default withInteractor;
