import React, { useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { BusinessTypeBlockProps, defaultProps } from './BusinessTypeBlock';
import { defaultProps as defaultRadioButtonItemProps } from '../../atoms/RadioButtonItem/RadioButtonItem';
import { getTodaysDateString, isEmptyString, isValidDate } from '../../../lib/utils';
import { Profile } from '../../../modules/profile/types';
import { defaultProps as defaultTextFieldProps } from '../../molecules/TextField/TextField';
import { IS_SAFARI } from '../../../lib/constants';

export type BusinessTypeBlockPresenterProps = BusinessTypeBlockProps & {
  profile: Profile | null;
};

type FormState = {
  dobError: string;
}

const withPresenter = (
  View: React.FC<BusinessTypeBlockProps>,
): React.FC<BusinessTypeBlockPresenterProps> => {
  const Presenter: React.FC<BusinessTypeBlockPresenterProps> = (props) => {
    const {
      className,
      businessInfo,
      setBusinessInfo,
      stepperCurrentValue,
      stepperTotalValue,
    } = props;
    const { t } = useTranslation();

    const [businessType, setBusinessType] = useState<'Proprietorship' | 'Incorporated'>();
    const [showBusinessQuestions, setShowBusinessQuestions] = useState<boolean>(false);
    const [sin, setSin] = useState<string>();
    const [dob, setDob] = useState<string>();
    const [bankruptcy, setBankruptcy] = useState<boolean>();
    const [bankruptcyDetails, setBankruptcyDetails] = useState<string>();
    const [formState, setFormState] = useState<FormState>();

    useEffect(() => {
      if (businessInfo) {
        setBusinessType(businessInfo.businessType);
        setSin(businessInfo.sin);
        setDob(businessInfo.dob);
        setBankruptcy(businessInfo.bankruptcy);
        setBankruptcyDetails(businessInfo.bankruptcyDetails);

        if (businessInfo.businessType === 'Proprietorship') {
          setShowBusinessQuestions(true);
        }
      }
    }, [businessInfo]);

    let currFormState: FormState = {
      dobError: ''
    };

    const handleClickNext = () => {
      let allFieldsAreValid = true;
      if (setBusinessInfo && businessType) {
        if (dob) {
          if (!isValidDate(dob, 'past')) {
            allFieldsAreValid = false;
            currFormState.dobError = t('error_message.invalid_date');
            setFormState(currFormState);
          }
        }

        if (allFieldsAreValid) {
          setBusinessInfo({
            type: 'customer',
            businessType,
            sin: sin || '',
            dob: dob || '',
            bankruptcy: bankruptcy || false,
            bankruptcyDetails: bankruptcyDetails || '',
          });
        }
        
      }
    };

    const handleChangeSocialInsuranceNumber = ({ target: { value } }) => {
      setSin(value);
    };

    const handleChangeDateOfBirth = ({ target: { value } }) => {
      setDob(value);
    };

    const handleBusinessTypeClick = (option: 'Proprietorship' | 'Incorporated') => () => {
      if (option === 'Proprietorship') {
        setShowBusinessQuestions(true);
      } else {
        setShowBusinessQuestions(false);
      }
      setBusinessType(option);
    };
    const handleBankruptcyClick = (option: boolean) => (event: any) => {
      setBankruptcy(option);
    };

    const handleChangeBankruptcyDetails = ({ target: { value } }) => {
      setBankruptcyDetails(value);
    };

    const isFormValid = () => {
      return businessType === 'Incorporated' 
      || (!isEmptyString(businessType) && !isEmptyString(sin) && !isEmptyString(dob) 
      && (bankruptcy === false || !isEmptyString(bankruptcyDetails)));
    };

    const businessTypeBlockProps: BusinessTypeBlockProps = {
      ...defaultProps,
      stepper: {
        text: {
          ...defaultProps.stepper.text,
          value: t('application_form.stepper', {
            current: stepperCurrentValue,
            total: stepperTotalValue,
          }),
        },
      },
      blockHeading: {
        ...defaultProps.blockHeading,
        value: t('application_form.business_type.heading_text'),
      },
      businessTypeRadioField: {
        ...defaultProps.businessTypeRadioField,
        label: {
          ...defaultProps.businessTypeRadioField.label,
          value: t('application_form.business_type.business_type.label'),
        },
        radioButtonItems: [
          {
            ...defaultRadioButtonItemProps,
            state: businessType === 'Incorporated' ? 'Selected' : 'Unselected',
            selectedIcon: {
              ...defaultRadioButtonItemProps.selectedIcon,
            },
            unselectedIcon: {
              ...defaultRadioButtonItemProps.unselectedIcon,
              onIconClicked: handleBusinessTypeClick('Incorporated'),
            },
            text: {
              ...defaultRadioButtonItemProps.text,
              value: t('application_form.business_type.business_type.corporation'),
            },
          },
          {
            ...defaultRadioButtonItemProps,
            state: businessType === 'Proprietorship' ? 'Selected' : 'Unselected',
            selectedIcon: {
              ...defaultRadioButtonItemProps.selectedIcon,
            },
            unselectedIcon: {
              ...defaultRadioButtonItemProps.unselectedIcon,
              onIconClicked: handleBusinessTypeClick('Proprietorship'),
            },
            text: {
              ...defaultRadioButtonItemProps.text,
              value: t('application_form.business_type.business_type.sole_proprietorship'),
            },
          },
        ],
      },
      sinField: {
        ...defaultProps.sinField,
        label: {
          ...defaultProps.sinField?.label,
          value: t('application_form.business_type.sin'),
        },
        textInput: {
          ...defaultProps.sinField.textInput,
          textValue: sin,
          onTextChanged: handleChangeSocialInsuranceNumber,
        },
      },
      dateOfBirthField: {
        ...defaultProps.dateOfBirthField,
        state: 'Error',
        errorMessage: {
          ...defaultTextFieldProps.errorMessage,
          value: formState?.dobError
        },
        label: {
          ...defaultProps.dateOfBirthField?.label,
          value: t('application_form.business_type.date_of_birth'),
        },
        textInput: {
          ...defaultProps.dateOfBirthField?.textInput,
          inputType: IS_SAFARI ? 'text' : 'date',
          max: getTodaysDateString(),
          textPlaceholder: t('application_form.asset_information.date_placeholder'),
          textValue: dob,
          onTextChanged: handleChangeDateOfBirth,
        },
      },
      bankruptcyRadioField: {
        ...defaultProps.bankruptcyRadioField,
        label: {
          ...defaultProps.bankruptcyRadioField.label,
          value: t('application_form.business_type.bankruptcy.label'),
        },
        radioButtonItems: [
          {
            ...defaultRadioButtonItemProps,
            state: bankruptcy === false ? 'Selected' : 'Unselected',
            selectedIcon: {
              ...defaultRadioButtonItemProps.selectedIcon,
            },
            unselectedIcon: {
              ...defaultRadioButtonItemProps.unselectedIcon,
              onIconClicked: handleBankruptcyClick(false),
            },
            text: {
              ...defaultRadioButtonItemProps.text,
              value: t('application_form.business_type.bankruptcy.no'),
            },
          },
          {
            ...defaultRadioButtonItemProps,
            state: bankruptcy === true ? 'Selected' : 'Unselected',
            selectedIcon: {
              ...defaultRadioButtonItemProps.selectedIcon,
            },
            unselectedIcon: {
              ...defaultRadioButtonItemProps.unselectedIcon,
              onIconClicked: handleBankruptcyClick(true),
            },
            text: {
              ...defaultRadioButtonItemProps.text,
              value: t('application_form.business_type.bankruptcy.yes'),
            },
          },
        ],
      },
      detailsTextArea: {
        ...defaultProps.detailsTextArea,
        label: {
          ...defaultProps.detailsTextArea?.label,
          value: t('application_form.business_type.bankruptcy.details_label'),
        },
        textInput: {
          ...defaultProps.detailsTextArea.textInput,
          textValue: bankruptcyDetails,
          onTextChanged: handleChangeBankruptcyDetails,
        },
      },
      nextButton: {
        ...defaultProps.nextButton,
        text: {
          ...defaultProps.nextButton.text,
          value: t('application_form.select_lease.next_button'),
        },
        onButtonClicked: handleClickNext,
        disabled: !isFormValid(),
      },
      disclaimerText: {
        ...defaultProps.disclaimerText,
        value: t('application_form.business_type.bankruptcy.disclaimer_text'),
      },
    };
    return (
        <View
        className={className}
          {...businessTypeBlockProps}
          showBusinessQuestions={showBusinessQuestions}
        />
    );
  };

  return Presenter;
};

export default withPresenter;
