/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ContactInfoCustomerBlockProps, defaultProps } from './ContactInfoCustomerBlock';
import { isEmptyString } from '../../../lib/utils';

export type ContactInfoCustomerBlockPresenterProps = ContactInfoCustomerBlockProps & {};

const withPresenter = (
  View: React.FC<ContactInfoCustomerBlockProps>,
): React.FC<ContactInfoCustomerBlockPresenterProps> => {
  const Presenter: React.FC<ContactInfoCustomerBlockPresenterProps> = (props) => {
    const { t } = useTranslation();
    const {
      flowType,
      quoteUserType,
      contactInfo,
      setContactInfo,
    } = props;

    const [customerName, setCustomerName] = useState<string>();
    const [customerEmail, setCustomerEmail] = useState<string>();
    const [customerCompanyName, setCustomerCompanyName] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
      if (contactInfo) {
        setCustomerName(contactInfo.customerName);
        setCustomerEmail(contactInfo.customerEmail);
        setCustomerCompanyName(contactInfo.customerCompanyName);
      }
    }, [contactInfo]);

    const handleChangeCustomerName = ({ target: { value } }) => setCustomerName(value);
    const handleChangeCustomerEmail = ({ target: { value } }) => setCustomerEmail(value);
    const handleChangeCustomerCompanyName = ({ target: { value } }) => setCustomerCompanyName(value);

    const isFormValid = !isEmptyString(customerName) && !isEmptyString(customerEmail)
      && !isEmptyString(customerCompanyName) && !isLoading;
    const handleClickViewQuote = async () => {
      if (customerName && customerEmail && customerCompanyName && setContactInfo) {
        setIsLoading(true);
        await setContactInfo({
          type: 'customer',
          customerName,
          customerEmail,
          customerCompanyName,
        });
        setIsLoading(false);
      }
    };

    const showAsCustomer = flowType !== 'instaQuote' && quoteUserType === 'vendor';
    const blockProps: ContactInfoCustomerBlockProps = {
      ...defaultProps,
      ...props,
      blockHeading: {
        ...defaultProps.blockHeading,
        value: showAsCustomer ? t('contact_info.header_customer') : t('contact_info.header_contact'),
      },
      nameTextField: {
        ...defaultProps.nameTextField,
        label: {
          ...defaultProps.nameTextField?.label,
          value: showAsCustomer ? t('contact_info.customer_name') : t('contact_info.name'),
        },
        textInput: {
          onTextChanged: handleChangeCustomerName,
          textValue: customerName,
        },
      },
      businessEmailTextField: {
        ...defaultProps.businessEmailTextField,
        label: {
          ...defaultProps.businessEmailTextField?.label,
          value: showAsCustomer ? t('contact_info.customer_email') : t('contact_info.business_email'),
        },
        textInput: {
          onTextChanged: handleChangeCustomerEmail,
          textValue: customerEmail,
        },
      },
      companyNameField: {
        ...defaultProps.companyNameField,
        label: {
          ...defaultProps.companyNameField?.label,
          value: showAsCustomer ? t('contact_info.customer_company_name') : t('contact_info.company_name'),
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
          value: showAsCustomer ? t('contact_info.submit_vendor') : t('contact_info.submit'),
        },
        disabled: !isFormValid,
        onButtonClicked: handleClickViewQuote,
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
