import React, { useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { BusinessTypeBlockProps, defaultProps } from './BusinessTypeBlock';
import { defaultProps as defaultRadioButtonItemProps } from '../../atoms/RadioButtonItem/RadioButtonItem';
import { isEmptyString } from '../../../lib/utils';
import { Profile } from '../../../modules/profile/types';
import { BusinessType } from '../../../modules/types';

export type BusinessTypeBlockPresenterProps = BusinessTypeBlockProps & {
    setBusinessTypeInfo?: React.Dispatch<React.SetStateAction<BusinessType>>;
    businessTypeInfomation?: BusinessType;
    profile: Profile | null;
    stepperCurrentValue?: number,
    setStepperCurrentValue?: React.Dispatch<React.SetStateAction<number>>;
    stepperTotalValue?: number,
};

const withPresenter = (
  View: React.FC<BusinessTypeBlockProps>,
): React.FC<BusinessTypeBlockPresenterProps> => {
  const Presenter: React.FC<BusinessTypeBlockPresenterProps> = (props) => {
    const {
        setBusinessTypeInfo,
        className,
        businessTypeInfomation,
        profile,
        stepperCurrentValue,
        setStepperCurrentValue,
        stepperTotalValue,
    } = props;

    const [showAdditionalFormFields, setShowAdditionalFormFields] = useState(false);
    
    const history = useHistory();
    const { t } = useTranslation();

    const checkShowConditionalQuestions = () => {
        if (profile){
            const date = new Date(profile.operatingSinceDate); 
            const diffTime = Date.now() - date.getTime();
            const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365); 
            if (diffYears < 3) {
                return true;
            }
            return false;
        }
        return false;
    }

    const handleClickNext = () => {
        if(isFormValid() && setStepperCurrentValue && stepperCurrentValue){
            setStepperCurrentValue(stepperCurrentValue + 1);
            history.push('/portal/application/reviewApplicationInfo')
        }
    }

    const handleChangeSocialInsuranceNumber = ({ target: { value }}) => {
        if (setBusinessTypeInfo){
            setBusinessTypeInfo(businessTypeInfomation => ({...businessTypeInfomation, sin: value}))
        }
    }

    const handleChangeDateOfBirth = ({ target: { value }}) => {
        if (setBusinessTypeInfo){
            setBusinessTypeInfo(businessTypeInfomation => ({...businessTypeInfomation, dob: value}))
        }
    };

    const handleChangeDetails = ({ target: { value }}) => {
        if (setBusinessTypeInfo){
            setBusinessTypeInfo(businessTypeInfomation => ({...businessTypeInfomation, bankruptcyDetails: value}))
        }
    };
    const handleBusinessTypeClick = (option) => (event: any) => {
        if ((checkShowConditionalQuestions() || option === "Proprietorship") && setBusinessTypeInfo){
            setBusinessTypeInfo(businessTypeInfomation => ({...businessTypeInfomation, businessType: option}))
            setShowAdditionalFormFields(true);
        } else{
            if (setBusinessTypeInfo){
                setBusinessTypeInfo(businessTypeInfomation => 
                    ({...businessTypeInfomation, bankruptcy: "", bankruptcyDetails: "", sin: "", dob: "", businessType: option}))
            }
            setShowAdditionalFormFields(false);
        }
    }
    const handleBankruptcyClick = (option) => (event: any) => {
        if (setBusinessTypeInfo){
            setBusinessTypeInfo(businessTypeInfomation => ({...businessTypeInfomation, bankruptcy: option}))
        }
    }

    useEffect(() => {
        if (businessTypeInfomation) {
            const { businessType } = businessTypeInfomation;
            if (businessType === 'Proprietorship' || checkShowConditionalQuestions()) {
                setShowAdditionalFormFields(true);
            } else {
                setShowAdditionalFormFields(false);
            }
        }
    }, [checkShowConditionalQuestions()])

    let handleBusinessTypeState;
    let handleBankruptcyState;
    let getBankruptcyDetails;
    let getSocialInsuranceNumber;
    let getDateOfBirth;
    let isFormValid;

    if (businessTypeInfomation) {
        const { businessType, bankruptcy, bankruptcyDetails, sin: socialInsuranceNumber, dob: dateOfBirth } = businessTypeInfomation
        isFormValid = () => {
            if (!checkShowConditionalQuestions() && businessType === "Incorporated"){
                return true;
            }
            else if (!isEmptyString(businessType) && !isEmptyString(socialInsuranceNumber) && !isEmptyString(dateOfBirth) && !isEmptyString(bankruptcy)){
                if(bankruptcy === 'No' || !isEmptyString(bankruptcyDetails)){
                    return true
                }
                return false;
            }
            return false;
        }

        handleBusinessTypeState = (type) => {
            if (businessType === type) {
             return 'Selected';
            }
            return 'Unselected';
        }
        handleBankruptcyState = (type) => {
            if (bankruptcy === type) {
             return 'Selected';
            }
            return 'Unselected';
        }
        getBankruptcyDetails = () => {
            return bankruptcyDetails ? bankruptcyDetails : "";
        }
        getSocialInsuranceNumber = () => {
            return socialInsuranceNumber ? socialInsuranceNumber : "";
        }
        getDateOfBirth = () => {
            return dateOfBirth ? dateOfBirth : "";
        }

    }
   
    const businessTypeBlockProps: BusinessTypeBlockProps = {
        ...defaultProps,
        stepper: {
            text: {
                ...defaultProps.stepper.text,
                value: t(`application_form.stepper`, {
                    current: stepperCurrentValue,
                    total: stepperTotalValue,
                  })
            }
        },
        blockHeading: {
            ...defaultProps.blockHeading,
            value: t(`application_form.business_type.heading_text`)
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
                      state: handleBusinessTypeState('Incorporated'),
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
                    state: handleBusinessTypeState('Proprietorship'),
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
            }
              ]
        },
        sinField: {
            ...defaultProps.sinField,
            label: {
                ...defaultProps.sinField?.label,
                value: t('application_form.business_type.sin'),
            },
            textInput: {
                ...defaultProps.sinField.textInput,
                textValue: getSocialInsuranceNumber(),
                onTextChanged: handleChangeSocialInsuranceNumber,
            },
        },
        dateOfBirthField: {
            ...defaultProps.dateOfBirthField,
            label: {
                ...defaultProps.dateOfBirthField?.label,
                value: t('application_form.business_type.date_of_birth'),
            },
            textInput: {
                ...defaultProps.dateOfBirthField?.textInput,
                textPlaceholder: t('application_form.asset_information.date_placeholder'),
                textValue: getDateOfBirth(),
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
                      state: handleBankruptcyState('No'),
                      selectedIcon: {
                          ...defaultRadioButtonItemProps.selectedIcon,
                      },
                      unselectedIcon: {
                        ...defaultRadioButtonItemProps.unselectedIcon,
                        onIconClicked: handleBankruptcyClick('No'),
                    },
                      text: {
                          ...defaultRadioButtonItemProps.text,
                          value: t('application_form.business_type.bankruptcy.no'),
                      },
              },
              {
                ...defaultRadioButtonItemProps,
                    state: handleBankruptcyState('Yes'),
                    selectedIcon: {
                        ...defaultRadioButtonItemProps.selectedIcon,
                    },
                    unselectedIcon: {
                      ...defaultRadioButtonItemProps.unselectedIcon,
                      onIconClicked: handleBankruptcyClick('Yes'),
                  },
                    text: {
                        ...defaultRadioButtonItemProps.text,
                        value: t('application_form.business_type.bankruptcy.yes'),
                    },
            }
              ]
        },
        detailsTextArea: {
            ...defaultProps.detailsTextArea,
            label: {
                ...defaultProps.detailsTextArea?.label,
                value: t('application_form.business_type.bankruptcy.details_label'),
            },
            textInput: {
                ...defaultProps.detailsTextArea.textInput,
                textValue: getBankruptcyDetails(),
                onTextChanged: handleChangeDetails,
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
            value: t(`application_form.business_type.bankruptcy.disclaimer_text`)
        }
    }
    return (
        <View
        className={className}
          {...businessTypeBlockProps}
          showAdditionalFormFields={showAdditionalFormFields}
        />
      );
    };
  
    return Presenter;
};
  
export default withPresenter;