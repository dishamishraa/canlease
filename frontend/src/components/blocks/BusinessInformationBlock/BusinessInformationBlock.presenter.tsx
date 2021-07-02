import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation, useParams } from 'react-router';
import { defaultProps, BusinessInformationBlockProps } from './BusinessInformationBlock';
import { APIResponse } from '../../../lib/api/types';
import { defaultProps as defaultTextFieldProps, TextFieldStateType } from '../../molecules/TextField/TextField';
import { AuthPageLocationState, BusinessInformation } from '../../pages/AuthPage/AuthPage';
import { defaultProps as defaultMenuItemProps } from '../../atoms/ContextualMenuItem/ContextualMenuItem';
import { ContextualMenuProps } from '../../molecules/ContextualMenu/ContextualMenu';
import { CreateProfilePayload } from '../../../modules/types';

export type BusinessInformationBlockPresenterProps = BusinessInformationBlockProps & {
  setBusinessInfo?: React.Dispatch<React.SetStateAction<BusinessInformation>>;
  handleCompleteSetup?: () => void;
};

const withPresenter = (
  View: React.FC<BusinessInformationBlockProps>,
): React.FC<BusinessInformationBlockPresenterProps> => {
  const Presenter: React.FC<BusinessInformationBlockPresenterProps> = (props) => {
    const {
      setBusinessInfo,
      handleCompleteSetup
    } = props
    const { t } = useTranslation();
    const history = useHistory();
    const { state } = useLocation<AuthPageLocationState>()
    const [fullLegalName, setFullLegalName] = useState<string>('');
    const [operatingName, setOperatingName] = useState<string>('');
    const [operatingSince, setOperatingSince] = useState<string>('');
    const [businessSector, setBusinessSector] = useState<string>('');
    const [businessPhone, setBusinessPhone] = useState<string>('');
    const [website, setWebsite] = useState<string>('');

    const handleFullLegalName = ({ target: { value } }) => {
      setFullLegalName(value);
    };

    const handleoperatingName = ({ target: { value } }) => {
      setOperatingName(value);
    };

    const handleOperatingSince = ({ target: { value } }) => {
      setOperatingSince(value);
    };

    const handleBusinessPhone = ({ target: { value } }) => {
      setBusinessPhone(value);
    };

    const handleWebsite = ({ target: { value } }) => {
      setWebsite(value);
    };

    const handleNext = () => {      
      if(handleCompleteSetup && setBusinessInfo){
        setBusinessInfo({
          operatingName: operatingName,
          operatingSinceDate: operatingSince,
          businessSector: businessSector,
          website: website,
          businessPhone: businessPhone,
          companyName: fullLegalName,
        });
        handleCompleteSetup();
      }
    }

    const handleSelectOption0 = () => setBusinessSector(t('business_information.business_sector_options.0'));
    const handleSelectOption1 = () => setBusinessSector(t('business_information.business_sector_options.1'));
    const handleSelectOption2 = () => setBusinessSector(t('business_information.business_sector_options.2'));
    const handleSelectOption3 = () => setBusinessSector(t('business_information.business_sector_options.3'));
    const handleSelectOption4 = () => setBusinessSector(t('business_information.business_sector_options.4'));
    const handleSelectOption5 = () => setBusinessSector(t('business_information.business_sector_options.5'));
    const handleSelectOption6 = () => setBusinessSector(t('business_information.business_sector_options.6'));

    const contextualMenu: ContextualMenuProps = {
      contextualMenuItemList: {
        contextualMenuItems: [
          {
            text: {
              ...defaultMenuItemProps.text,
              value: t('business_information.business_sector_options.0'),
            },
            onContextualMenuItemClicked: handleSelectOption0
          },
          {
            text: {
              ...defaultMenuItemProps.text,
              value: t('business_information.business_sector_options.1'),
            },
            onContextualMenuItemClicked: handleSelectOption1
          },
          {
            text: {
              ...defaultMenuItemProps.text,
              value: t('business_information.business_sector_options.2'),
            },
            onContextualMenuItemClicked: handleSelectOption2
          },
          {
            text: {
              ...defaultMenuItemProps.text,
              value: t('business_information.business_sector_options.3'),
            },
            onContextualMenuItemClicked: handleSelectOption3
          },
          {
            text: {
              ...defaultMenuItemProps.text,
              value: t('business_information.business_sector_options.4'),
            },
            onContextualMenuItemClicked: handleSelectOption4
          },
          {
            text: {
              ...defaultMenuItemProps.text,
              value: t('business_information.business_sector_options.5'),
            },
            onContextualMenuItemClicked: handleSelectOption5
          },
          {
            text: {
              ...defaultMenuItemProps.text,
              value: t('business_information.business_sector_options.6'),
            },
            onContextualMenuItemClicked: handleSelectOption6
          },
        ],
      },
    };

    const businessInformationBlockProps: BusinessInformationBlockProps = {
      ...defaultProps,
      stepper: {
        ...defaultProps.stepper,
        text: {
          ...defaultProps.stepper.text,
          value: t('stepper', {
            current: '3',
            total: '3'
          })
        }
      },
      blockHeading: {
        ...defaultProps.blockHeading,
        value: t('business_information.header')
      },
      fullLegalNameTextField: {
        ...defaultProps.fullLegalNameTextField,
        label: {
          ...defaultProps.fullLegalNameTextField.label,
          value: t('text_field_label.full_legal_name'),
        },
        textInput: {
          textValue: fullLegalName,
          onTextChanged: handleFullLegalName
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
          onTextChanged: handleoperatingName
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
        contextualMenu,
        selectId: t('text_field_label.business_sector'),
      },
      operatingSinceTextField: {
        ...defaultProps.operatingSinceTextField,
        label: {
          ...defaultProps.operatingSinceTextField.label,
          value: t('text_field_label.operating_since'),
        },
        textInput: {
          ...defaultProps.operatingSinceTextField.textInput,
          textValue: operatingSince,
          onTextChanged: handleOperatingSince,
          textPlaceholder: t('business_information.operating_since_placeholder')
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
          onTextChanged: handleBusinessPhone
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
          onTextChanged: handleWebsite
        },
      },
      nextButton: {
        ...defaultProps.nextButton,
        text: {
          ...defaultProps.nextButton.text,
          value: t('button_text.complete_setup')
        },
        onButtonClicked: handleNext
      }
    }
    return <View
          {...businessInformationBlockProps}
          />;
  };
  return Presenter;
};

export default withPresenter;
