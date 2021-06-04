import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { APIResponse } from '../../../lib/api/types';
import { User } from '../../../modules/types';
import { SelectItem } from '../../atoms/Select/Select';
import { TextInputProps } from '../../atoms/TextInput';
import { SimplePageProps } from '../../pages/SimplePage';
import { GetQuoteBlockProps, defaultProps } from './GetQuoteBlock';
import { ContextualMenuProps } from '../../molecules/ContextualMenu';

export type GetQuoteBlockPropsPresenterProps = {
//   error?: Error;
//   loading: boolean;
//   user: User | null;
//   refetchUser: (() => void) | null;
//   submitSignUpSurvey: (payload: SignUpSurveyPayload) => Promise<APIResponse<boolean>>;
//   recordRegistrationEvent: () => void;
};

const withPresenter = (
  View: React.FC<GetQuoteBlockProps>,
): React.FC<GetQuoteBlockPropsPresenterProps> => {
  const Presenter: React.FC<GetQuoteBlockPropsPresenterProps> = (
    props
    // {
    // loading,
    // error,
    // user,
    // refetchUser,
    // submitSignUpSurvey,
    // recordRegistrationEvent
  // }
  ) => {
    const { t } = useTranslation();
    // const history = useHistory();

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const target = queryParams.get('target') || '/';

    const [equipmentName, setEquipmentName] = useState<string>('');
    const [equipmentCost, setEquipmentCost] = useState<string>('');
    const [equipmentLeaseType, setEquipmentLeaseType] = useState<string>('');


    const handleClickNextStep = () => {
    };

    const handleSubmit = async () => { 
    };

    const handleChangeEquipmentName: TextInputProps['onTextChanged'] = ({ target: { value } }) => setEquipmentName(value);
    const handleChangeEquipmentCost: TextInputProps['onTextChanged'] = ({ target: { value } }) => setEquipmentCost(value);
    
    const handleStretchClick: TextInputProps['onTextChanged'] = () => setEquipmentLeaseType("10");


    const contextualMenu: ContextualMenuProps = {
      contextualMenuItemList: {
        contextualMenuItems: [
        {
          optionValue: {
            style: 'Basic100',
            align: 'Left',
            size: 'Medium',
            type: 'Paragraph2',
            value: t('get_quote_block.lease_type.options.stretch'),
          },
          // onContextualMenuItemClicked: handleStretchClick,
        },
        {
          optionValue: {
            style: 'Basic100',
            align: 'Left',
            size: 'Medium',
            type: 'Paragraph2',
            value: t('get_quote_block.lease_type.options.ten'),
          },
          // onContextualMenuItemClicked: handleStretchClick,
        },
      ]}
    };

    const blockProps: GetQuoteBlockProps = {
      ...defaultProps,
      ...props,
      blockHeading: {
        ...defaultProps.blockHeading,
        value: t('get_quote_block.header'),
      },
      nameTextField:{
        ...defaultProps.nameTextField,
        label: {
          ...defaultProps.nameTextField?.label,
          value: t('get_quote_block.name.label'),
        },
        textInput: {
          textPlaceholder: t('get_quote_block.name.placeholder'),
          onTextChanged: handleChangeEquipmentName,
        },
      },
      costTextField: {
        ...defaultProps.costTextField,
        label: {
          ...defaultProps.costTextField?.label,
          value: t('get_quote_block.cost.label'),
        },
        textInput: {
          textPlaceholder: t('get_quote_block.cost.placeholder'),
          onTextChanged: handleChangeEquipmentCost,
        },
      },
      leaseTypeSelectField: {
        ...defaultProps.leaseTypeSelectField,
        label: {
          ...defaultProps.leaseTypeSelectField.label,
          value: t('get_quote_block.lease_type.label')
        },
        select: {
          ...defaultProps.leaseTypeSelectField.select,
        },
        contextualMenu: contextualMenu,
      },
      nextButton:{
        ...defaultProps.nextButton,
      }
    };

    return (
      <View
        // loading={loading}
        // error={error}
        // header={defaultProps.header} 
        {...blockProps}
      />
    );
  };

  return Presenter;
};

export default withPresenter;
