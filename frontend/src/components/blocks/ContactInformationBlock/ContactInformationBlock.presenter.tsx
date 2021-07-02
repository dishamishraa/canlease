import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation, useParams } from 'react-router';
import { defaultProps, ContactInformationBlockProps } from './ContactInformationBlock';
import { APIResponse } from '../../../lib/api/types';
import { defaultProps as defaultTextFieldProps, TextFieldStateType } from '../../molecules/TextField/TextField';
import { AuthPageLocationState, ContactInformation } from '../../pages/AuthPage/AuthPage';
import { isEmptyString } from '../../../lib/utils';
import { defaultProps as defaultMenuItemProps } from '../../atoms/ContextualMenuItem/ContextualMenuItem';
import { ContextualMenuProps } from '../../molecules/ContextualMenu/ContextualMenu';

export type ContactInformationBlockPresenterProps = ContactInformationBlockProps & {
  setContactInfo?: React.Dispatch<React.SetStateAction<ContactInformation>>;
};

const withPresenter = (
  View: React.FC<ContactInformationBlockProps>,
): React.FC<ContactInformationBlockPresenterProps> => {
  const Presenter: React.FC<ContactInformationBlockPresenterProps> = (props) => {
    const {
      setContactInfo,
    } = props
    const { t } = useTranslation();
    const history = useHistory();
    const { state } = useLocation<AuthPageLocationState>()
    const { email } = state || {};
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [streetAddress, setStreetAddress] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [postalCode, setPostalCode] = useState<string>('');
    const [province, setProvince] = useState<string>('');

    const FormInvalid = (isEmptyString(phoneNumber) 
    || isEmptyString(streetAddress)
    || isEmptyString(city)
    || isEmptyString(postalCode))

    const handlePhoneNumber = ({ target: { value } }) => {
      setPhoneNumber(value);
    };

    const handleStreetAddress = ({ target: { value } }) => {
      setStreetAddress(value);
    };

    const handleCity = ({ target: { value } }) => {
      setCity(value);
    };

    const handlePostalCode = ({ target: { value } }) => {
      setPostalCode(value);
    };

    const handleNext = () => {
      if(setContactInfo && state && email){
        console.log('here')
        setContactInfo({
          email: email,
          phone: phoneNumber,
          street: streetAddress,
          city: city,
          postalCode: postalCode,
          province: province
        });
        history.push({pathname: '/account/businessInformation'})
      }
    }

    const handleSelectOption0 = () => setProvince(t('contact_information.province.0'));
    const handleSelectOption1 = () => setProvince(t('contact_information.province.1'));
    const handleSelectOption2 = () => setProvince(t('contact_information.province.2'));
    const handleSelectOption3 = () => setProvince(t('contact_information.province.3'));
    const handleSelectOption4 = () => setProvince(t('contact_information.province.4'));
    const handleSelectOption5 = () => setProvince(t('contact_information.province.5'));
    const handleSelectOption6 = () => setProvince(t('contact_information.province.6'));
    const handleSelectOption7 = () => setProvince(t('contact_information.province.7'));
    const handleSelectOption8 = () => setProvince(t('contact_information.province.8'));
    const handleSelectOption9 = () => setProvince(t('contact_information.province.9'));
    const handleSelectOption10 = () => setProvince(t('contact_information.province.10'));
    const handleSelectOption11 = () => setProvince(t('contact_information.province.11'));
    const handleSelectOption12 = () => setProvince(t('contact_information.province.12'));

    const contextualMenu: ContextualMenuProps = {
      contextualMenuItemList: {
        contextualMenuItems: [
          {
            text: {
              ...defaultMenuItemProps.text,
              value: t('contact_information.province.0'),
            },
            onContextualMenuItemClicked: handleSelectOption0
          },
          {
            text: {
              ...defaultMenuItemProps.text,
              value: t('contact_information.province.1'),
            },
            onContextualMenuItemClicked: handleSelectOption1
          },
          {
            text: {
              ...defaultMenuItemProps.text,
              value: t('contact_information.province.2'),
            },
            onContextualMenuItemClicked: handleSelectOption2
          },
          {
            text: {
              ...defaultMenuItemProps.text,
              value: t('contact_information.province.3'),
            },
            onContextualMenuItemClicked: handleSelectOption3
          },
          {
            text: {
              ...defaultMenuItemProps.text,
              value: t('contact_information.province.4'),
            },
            onContextualMenuItemClicked: handleSelectOption4
          },
          {
            text: {
              ...defaultMenuItemProps.text,
              value: t('contact_information.province.5'),
            },
            onContextualMenuItemClicked: handleSelectOption5
          },
          {
            text: {
              ...defaultMenuItemProps.text,
              value: t('contact_information.province.6'),
            },
            onContextualMenuItemClicked: handleSelectOption6
          },
          {
            text: {
              ...defaultMenuItemProps.text,
              value: t('contact_information.province.7'),
            },
            onContextualMenuItemClicked: handleSelectOption7
          },
          {
            text: {
              ...defaultMenuItemProps.text,
              value: t('contact_information.province.8'),
            },
            onContextualMenuItemClicked: handleSelectOption8
          },
          {
            text: {
              ...defaultMenuItemProps.text,
              value: t('contact_information.province.9'),
            },
            onContextualMenuItemClicked: handleSelectOption9
          },
          {
            text: {
              ...defaultMenuItemProps.text,
              value: t('contact_information.province.10'),
            },
            onContextualMenuItemClicked: handleSelectOption10
          },
          {
            text: {
              ...defaultMenuItemProps.text,
              value: t('contact_information.province.11'),
            },
            onContextualMenuItemClicked: handleSelectOption11
          },
          {
            text: {
              ...defaultMenuItemProps.text,
              value: t('contact_information.province.12'),
            },
            onContextualMenuItemClicked: handleSelectOption12
          },
        ]
      }
    }

    const contactInformationBlockProps: ContactInformationBlockProps = {
      ...defaultProps,
      stepper: {
        ...defaultProps.stepper,
        text: {
          ...defaultProps.stepper.text,
          value: t('stepper', {
            current: '2',
            total: '3'
          })
        }
      },
      blockHeading: {
        ...defaultProps.blockHeading,
        value: t('contact_information.header')
      },
      emailTextField: {
        ...defaultProps.emailTextField,
        label: {
          ...defaultProps.emailTextField.label,
          value: t('text_field_label.email'),
        },
        textInput: {
          textValue: email
        },
      },
      phoneNumberTextField: {
        ...defaultProps.phoneNumberTextField,
        label: {
          ...defaultProps.phoneNumberTextField.label,
          value: t('text_field_label.phone_number'),
        },
        textInput: {
          textValue: phoneNumber,
          onTextChanged: handlePhoneNumber
        },
      },
      streetAddressTextField: {
        ...defaultProps.streetAddressTextField,
        label: {
          ...defaultProps.streetAddressTextField.label,
          value: t('text_field_label.street_address'),
        },
        textInput: {
          textValue: streetAddress,
          onTextChanged: handleStreetAddress
        },
      },
      cityTextField: {
        ...defaultProps.cityTextField,
        label: {
          ...defaultProps.cityTextField.label,
          value: t('text_field_label.city'),
        },
        textInput: {
          textValue: city,
          onTextChanged: handleCity
        },
      },
      postalCodeTextField: {
        ...defaultProps.postalCodeTextField,
        label: {
          ...defaultProps.postalCodeTextField.label,
          value: t('text_field_label.postal_code'),
        },
        textInput: {
          textValue: postalCode,
          onTextChanged: handlePostalCode
        },
      },
      provinceSelectField: {
        ...defaultProps.provinceSelectField,
        label: {
          ...defaultProps.provinceSelectField.label,
          value: t('text_field_label.province'),
        },
        select: {
          ...defaultProps.provinceSelectField.select,
          text: {
            ...defaultProps.provinceSelectField.select?.text,
            value: province,
          },
        },
        contextualMenu,
        selectId: t('text_field_label.province'),
      },
      nextButton: {
        ...defaultProps.nextButton,
        text: {
          ...defaultProps.nextButton.text,
          value: t('button_text.next')
        },
        onButtonClicked: handleNext,
        disabled: FormInvalid
      }
    }

    return <View
          {...contactInformationBlockProps}
          />;
  };
  return Presenter;
};

export default withPresenter;
