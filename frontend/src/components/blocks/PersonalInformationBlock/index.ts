import PersonalInformationBlockView, { PersonalInformationBlockProps } from './PersonalInformationBlock';
import withInteractor from './PersonalInformationBlock.interactor';
import withPresenter from './PersonalInformationBlock.presenter';

export type { PersonalInformationBlockProps };
const PersonalInformationBlock = withInteractor(withPresenter(PersonalInformationBlockView));
export default PersonalInformationBlock;
