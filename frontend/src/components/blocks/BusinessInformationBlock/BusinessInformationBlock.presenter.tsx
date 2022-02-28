import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { defaultProps, BusinessInformationBlockProps } from './BusinessInformationBlock';
import { ContextualMenuItemProps, defaultProps as defaultMenuItemProps } from '../../atoms/ContextualMenuItem/ContextualMenuItem';
import { isEmptyString } from '../../../lib/utils';

export type BusinessInformationBlockPresenterProps = BusinessInformationBlockProps & {};

const withPresenter = (
  View: React.FC<BusinessInformationBlockProps>,
): React.FC<BusinessInformationBlockPresenterProps> => {
  const Presenter: React.FC<BusinessInformationBlockPresenterProps> = (props) => {
    const {
      businessInfo,
      handleCreateProfile,
      className,
    } = props;
    const { t } = useTranslation();
    const [fullLegalName, setFullLegalName] = useState<string>();
    const [operatingName, setOperatingName] = useState<string>();
    const [businessPhone, setBusinessPhone] = useState<string>();
    const [website, setWebsite] = useState<string>();

    useEffect(() => {
      if (businessInfo) {
        setFullLegalName(businessInfo.companyName);
        setOperatingName(businessInfo.operatingName);
        setBusinessPhone(businessInfo.businessPhone);
        setWebsite(businessInfo.website);
      }
    }, [businessInfo]);

    const formInvalid = isEmptyString(fullLegalName)
      || isEmptyString(operatingName)
      || isEmptyString(businessPhone);

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

    const handleNext = async () => {
      if (
        handleCreateProfile
        && operatingName
        && businessPhone
        && fullLegalName
      ) {
        await handleCreateProfile({
          operatingName,
          website: website || '',
          businessPhone,
          companyName: fullLegalName,
        });
      }
    };


    const businessInformationBlockProps: BusinessInformationBlockProps = {
      ...defaultProps,
      stepper: {
        ...defaultProps.stepper,
        text: {
          ...defaultProps.stepper.text,
          value: t('stepper', {
            current: '3',
            total: '3',
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
      nextButton: {
        ...defaultProps.nextButton,
        text: {
          ...defaultProps.nextButton.text,
          value: t('button_text.complete_setup'),
        },
        onButtonClicked: handleNext,
        disabled: formInvalid,
      },
    };
    return <View
      {...businessInformationBlockProps}
      className={className}
      />;
  };
  return Presenter;
};

export default withPresenter;
