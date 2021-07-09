import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ContactInfoCustomer } from '../../../modules/types';
import { ContactInfoCustomerBlockProps, defaultProps } from './ContactInfoCustomerBlock';
import { isEmptyString } from '../../../lib/utils';

export type ContactInfoCustomerBlockPresenterProps = {
  handleCreateQuote?: (contactInfo: ContactInfoCustomer) => void;
};

const withPresenter = (
  View: React.FC<ContactInfoCustomerBlockProps>,
): React.FC<ContactInfoCustomerBlockPresenterProps> => {
  const Presenter: React.FC<ContactInfoCustomerBlockPresenterProps> = (props) => {
    const { t } = useTranslation();
    const { handleCreateQuote } = props;
    const [customerName, setCustomerName] = useState<string>('');
    const [customerEmail, setCustomerEmail] = useState<string>('');
    const [customerCompanyName, setCustomerCompanyName] = useState<string>('');

    const handleChangeCustomerName = ({ target: { value } }) => setCustomerName(value);
    const handleChangeCustomerEmail = ({ target: { value } }) => setCustomerEmail(value);
    const handleChangeCustomerCompanyName = ({ target: { value } }) => setCustomerCompanyName(value);

    const isFormValid = !isEmptyString(customerName) && !isEmptyString(customerEmail)
    && !isEmptyString(customerCompanyName);
    const handleClickViewQuote = () => {
      if (isFormValid && handleCreateQuote) {
        handleCreateQuote({
          type: 'customer',
          customerName,
          customerEmail,
          customerCompanyName,
        });
      }
    };

    const blockProps: ContactInfoCustomerBlockProps = {
      ...defaultProps,
      ...props,
      blockHeading: {
        ...defaultProps.blockHeading,
        value: t('contact_info.header_your'),
      },
      nameTextField: {
        ...defaultProps.nameTextField,
        label: {
          ...defaultProps.nameTextField?.label,
          value: t('contact_info.name'),
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
          value: t('contact_info.business_email'),
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
          value: t('contact_info.company_name'),
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
