import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ContactInfo } from '../../../lib/types';
import { UseCreateQuoteResult } from '../../../modules/quote/useCreateQuote';
import { ContactInfoCustomerBlockProps, defaultProps } from './ContactInfoCustomerBlock';


export type ContactInfoCustomerBlockPresenterProps = {
  setContactInfo?: React.Dispatch<React.SetStateAction<ContactInfo>>;
};

const withPresenter = (
  View: React.FC<ContactInfoCustomerBlockProps>,
): React.FC<ContactInfoCustomerBlockPresenterProps> => {
  const Presenter: React.FC<ContactInfoCustomerBlockPresenterProps> = (props) => {
    const { t } = useTranslation();

    const blockProps: ContactInfoCustomerBlockProps = {
      ...defaultProps,
      ...props,
      blockHeading: {
        ...defaultProps.blockHeading,
        value: t('contact_info.header_your')
      },
      nameTextField:{
        ...defaultProps.nameTextField,
        label: {
          ...defaultProps.nameTextField?.label,
          value: t('contact_info.name'),
        },
      },
      businessEmailTextField: {
        ...defaultProps.businessEmailTextField,
        label: {
          ...defaultProps.businessEmailTextField?.label,
          value: t('contact_info.business_email'),
        },
      },
      companyNameField: {
        ...defaultProps.companyNameField,
        label: {
          ...defaultProps.companyNameField?.label,
          value: t('contact_info.company_name'),
        },
      },
      viewQuoteButton:{
        ...defaultProps.viewQuoteButton,
        text: {
          value: t('contact_info.submit')
        },
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
