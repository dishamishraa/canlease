import ReviewApplicationInformationBlock, { ReviewApplicationInformationBlockProps } from './ReviewApplicationInformationBlock';

import withInteractor from './ReviewApplicationInformationBlock.interactor';
import withPresenter from './ReviewApplicationInformationBlock.presenter';

export type { ReviewApplicationInformationBlockProps };

export default withInteractor(withPresenter(ReviewApplicationInformationBlock));

