import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { TextInputProps } from '../../atoms/TextInput';
import { ContactInfoCustomerBlockProps, defaultProps } from './ContactInfoCustomerBlock';
import { ContextualMenuProps } from '../../molecules/ContextualMenu';
import { ContextualMenuItemProps } from '../../atoms/ContextualMenuItem';
import { defaultProps as defaultMenuItemProps } from '../../atoms/ContextualMenuItem/ContextualMenuItem';


export type ContactInfoCustomerBlockPresenterProps = {};

const withPresenter = (
  View: React.FC<ContactInfoCustomerBlockProps>,
): React.FC<ContactInfoCustomerBlockPresenterProps> => {
  const Presenter: React.FC<ContactInfoCustomerBlockPresenterProps> = (props) => {
    const { t } = useTranslation();
    const history = useHistory();

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const target = queryParams.get('target') || '/';

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
        textInput: {
          // textPlaceholder: t('contact_info.name.placeholder'),
          // onTextChanged: handleChangeEquipmentName,
        },
      },
      businessEmailTextField: {
        ...defaultProps.businessEmailTextField,
        label: {
          ...defaultProps.businessEmailTextField?.label,
          value: t('contact_info.business_email'),
        },
        textInput: {
          // textPlaceholder: t('contact_info.cost.placeholder'),
          // onTextChanged: handleChangeEquipmentCost,
        },
      },
      companyNameField: {
        ...defaultProps.companyNameField,
        label: {
          ...defaultProps.companyNameField?.label,
          value: t('contact_info.company_name'),
        },
        textInput: {
          // textPlaceholder: t('contact_info.cost.placeholder'),
          // onTextChanged: handleChangeEquipmentCost,
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
