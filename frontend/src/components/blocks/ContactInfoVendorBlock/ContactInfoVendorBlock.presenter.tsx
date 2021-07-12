import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ContactInfoVendorBlockProps, defaultProps } from './ContactInfoVendorBlock';
import { isEmptyString } from '../../../lib/utils';

export type ContactInfoVendorBlockPresenterProps = ContactInfoVendorBlockProps & {
};

const withPresenter = (
  View: React.FC<ContactInfoVendorBlockProps>,
): React.FC<ContactInfoVendorBlockPresenterProps> => {
  const Presenter: React.FC<ContactInfoVendorBlockPresenterProps> = (props) => {
    const { t } = useTranslation();
    const { 
      contactInfo,
      handleCreateQuote,
    } = props;

    const [vendorName, setVendorName] = useState<string>();
    const [businessEmail, setBusinessEmail] = useState<string>();
    const [companyName, setCompanyName] = useState<string>();
    const [customerName, setCustomerName] = useState<string>();
    const [customerEmail, setCustomerEmail] = useState<string>();
    const [customerCompanyName, setCustomerCompanyName] = useState<string>();

    useEffect(() => {
      if (contactInfo) {
        setCustomerName(contactInfo.customerName);
        setCustomerEmail(contactInfo.customerEmail);
        setCustomerCompanyName(contactInfo.customerCompanyName);

        if(contactInfo.type === 'vendor') {
          setVendorName(contactInfo.vendorName);
          setBusinessEmail(contactInfo.businessEmail);
          setCompanyName(contactInfo.companyName);
        }
      }
    }, [contactInfo]);

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
      if (
        vendorName && 
        businessEmail && 
        companyName && 
        customerName &&
        customerEmail &&
        customerCompanyName &&
        handleCreateQuote
      ) {
        handleCreateQuote({
          type: 'vendor',
          vendorName,
          businessEmail,
          companyName,
          customerName,
          customerEmail,
          customerCompanyName,
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
        {...props}
        {...blockProps}
      />
    );
  };

  return Presenter;
};

export default withPresenter;
