import CreatePasswordBlockView, { CreatePasswordBlockProps } from './CreatePasswordBlock';
import withInteractor from './CreatePasswordBlock.interactor';
import withPresenter from './CreatePasswordBlock.presenter'

export type { CreatePasswordBlockProps };
const CreatePasswordBlock = withInteractor(withPresenter(CreatePasswordBlockView));
export default CreatePasswordBlock;
