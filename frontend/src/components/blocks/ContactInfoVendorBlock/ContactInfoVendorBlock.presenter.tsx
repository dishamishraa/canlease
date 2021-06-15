import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ContactInfoVendorBlockProps, defaultProps } from './ContactInfoVendorBlock';
import { isEmptyString } from '../../../lib/utils';
import { ContactInfo } from '../../../lib/types';

export type ContactInfoVendorBlockPresenterProps = {
  handleCreateQuote?: (contactInfo: ContactInfo)=>void
};

const withPresenter = (
  View: React.FC<ContactInfoVendorBlockProps>,
): React.FC<ContactInfoVendorBlockPresenterProps> => {
  const Presenter: React.FC<ContactInfoVendorBlockPresenterProps> = (props) => {
    const { t } = useTranslation();
    const { handleCreateQuote } = props;
    const [vendorName, setVendorName] = useState<string>('');
    const [businessEmail, setBusinessEmail] = useState<string>('');
    const [companyName, setCompanyName] = useState<string>('');
    const [customerName, setCustomerName] = useState<string>('');
    const [customerEmail, setCustomerEmail] = useState<string>('');
    const [customerCompanyName, setCustomerCompanyName] = useState<string>('');

    const handleChangeVendorName = ({ target: { value } }) => setVendorName(value);
    const handleChangeBusinessEmail = ({ target: { value } }) => setBusinessEmail(value);
    const handleChangeCompanyName = ({ target: { value } }) => setCompanyName(value);
    const handleChangeCustomerName = ({ target: { value } }) => setCustomerName(value);
    const handleChangeCustomerEmail = ({ target: { value } }) => setCustomerEmail(value);
    const handleChangeCustomerCompanyName = ({ target: { value } }) => setCustomerCompanyName(value);

    const isFormValid = !isEmptyString(vendorName) && !isEmptyString(businessEmail)
      && !isEmptyString(companyName) && !isEmptyString(customerName)
      && !isEmptyString(customerEmail) && !isEmptyString(customerCompanyName);
    const handleClickViewQuote = () => {
      if(isFormValid && handleCreateQuote){
        handleCreateQuote({
          vendorName: vendorName,
          businessEmail: businessEmail,
          companyName: companyName,
          customerName: customerName,
          customerEmail: customerEmail,
          customerCompanyName: customerCompanyName,
        });
      }
    };

    const blockProps: ContactInfoVendorBlockProps = {
      ...defaultProps,
      ...props,
      blockHeading: {
        ...defaultProps.blockHeading,
        value: t('contact_info.header_your'),
      },
      blockVendorHeading: {
        ...defaultProps.blockHeading,
        value: t('contact_info.header_customer'),
      },
      vendorNameTextField: {
        ...defaultProps.vendorNameTextField,
        label: {
          ...defaultProps.vendorNameTextField?.label,
          value: t('contact_info.name'),
        },
        textInput: {
          onTextChanged: handleChangeVendorName,
          textValue: vendorName,
        },
      },
      vendorBusinessEmailTextField: {
        ...defaultProps.vendorBusinessEmailTextField,
        label: {
          ...defaultProps.vendorBusinessEmailTextField?.label,
          value: t('contact_info.business_email'),
        },
        textInput: {
          onTextChanged: handleChangeBusinessEmail,
          textValue: businessEmail,
        },
      },
      vendorCompanyNameField: {
        ...defaultProps.vendorCompanyNameField,
        label: {
          ...defaultProps.vendorCompanyNameField?.label,
          value: t('contact_info.company_name'),
        },
        textInput: {
          onTextChanged: handleChangeCompanyName,
          textValue: companyName,
        },
      },
      customerNameTextField: {
        ...defaultProps.customerNameTextField,
        label: {
          ...defaultProps.customerNameTextField?.label,
          value: t('contact_info.customer_name'),
        },
        textInput: {
          onTextChanged: handleChangeCustomerName,
          textValue: customerName,
        },
      },
      customerEmailTextField: {
        ...defaultProps.customerEmailTextField,
        label: {
          ...defaultProps.customerEmailTextField?.label,
          value: t('contact_info.customer_email'),
        },
        textInput: {
          onTextChanged: handleChangeCustomerEmail,
          textValue: customerEmail,
        },
      },
      customerCompanyNameTextField: {
        ...defaultProps.customerCompanyNameTextField,
        label: {
          ...defaultProps.customerCompanyNameTextField?.label,
          value: t('contact_info.customer_company_name'),
        },
        textInput: {
          onTextChanged: handleChangeCustomerCompanyName,
          textValue: customerCompanyName,
        },
      },
      disclaimerText: {
        ...defaultProps.disclaimerText,
        value: t('contact_info.disclaimer'),
      },
      viewQuoteButton: {
        ...defaultProps.viewQuoteButton,
        text: {
          value: t('contact_info.submit'),
        },
        onButtonClicked: handleClickViewQuote,
        disabled: !isFormValid,
      },
    };

    return (
      <View
        {...blockProps}
      />
    );
  };

  return Presenter;
};

export default withPresenter;
