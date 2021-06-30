import BusinessInformationBlockView, { BusinessInformationBlockProps } from './BusinessInformationBlock';
import withInteractor from './BusinessInformationBlock.interactor';
import withPresenter from './BusinessInformationBlock.presenter';

export type { BusinessInformationBlockProps };
const BusinessInformationBlock = withInteractor(withPresenter(BusinessInformationBlockView));
export default BusinessInformationBlock;
