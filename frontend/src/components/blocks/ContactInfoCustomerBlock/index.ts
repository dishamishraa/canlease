import ContactInfoCustomerBlock, { ContactInfoCustomerBlockProps } from './ContactInfoCustomerBlock';

import withInteractor from './ContactInfoCustomerBlock.interactor';
import withPresenter from './ContactInfoCustomerBlock.presenter';

export type { ContactInfoCustomerBlockProps };
export default withInteractor(withPresenter(ContactInfoCustomerBlock));