import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { defaultProps, ContactInformationBlockProps } from './ContactInformationBlock';
import { isEmptyString } from '../../../lib/utils';
import { ContextualMenuItemProps, defaultProps as defaultMenuItemProps } from '../../atoms/ContextualMenuItem/ContextualMenuItem';

export type ContactInformationBlockPresenterProps = ContactInformationBlockProps & {
  email?: string;
};

const withPresenter = (
  View: React.FC<ContactInformationBlockProps>,
): React.FC<ContactInformationBlockPresenterProps> => {
  const Presenter: React.FC<ContactInformationBlockPresenterProps> = (props) => {
    const {
      email,
      contactInfo,
      setContactInfo,
    } = props;
    const { t } = useTranslation();
    const [phoneNumber, setPhoneNumber] = useState<string>();
    // const [unitNumber, setUnitNumber] = useState<string>();
    const [streetAddress, setStreetAddress] = useState<string>();
    const [city, setCity] = useState<string>();
    const [postalCode, setPostalCode] = useState<string>();
    const [province, setProvince] = useState<string>();

    useEffect(() => {
      if (contactInfo) {
        setPhoneNumber(contactInfo.phone);
        // setUnitNumber(contactInfo.unitNumber);
        setStreetAddress(contactInfo.street);
        setCity(contactInfo.city);
        setPostalCode(contactInfo.postalCode);
        setProvince(contactInfo.province);
      }
    }, [contactInfo]);
    
    const formInvalid = (isEmptyString(phoneNumber)
    || isEmptyString(streetAddress)
    || isEmptyString(city)
    || isEmptyString(postalCode)
    || isEmptyString(province));

    const handlePhoneNumber = ({ target: { value } }) => {
      setPhoneNumber(value);
    };

    // const handleUnitNumber = ({ target: { value } }) => {
    //   setUnitNumber(value);
    // };

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
        setContactInfo && 
        email && 
        phoneNumber && 
        streetAddress && 
        city && 
        postalCode &&
        province
      ) {
        setContactInfo({
          email,
          phone: phoneNumber,
          // unitNumber: unitNumber || '',
          street: streetAddress,
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

    const contactInformationBlockProps: ContactInformationBlockProps = {
      ...defaultProps,
      stepper: {
        ...defaultProps.stepper,
        text: {
          ...defaultProps.stepper.text,
          value: t('stepper', {
            current: '2',
            total: '3',
          }),
        },
      },
      blockHeading: {
        ...defaultProps.blockHeading,
        value: t('contact_information.header'),
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
          disabled: true,
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
      unitNumberTextField: {
        ...defaultProps.unitNumberTextField,
        label: {
          ...defaultProps.unitNumberTextField.label,
          value: t('text_field_label.unit_number'),
        },
        textInput: {
          // textValue: unitNumber,
          // onTextChanged: handleUnitNumber,
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
