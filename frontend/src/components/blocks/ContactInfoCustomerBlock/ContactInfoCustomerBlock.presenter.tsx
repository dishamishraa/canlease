import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ContactInfoCustomerBlockProps, defaultProps } from './ContactInfoCustomerBlock';
import { Cookies, useCookies } from 'react-cookie';

export type ContactInfoCustomerBlockPresenterProps = {};

const withPresenter = (
  View: React.FC<ContactInfoCustomerBlockProps>,
): React.FC<ContactInfoCustomerBlockPresenterProps> => {
  const Presenter: React.FC<ContactInfoCustomerBlockPresenterProps> = (props) => {
    const { t } = useTranslation();
    const [cookies, setCookie, removeCookie] = useCookies();

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
      viewQuoteButton: {
        ...defaultProps.viewQuoteButton,
        text: {
          value: t('contact_info.submit'),
        },
        onButtonClicked: () => {
          setCookie("instantQuote", "", {maxAge: (6*30.5*24*3600)})
        },
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
