import QuoteBlock, { QuoteBlockProps } from './QuoteBlock';
import withInteractor from './QuoteBlock.interactor';
import withPresenter from './QuoteBlock.presenter';

export type { QuoteBlockProps };

export default withInteractor(withPresenter(QuoteBlock));
