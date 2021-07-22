import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { defaultProps, CustomerPersonalInformationBlockProps } from './CustomerPersonalInformationBlock';
import { isEmptyString } from '../../../lib/utils';
import { ContextualMenuItemProps, defaultProps as defaultMenuItemProps } from '../../atoms/ContextualMenuItem/ContextualMenuItem';

export type CustomerPersonalInformationBlockPresenterProps = CustomerPersonalInformationBlockProps & {
};

const withPresenter = (
  View: React.FC<CustomerPersonalInformationBlockProps>,
): React.FC<CustomerPersonalInformationBlockPresenterProps> => {
  const Presenter: React.FC<CustomerPersonalInformationBlockPresenterProps> = (props) => {
    const {
      setPersonalInfo,
      personalInfo,
      stepperCurrentValue,
      stepperTotalValue,
    } = props;
    const { t } = useTranslation();
    const [firstName, setFirstName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [phoneNumber, setPhoneNumber] = useState<string>();
    const [streetAddress, setStreetAddress] = useState<string>();
    const [city, setCity] = useState<string>();
    const [postalCode, setPostalCode] = useState<string>();
    const [province, setProvince] = useState<string>();

    useEffect(() => {
      if (personalInfo) {
        setFirstName(personalInfo.firstName);
        setLastName(personalInfo.lastName);
        setEmail(personalInfo.email);
        setPhoneNumber(personalInfo.phone);
        setStreetAddress(personalInfo.address);
        setCity(personalInfo.city);
        setPostalCode(personalInfo.postalCode);
        setProvince(personalInfo.province);
      }
    }, [personalInfo]);
    
    const formInvalid = (isEmptyString(phoneNumber)
    || isEmptyString(streetAddress)
    || isEmptyString(city)
    || isEmptyString(postalCode)
    || isEmptyString(province));

    const handleFirstName = ({ target: { value } }) => {
      setFirstName(value);
    };
    const handleLastName = ({ target: { value } }) => {
      setLastName(value);
    };
    const handleEmail = ({ target: { value } }) => {
      setEmail(value);
    };

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
      if (
        setPersonalInfo && 
        firstName &&
        lastName &&
        email && 
        phoneNumber && 
        streetAddress && 
        city && 
        postalCode &&
        province
      ) {
        setPersonalInfo({
          firstName,
          lastName,
          email,
          phone: phoneNumber,
          address: streetAddress,
          city,
          postalCode,
          province,
        });
      }
    };

    const contextualMenuItems: ContextualMenuItemProps[] = [];
    for (let i = 0; i <= 12; i++) {
      contextualMenuItems.push({
        text: {
          ...defaultMenuItemProps.text,
          value: t(`contact_information.province.${i}`),
        },
        onContextualMenuItemClicked: () => setProvince(t(`contact_information.province.${i}`)),
      });
    }

    const contactInformationBlockProps: CustomerPersonalInformationBlockProps = {
      ...defaultProps,
      stepper: {
        ...defaultProps.stepper,
        text: {
          ...defaultProps.stepper.text,
          value: t(`application_form.stepper`, {
            current: stepperCurrentValue,
            total: stepperTotalValue,
          }),
        },
      },
      blockHeading: {
        ...defaultProps.blockHeading,
        value: t('contact_information.header'),
      },
      firstNameTextField: {
        ...defaultProps.firstNameTextField,
        label: {
          ...defaultProps.firstNameTextField.label,
          value: 'First name', // TODO localize
        },
        textInput: {
          ...defaultProps.firstNameTextField.textInput,
          textValue: email,
          onTextChanged: handleFirstName,
        },
      },
      lastNameTextField: {
        ...defaultProps.lastNameTextField,
        label: {
          ...defaultProps.lastNameTextField.label,
          value: 'Last name', // TODO localize
        },
        textInput: {
          ...defaultProps.lastNameTextField.textInput,
          textValue: email,
          onTextChanged: handleLastName,
        },
      },
      emailTextField: {
        ...defaultProps.emailTextField,
        label: {
          ...defaultProps.emailTextField.label,
          value: t('text_field_label.email'),
        },
        textInput: {
          ...defaultProps.emailTextField.textInput,
          textValue: email,
          onTextChanged: handleEmail,
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
          onTextChanged: handlePhoneNumber,
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
          onTextChanged: handleStreetAddress,
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
          onTextChanged: handleCity,
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
          onTextChanged: handlePostalCode,
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
            contextualMenuItems,
          },
        },
        selectId: t('text_field_label.province'),
      },
      nextButton: {
        ...defaultProps.nextButton,
        text: {
          ...defaultProps.nextButton.text,
          value: t('button_text.next'),
        },
        onButtonClicked: handleNext,
        disabled: formInvalid,
      },
    };

    return <View
      {...props}
      {...contactInformationBlockProps}
      />;
  };
  return Presenter;
};

export default withPresenter;
