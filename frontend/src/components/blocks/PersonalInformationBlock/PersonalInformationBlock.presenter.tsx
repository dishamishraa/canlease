import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';
import { defaultProps, PersonalInformationBlockProps } from './PersonalInformationBlock';
import { defaultProps as defaultRadioButtonItemProps, RadioButtonItemProps } from '../../atoms/RadioButtonItem/RadioButtonItem';
import { isEmptyString } from '../../../lib/utils';
import { UserType } from '../../../modules/profile/types';
import { PersonalInformation, AuthPageLocationState } from '../../../modules/types';

export type PersonalInformationBlockPresenterProps = PersonalInformationBlockProps & {
  setPersonalInfo?: React.Dispatch<React.SetStateAction<PersonalInformation>>;
};

const withPresenter = (
  View: React.FC<PersonalInformationBlockProps>,
): React.FC<PersonalInformationBlockPresenterProps> => {
  const Presenter: React.FC<PersonalInformationBlockPresenterProps> = (props) => {
    const {
      setPersonalInfo,
    } = props;
    const { t } = useTranslation();
    const history = useHistory();
    const { state } = useLocation<AuthPageLocationState>();
    const { email } = state || {};
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [userType, setUserType] = useState<UserType>('vendor');

    const formInvalid = (isEmptyString(firstName) || isEmptyString(lastName));

    const handleFirstName = ({ target: { value } }) => {
      setFirstName(value);
    };

    const handleLastName = ({ target: { value } }) => {
      setLastName(value);
    };

    const handleNext = () => {
      if (setPersonalInfo && state) {
        setPersonalInfo({
          firstName,
          lastName,
          userType,
        });
        history.push({
          pathname: '/account/contactInformation',
          state: {
            email,
          },
        });
      }
    };

    const handleRadioSelectionVendor = () => {
      setUserType('vendor');
    };

    const handleRadioSelectionCustomer = () => {
      setUserType('customer');
    };

    const radiobuttonPropsList: RadioButtonItemProps[] = [
      {
        ...defaultRadioButtonItemProps,
        state: 'Selected',
        text: {
        ...defaultRadioButtonItemProps.text,
          value: t('personal_information.radio_text.supplier')
        },
        unselectedIcon: {
          ...defaultRadioButtonItemProps.unselectedIcon,
          onIconClicked: handleRadioSelectionVendor
        },
      },
      {
        ...defaultRadioButtonItemProps,
        state: 'Unselected',
        text: {
          ...defaultRadioButtonItemProps.text,
          value: t('personal_information.radio_text.own_use'),
        },
        unselectedIcon: {
          ...defaultRadioButtonItemProps.unselectedIcon,
          onIconClicked: handleRadioSelectionCustomer
        }
      }
    ];

    const personalInformationBlockProps: PersonalInformationBlockProps = {
      ...defaultProps,
      stepper: {
        ...defaultProps.stepper,
        text: {
          ...defaultProps.stepper.text,
          value: t('stepper', {
            current: '1',
            total: '3',
          }),
        },
      },
      blockHeading: {
        ...defaultProps.blockHeading,
        value: t('personal_information.header'),
      },
      firstNameTextField: {
        ...defaultProps.firstNameTextField,
        label: {
          ...defaultProps.firstNameTextField.label,
          value: t('text_field_label.first_name'),
        },
        textInput: {
          textValue: firstName,
          onTextChanged: handleFirstName,
        },
      },
      lastNameTextField: {
        ...defaultProps.lastNameTextField,
        label: {
          ...defaultProps.lastNameTextField.label,
          value: t('text_field_label.last_name'),
        },
        textInput: {
          textValue: lastName,
          onTextChanged: handleLastName,
        },
      },
      radiobuttonList: {
        radioButtonItems: radiobuttonPropsList,
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
      {...personalInformationBlockProps}
      />;
  };
  return Presenter;
};

export default withPresenter;
