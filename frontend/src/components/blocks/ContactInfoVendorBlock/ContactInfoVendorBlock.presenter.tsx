import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { TextInputProps } from '../../atoms/TextInput';
import { ContactInfoVendorBlockProps, defaultProps } from './ContactInfoVendorBlock';
import { ContextualMenuProps } from '../../molecules/ContextualMenu';
import { ContextualMenuItemProps } from '../../atoms/ContextualMenuItem';
import { defaultProps as defaultMenuItemProps } from '../../atoms/ContextualMenuItem/ContextualMenuItem';


export type ContactInfoVendorBlockPresenterProps = {};

const withPresenter = (
  View: React.FC<ContactInfoVendorBlockProps>,
): React.FC<ContactInfoVendorBlockPresenterProps> => {
  const Presenter: React.FC<ContactInfoVendorBlockPresenterProps> = (props) => {
    const { t } = useTranslation();
    const history = useHistory();

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const target = queryParams.get('target') || '/';

    const [vendorName, setVendorName] = useState<string>('');
    const [businessEmail, setBusinessEmail] = useState<string>('');
    const [companyName, setCompanyName] = useState<string>('');
    const [customerName, setCustomerName] = useState<string>('');
    const [customerEmail, setCustomerEmail] = useState<string>('');
    const [customerCompanyName, setCustomerCompanyName] = useState<string>('');

    const handleChangeVendorName: TextInputProps['onTextChanged'] = ({ target: { value } }) => setVendorName(value);
    const handleChangeBusinessEmail: TextInputProps['onTextChanged'] = ({ target: { value } }) => setBusinessEmail(value);
    const handleChangeCompanyName: TextInputProps['onTextChanged'] = ({ target: { value } }) => setCompanyName(value);
    const handleChangeCustomerName: TextInputProps['onTextChanged'] = ({ target: { value } }) => setCustomerName(value);
    const handleChangeCustomerEmail: TextInputProps['onTextChanged'] = ({ target: { value } }) => setCustomerEmail(value);
    const handleChangeCustomerCompanyName: TextInputProps['onTextChanged'] = ({ target: { value } }) => setCustomerCompanyName(value);

    const isFormValid = Boolean(vendorName && businessEmail && companyName
      && customerName && customerEmail && customerCompanyName );
    const handleClickViewQuote = () => {
      if(isFormValid){
        //callback function here
      }
    };

    const blockProps: ContactInfoVendorBlockProps = {
      ...defaultProps,
      ...props,
      blockHeading: {
        ...defaultProps.blockHeading,
        value: t('contact_info_vendor.header_your')
      },
      blockVendorHeading: {
        ...defaultProps.blockHeading,
        value: t('contact_info_vendor.header_customer')
      },
      vendorNameTextField:{
        ...defaultProps.vendorNameTextField,
        label: {
          ...defaultProps.vendorNameTextField?.label,
          value: t('contact_info_vendor.name'),
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
          value: t('contact_info_vendor.business_email'),
        },
        textInput: {
          onTextChanged: handleChangeBusinessEmail,
          textValue: businessEmail
        },
      },
      vendorCompanyNameField: {
        ...defaultProps.vendorCompanyNameField,
        label: {
          ...defaultProps.vendorCompanyNameField?.label,
          value: t('contact_info_vendor.company_name'),
        },
        textInput: {
          onTextChanged: handleChangeCompanyName,
          textValue: companyName
        },
      },
      customerNameTextField: {
        ...defaultProps.customerNameTextField,
        label: {
          ...defaultProps.customerNameTextField?.label,
          value: t('contact_info_vendor.customer_name'),
        },
        textInput: {
          onTextChanged: handleChangeCustomerName,
          textValue: customerName
        },
      },
      customerEmailTextField: {
        ...defaultProps.customerEmailTextField,
        label: {
          ...defaultProps.customerEmailTextField?.label,
          value: t('contact_info_vendor.customer_email'),
        },
        textInput: {
          onTextChanged: handleChangeCustomerEmail,
          textValue: customerEmail
        },
      },
      customerCompanyNameTextField: {
        ...defaultProps.customerCompanyNameTextField,
        label: {
          ...defaultProps.customerCompanyNameTextField?.label,
          value: t('contact_info_vendor.customer_company_name'),
        },
        textInput: {
          onTextChanged: handleChangeCustomerCompanyName,
          textValue: customerCompanyName
        },
      },
      disclaimerText: {
        ...defaultProps.disclaimerText,
        value: t('contact_info_vendor.disclaimer')
      },
      viewQuoteButton:{
        ...defaultProps.viewQuoteButton,
        text: {
          value: t('contact_info_vendor.submit')
        },
        onButtonClicked: handleClickViewQuote,
        disabled: !isFormValid,
      }
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
