import CustomerBusinessInformationBlock, { CustomerBusinessInformationBlockProps } from './CustomerBusinessInformationBlock';

import withInteractor from './CustomerBusinessInformationBlock.interactor';
import withPresenter from './CustomerBusinessInformationBlock.presenter';

export type { CustomerBusinessInformationBlockProps };
export default withInteractor(withPresenter(CustomerBusinessInformationBlock));
