import ContactInfoVendorBlock, { ContactInfoVendorBlockProps } from './ContactInfoVendorBlock';

import withInteractor from './ContactInfoVendorBlock.interactor';
import withPresenter from './ContactInfoVendorBlock.presenter';

export type { ContactInfoVendorBlockProps };
export default withInteractor(withPresenter(ContactInfoVendorBlock));
