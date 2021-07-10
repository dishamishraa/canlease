import BusinessTypeBlock, { BusinessTypeBlockProps } from './BusinessTypeBlock';

import withInteractor from './BusinessTypeBlock.interactor';
import withPresenter from './BusinessTypeBlock.presenter';

export type { BusinessTypeBlockProps };
export default withInteractor(withPresenter(BusinessTypeBlock));
