import QuoteSelectionBlock, { QuoteSelectionBlockProps } from './QuoteSelectionBlock';

import withInteractor from './QuoteSelectionBlock.interactor';
import withPresenter from './QuoteSelectionBlock.presenter';

export type { QuoteSelectionBlockProps };

export default withInteractor(withPresenter(QuoteSelectionBlock));
