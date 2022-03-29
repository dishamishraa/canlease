import ContactInformationBlockView, { ContactInformationBlockProps } from './ContactInformationBlock';
import withInteractor from './ContactInformationBlock.interactor';
import withPresenter from './ContactInformationBlock.presenter';

export type { ContactInformationBlockProps };
const ContactInformationBlock = withInteractor(withPresenter(ContactInformationBlockView));
export default ContactInformationBlock;
