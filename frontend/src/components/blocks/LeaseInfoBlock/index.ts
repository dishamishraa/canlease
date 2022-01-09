import LeaseInfoBlockView, { LeaseInfoBlockProps } from './LeaseInfoBlock';

import withPresenter from './LeaseInfoBlock.presenter';
import withInteractor from './LeaseInfoBlock.interactor';

const LeaseInfoBlock = withInteractor(withPresenter(LeaseInfoBlockView));

export type { LeaseInfoBlockProps };
export default LeaseInfoBlock;
