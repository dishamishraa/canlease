import GetQuoteBlock, { GetQuoteBlockProps } from './GetQuoteBlock';
import withInteractor from './GetQuoteBlock.interactor';
import withPresenter from './GetQuoteBlock.presenter';

export type { GetQuoteBlockProps };
export default withInteractor(withPresenter(GetQuoteBlock));
