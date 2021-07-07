import DataBlockView, { DataBlockProps } from './DataBlock';
import withPresenter from './DataBlock.presenter';
import withInteractor from './DataBlock.interactor';

const DataBlock = withInteractor(withPresenter(DataBlockView));

export type { DataBlockProps };
export default DataBlock;
