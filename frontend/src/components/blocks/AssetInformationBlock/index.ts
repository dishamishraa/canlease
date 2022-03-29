import AssetInformationBlock, { AssetInformationBlockProps } from './AssetInformationBlock';
import withInteractor from './AssetInformationBlock.interactor';
import withPresenter from './AssetInformationBlock.presenter';

export type { AssetInformationBlockProps };
export default withInteractor(withPresenter(AssetInformationBlock));
