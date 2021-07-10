import React, { useContext } from 'react';
import { AssetInformationBlockProps } from './AssetInformationBlock';
import { AssetInformationBlockPresenterProps } from './AssetInformationBlock.presenter';
import { useParams } from 'react-router';
import useQuoteDetails from '../../../modules/quote/useQuoteDetails';

const withInteractor = (
  Presenter: React.FC<AssetInformationBlockPresenterProps>,
): React.FC<AssetInformationBlockProps> => {
  const Interactor: React.FC<AssetInformationBlockProps> = (props) => {
    const { quoteId } = useParams<{quoteId: string}>();
    const {  data: quoteDetails } = useQuoteDetails(quoteId);
    
    return (
      <Presenter
      {...props}
      quoteDetails={quoteDetails}
      />
    );
  };

  return Interactor;
};

export default withInteractor;
