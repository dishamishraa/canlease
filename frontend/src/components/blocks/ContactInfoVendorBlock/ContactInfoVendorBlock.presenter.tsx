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
    const [customerCompanyName, setCustomerC] = useState<string>('');

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
          // onTextChanged: handleChangeEquipmentName,
        },
      },
      vendorBusinessEmailTextField: {
        ...defaultProps.vendorBusinessEmailTextField,
        label: {
          ...defaultProps.vendorBusinessEmailTextField?.label,
          value: t('contact_info_vendor.business_email'),
        },
        textInput: {
          // onTextChanged: handleChangeEquipmentCost,
        },
      },
      vendorCompanyNameField: {
        ...defaultProps.vendorCompanyNameField,
        label: {
          ...defaultProps.vendorCompanyNameField?.label,
          value: t('contact_info_vendor.company_name'),
        },
        textInput: {
          // onTextChanged: handleChangeEquipmentCost,
        },
      },
      customerNameTextField: {
        ...defaultProps.customerNameTextField,
        label: {
          ...defaultProps.customerNameTextField?.label,
          value: t('contact_info_vendor.customer_name'),
        },
        textInput: {
          // onTextChanged: handleChangeEquipmentCost,
        },
      },
      customerEmailTextField: {
        ...defaultProps.customerEmailTextField,
        label: {
          ...defaultProps.customerEmailTextField?.label,
          value: t('contact_info_vendor.customer_email'),
        },
        textInput: {
          // onTextChanged: handleChangeEquipmentCost,
        },
      },
      customerCompanyNameTextField: {
        ...defaultProps.customerCompanyNameTextField,
        label: {
          ...defaultProps.customerCompanyNameTextField?.label,
          value: t('contact_info_vendor.customer_company_name'),
        },
        textInput: {
          // onTextChanged: handleChangeEquipmentCost,
        },
      },
      viewQuoteButton:{
        ...defaultProps.viewQuoteButton,
        text: {
          value: t('contact_info_vendor.submit')
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
