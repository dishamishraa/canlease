import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation, useParams } from 'react-router';
import { defaultProps, ContactInformationBlockProps } from './ContactInformationBlock';
import { APIResponse } from '../../../lib/api/types';
import { defaultProps as defaultTextFieldProps, TextFieldStateType } from '../../molecules/TextField/TextField';
import { AuthPageLocationState, ContactInformation, routes } from '../../pages/AuthPage/AuthPage';
import { isEmptyString } from '../../../lib/utils';
import { ContextualMenuItemProps, defaultProps as defaultMenuItemProps } from '../../atoms/ContextualMenuItem/ContextualMenuItem';
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
    const [unitNumber, setUnitNumber] = useState<string>('')
    const [streetAddress, setStreetAddress] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [postalCode, setPostalCode] = useState<string>('');
    const [province, setProvince] = useState<string>('');

    const formInvalid = (isEmptyString(phoneNumber) 
    || isEmptyString(streetAddress)
    || isEmptyString(city)
    || isEmptyString(postalCode)
    || isEmptyString(province))

    const handlePhoneNumber = ({ target: { value } }) => {
      setPhoneNumber(value);
    };

    const handleUnitNumber = ({ target: { value } }) => {
      setUnitNumber(value);
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
        setContactInfo({
          email: email,
          phone: phoneNumber,
          unitNumber: unitNumber,
          street: streetAddress,
          city: city,
          postalCode: postalCode,
          province: province
        });
        history.push({pathname: routes.businessInformation})
      }
    }

    const contextualMenuItems: ContextualMenuItemProps[] = [];
    for (let i = 0; i < 12; i++) {
      contextualMenuItems.push({
        text: {
          ...defaultMenuItemProps.text,
          value: t(`contact_information.province.${i}`),
        },
        onContextualMenuItemClicked: () => setProvince(t(`contact_information.province.${i}`)),
      })
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
      unitNumberTextField:{
        ...defaultProps.unitNumberTextField,
        label: {
          ...defaultProps.unitNumberTextField.label,
          value: t('text_field_label.unit_number'),
        },
        textInput: {
          textValue: unitNumber,
          onTextChanged: handleUnitNumber
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
        contextualMenu: {
          contextualMenuItemList: {
            contextualMenuItems
          }
        },
        selectId: t('text_field_label.province'),
      },
      nextButton: {
        ...defaultProps.nextButton,
        text: {
          ...defaultProps.nextButton.text,
          value: t('button_text.next')
        },
        onButtonClicked: handleNext,
        disabled: formInvalid
      }
    }

    return <View
          {...contactInformationBlockProps}
          />;
  };
  return Presenter;
};

export default withPresenter;
