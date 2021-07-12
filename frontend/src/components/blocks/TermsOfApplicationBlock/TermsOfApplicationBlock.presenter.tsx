import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TermsOfApplicationBlockProps, defaultProps } from './TermsOfApplicationBlock';

import { CheckboxItemProps, defaultProps as defaultCheckboxItemProps } from '../../atoms/CheckboxItem/CheckboxItem';
export type TermsOfApplicationBlockPresenterProps = TermsOfApplicationBlockProps & {
    setCreditCheckConsent?: React.Dispatch<React.SetStateAction<boolean>>;
    stepperCurrentValue?: number,
    setStepperCurrentValue?: React.Dispatch<React.SetStateAction<number>>;
    stepperTotalValue?: number,
};

const withPresenter = (
    View: React.FC<TermsOfApplicationBlockProps>,
  ): React.FC<TermsOfApplicationBlockPresenterProps> => {
    const Presenter: React.FC<TermsOfApplicationBlockPresenterProps> = (props) => {
    const {
      className,
      setCreditCheckConsent,
      stepperCurrentValue,
      setStepperCurrentValue,
      stepperTotalValue,
    } = props;

    const { t } = useTranslation();
    const [isSelected, setIsSelected] = useState<boolean>(false);
    
    const isFormValid = () => {
        if (isSelected) {
            return true;
        }
        return false;
    }

    const handleClickNext = () => {
        if (isFormValid() && setCreditCheckConsent) {
            setCreditCheckConsent(true);
        }
    };
    const termsOfApplicationBlockProps : TermsOfApplicationBlockProps = {
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
            value: t('application_form.terms_of_application.header'),
        },
        terms: {
            ...defaultProps.terms,
            text: {
             ...defaultProps.terms.text, 
             value: t('application_form.terms_of_application.terms'),
            }  
        },
        checkboxItem:{
            ...defaultProps.checkboxItem,
            state: isSelected? "Selected" : "Unselected",
            checkedIcon: {
                ...defaultCheckboxItemProps.checkedIcon,
                onIconClicked: () => setIsSelected(false),
            },
            uncheckedIcon: {
                ...defaultCheckboxItemProps.uncheckedIcon,
                onIconClicked: () => setIsSelected(true),
              },
            text: {
                ...defaultCheckboxItemProps.text,
                value: t('application_form.terms_of_application.checkbox_label'),
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
    }
    return (
        <View
        className={className}
        {...termsOfApplicationBlockProps}
        />
      );
  };
  
    return Presenter;
  };
  
  export default withPresenter;