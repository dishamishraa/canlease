import TermsOfApplicationBlock, { TermsOfApplicationBlockProps } from './TermsOfApplicationBlock';

import withInteractor from './TermsOfApplicationBlock.interactor';
import withPresenter from './TermsOfApplicationBlock.presenter';

export type { TermsOfApplicationBlockProps };

export default withInteractor(withPresenter(TermsOfApplicationBlock));

