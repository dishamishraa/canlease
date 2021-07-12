import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { defaultProps, PersonalInformationBlockProps } from './PersonalInformationBlock';
import { defaultProps as defaultRadioButtonItemProps, RadioButtonItemProps } from '../../atoms/RadioButtonItem/RadioButtonItem';
import { isEmptyString } from '../../../lib/utils';
import { UserType } from '../../../modules/profile/types';

export type PersonalInformationBlockPresenterProps = PersonalInformationBlockProps & {
};

const withPresenter = (
  View: React.FC<PersonalInformationBlockProps>,
): React.FC<PersonalInformationBlockPresenterProps> => {
  const Presenter: React.FC<PersonalInformationBlockPresenterProps> = (props) => {
    const {
      personalInfo,
      setPersonalInfo,
    } = props;
    const { t } = useTranslation();
    const [firstName, setFirstName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [userType, setUserType] = useState<UserType>('vendor');

    useEffect(() => {
      if (personalInfo) {
        setFirstName(personalInfo.firstName);
        setLastName(personalInfo.lastName);
        setUserType(personalInfo.userType);
      }
    }, [personalInfo]);

    const formInvalid = (isEmptyString(firstName) || isEmptyString(lastName));

    const handleFirstName = ({ target: { value } }) => {
      setFirstName(value);
    };

    const handleLastName = ({ target: { value } }) => {
      setLastName(value);
    };

    const handleNext = () => {
      if (setPersonalInfo && firstName && lastName && userType) {
        setPersonalInfo({
          firstName,
          lastName,
          userType,
        });
      }
    };

    const handleRadioSelection = (userType: UserType) => () => setUserType(userType);

    const radiobuttonPropsList: RadioButtonItemProps[] = [
      {
        ...defaultRadioButtonItemProps,
        state: userType === 'vendor' ? 'Selected' : 'Unselected',
        text: {
        ...defaultRadioButtonItemProps.text,
          value: t('personal_information.radio_text.supplier')
        },
        unselectedIcon: {
          ...defaultRadioButtonItemProps.unselectedIcon,
          onIconClicked: handleRadioSelection('vendor'),
        },
      },
      {
        ...defaultRadioButtonItemProps,
        state: userType === 'customer' ? 'Selected' : 'Unselected',
        text: {
          ...defaultRadioButtonItemProps.text,
          value: t('personal_information.radio_text.own_use'),
        },
        unselectedIcon: {
          ...defaultRadioButtonItemProps.unselectedIcon,
          onIconClicked: handleRadioSelection('customer'),
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
