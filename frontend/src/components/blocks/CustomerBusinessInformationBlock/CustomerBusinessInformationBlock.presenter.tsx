import React, { useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { getTodaysDateString, isEmptyString, isValidDate, isValidYear } from '../../../lib/utils';
import { Profile } from '../../../modules/profile/types';
import { defaultProps as defaultRadioButtonItemProps } from '../../atoms/RadioButtonItem/RadioButtonItem';
import {
  CustomerBusinessInformationBlockProps,
  defaultProps,
} from './CustomerBusinessInformationBlock';
import {
  ContextualMenuItemProps,
  defaultProps as defaultMenuItemProps,
} from '../../atoms/ContextualMenuItem/ContextualMenuItem';
import { defaultProps as defaultTextFieldProps } from '../../molecules/TextField/TextField';
import { IS_SAFARI } from '../../../lib/constants';

export type CustomerBusinessInformationBlockPresenterProps =
  CustomerBusinessInformationBlockProps & {
    profile: Profile | null;
  };

type FormState = {
  dobError: string;
  operatingSinceError: string;
}

const withPresenter = (
  View: React.FC<CustomerBusinessInformationBlockProps>,
): React.FC<CustomerBusinessInformationBlockPresenterProps> => {
  const Presenter: React.FC<CustomerBusinessInformationBlockPresenterProps> = (props) => {
    const {
      className,
      businessInfo,
      setBusinessInfo,
      stepperCurrentValue,
      stepperTotalValue,
    } = props;
    const { t } = useTranslation();

    const [fullLegalName, setFullLegalName] = useState<string>();
    const [operatingName, setOperatingName] = useState<string>();
    const [businessSector, setBusinessSector] = useState<string>();
    const [businessPhone, setBusinessPhone] = useState<string>();
    const [website, setWebsite] = useState<string>();
    const [operatingSince, setOperatingSince]= useState<string>();
    const [businessType, setBusinessType] = useState<'Proprietorship' | 'Incorporated'>();
    const [showBusinessQuestions, setShowBusinessQuestions] = useState<boolean>(false);
    const [sin, setSin] = useState<string>();
    const [dob, setDob] = useState<string>();
    const [bankruptcy, setBankruptcy] = useState<boolean>();
    const [bankruptcyDetails, setBankruptcyDetails] = useState<string>();
    const [formState, setFormState] = useState<FormState>();

    let currFormState: FormState = {
      dobError: '',
      operatingSinceError: ''
    }

    useEffect(() => {
      if (businessInfo) {
        setBusinessType(businessInfo.businessType);
        setSin(businessInfo.sin);
        setDob(businessInfo.dob);
        setBankruptcy(businessInfo.bankruptcy);
        setBankruptcyDetails(businessInfo.bankruptcyDetails);
        setOperatingSince((new Date().getFullYear() - businessInfo.yearsInBusiness).toString());

        if (businessInfo.type === 'vendor') {
          setFullLegalName(businessInfo.companyName);
          setOperatingName(businessInfo.operatingName);
          setBusinessSector(businessInfo.businessSector);
          setBusinessPhone(businessInfo.businessPhone);
          setWebsite(businessInfo.website);
        }

        if (businessInfo.businessType === 'Proprietorship') {
          setShowBusinessQuestions(true);
        }
      }
    }, [businessInfo]);

    const handleFullLegalName = ({ target: { value } }) => {
      setFullLegalName(value);
    };

    const handleOperatingName = ({ target: { value } }) => {
      setOperatingName(value);
    };

    const handleBusinessPhone = ({ target: { value } }) => {
      setBusinessPhone(value);
    };

    const handleWebsite = ({ target: { value } }) => {
      setWebsite(value);
    };

    const handleOperatingSince = ({ target: { value } }) => {
      setOperatingSince(value);
    }

    const handleClickNext = () => {
      let allFieldsAreValid = true;
      if (setBusinessInfo
            && businessType
            && fullLegalName
            && operatingName
            && businessSector
            && businessPhone
            && operatingSince
      ) {

        if (!isValidYear(operatingSince)) {
          allFieldsAreValid = false;
          currFormState.operatingSinceError = t('error_message.invalid_years');
          setFormState(currFormState);
        }

        if (dob) {
          if (!isValidDate(dob, 'past')) {
            allFieldsAreValid = false;
            currFormState.dobError  = t('error_message.invalid_date');
            setFormState(currFormState);
          }
        }

        if (allFieldsAreValid) {
          setBusinessInfo({
            type: 'vendor',
            businessType,
            sin: sin || '',
            dob: dob || '',
            bankruptcy: bankruptcy || false,
            bankruptcyDetails: bankruptcyDetails || '',
            companyName: fullLegalName,
            operatingName,
            businessSector,
            yearsInBusiness: new Date().getFullYear() - parseInt(operatingSince),
            businessPhone,
            website: website || '',
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
      if ((option === 'Proprietorship')) {
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
      return !isEmptyString(operatingSince) && (businessType === 'Incorporated'
      || (!isEmptyString(businessType) && !isEmptyString(sin) && !isEmptyString(dob) 
      && (bankruptcy === false || !isEmptyString(bankruptcyDetails))));
    };

    const contextualMenuItems: ContextualMenuItemProps[] = [];
    for (let i = 0; i < 7; i += 1) {
      contextualMenuItems.push({
        text: {
          ...defaultMenuItemProps.text,
          value: t(`business_information.business_sector_options.${i}`),
        },
        onContextualMenuItemClicked: () => setBusinessSector(t(`business_information.business_sector_options.${i}`)),
      });
    }

    const businessTypeBlockProps: CustomerBusinessInformationBlockProps = {
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
        value: t('business_information.header'),
      },
      fullLegalNameTextField: {
        ...defaultProps.fullLegalNameTextField,
        label: {
          ...defaultProps.fullLegalNameTextField.label,
          value: t('text_field_label.full_legal_name'),
        },
        textInput: {
          textValue: fullLegalName,
          onTextChanged: handleFullLegalName,
        },
      },
      operatingNameTextField: {
        ...defaultProps.operatingNameTextField,
        label: {
          ...defaultProps.operatingNameTextField.label,
          value: t('text_field_label.operating_name'),
        },
        textInput: {
          textValue: operatingName,
          onTextChanged: handleOperatingName,
        },
      },
      businessSectorSelectField: {
        ...defaultProps.businessSectorSelectField,
        label: {
          ...defaultProps.businessSectorSelectField.label,
          value: t('text_field_label.business_sector'),
        },
        select: {
          ...defaultProps.businessSectorSelectField.select,
          text: {
            ...defaultProps.businessSectorSelectField.select?.text,
            value: businessSector,
          },
        },
        contextualMenu: {
          contextualMenuItemList: {
            contextualMenuItems,
          },
        },
        selectId: t('text_field_label.business_sector'),
      },
      businessPhoneField: {
        ...defaultProps.businessPhoneField,
        label: {
          ...defaultProps.businessPhoneField.label,
          value: t('text_field_label.business_phone'),
        },
        textInput: {
          textValue: businessPhone,
          onTextChanged: handleBusinessPhone,
        },
      },
      websiteLinkTextField: {
        ...defaultProps.websiteLinkTextField,
        label: {
          ...defaultProps.websiteLinkTextField.label,
          value: t('text_field_label.website_link'),
        },
        textInput: {
          textValue: website,
          onTextChanged: handleWebsite,
        },
      },
      operatingSinceTextField: {
        ...defaultProps.operatingSinceTextField,
        state: 'Error',
        errorMessage: {
          ...defaultTextFieldProps.errorMessage,
          value: formState?.operatingSinceError
        },
        label: {
          ...defaultProps.operatingSinceTextField.label,
          value: t('text_field_label.operating_since')
        },
        textInput: {
          ...defaultProps.operatingSinceTextField.textInput,
          textValue: operatingSince,
          onTextChanged: handleOperatingSince
        }
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
          value: formState?.dobError,
        },
        label: {
          ...defaultProps.dateOfBirthField?.label,
          value: t('application_form.business_type.date_of_birth'),
        },
        textInput: {
          ...defaultProps.dateOfBirthField?.textInput,
          textPlaceholder: t('application_form.asset_information.date_placeholder'),
          inputType: IS_SAFARI ? 'text' : 'date',
          max: getTodaysDateString(),
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
