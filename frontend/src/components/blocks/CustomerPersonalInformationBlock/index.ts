import CustomerPersonalInformationBlock, { CustomerPersonalInformationBlockProps } from './CustomerPersonalInformationBlock';

import withInteractor from './CustomerPersonalInformationBlock.interactor';
import withPresenter from './CustomerPersonalInformationBlock.presenter';

export type { CustomerPersonalInformationBlockProps };
export default withInteractor(withPresenter(CustomerPersonalInformationBlock));
