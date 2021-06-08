import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { APIResponse } from '../../../lib/api/types';
import { User } from '../../../modules/types';
import { TextInputProps } from '../../atoms/TextInput';
import { SimplePageProps } from '../../pages/SimplePage';
import { GetQuoteBlockProps, defaultProps as defaultGetQuoteBlockProps  } from './GetQuoteBlock';
import { ContextualMenuProps } from '../../molecules/ContextualMenu';
import ContextualMenuItem, { ContextualMenuItemProps } from '../../atoms/ContextualMenuItem';
import { defaultProps as defaultMenuItemProps } from '../../atoms/ContextualMenuItem/ContextualMenuItem';


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
    const history = useHistory();

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const target = queryParams.get('target') || '/';

    const [equipmentName, setEquipmentName] = useState<string>('');
    const [equipmentCost, setEquipmentCost] = useState<string>('');
    const [equipmentLeaseType, setEquipmentLeaseType] = useState<string>(t('get_quote_block.lease_type.options.stretch'));

    const isFormValid = Boolean(equipmentName && equipmentCost);
    const handleClickNext = () => {
      if(isFormValid){
        history.push({pathname: '/contactInformation'})
      }
    };

    const handleSubmit = async () => { 
    };


    const handleChangeEquipmentName: TextInputProps['onTextChanged'] = ({ target: { value } }) => setEquipmentName(value);
    const handleChangeEquipmentCost: TextInputProps['onTextChanged'] = ({ target: { value } }) => setEquipmentCost(value);
    const handleStretchClick: ContextualMenuItemProps['onContextualMenuItemClicked'] = () => setEquipmentLeaseType(t('get_quote_block.lease_type.options.stretch'));
    const handleTenClick: ContextualMenuItemProps['onContextualMenuItemClicked'] = () => setEquipmentLeaseType(t('get_quote_block.lease_type.options.ten'));

    const contextualMenu: ContextualMenuProps = {
      contextualMenuItemList: {
        contextualMenuItems: [
        {
          onContextualMenuItemClicked: handleStretchClick,
          text: {
            ...defaultMenuItemProps.text,
            value: t('get_quote_block.lease_type.options.stretch')
          }
        },
        {
          onContextualMenuItemClicked: handleTenClick,
          text: {
            ...defaultMenuItemProps.text,
            value: t('get_quote_block.lease_type.options.ten')
          },
        },
      ]}
    };

    const blockProps: GetQuoteBlockProps = {
      ...defaultGetQuoteBlockProps,
      ...props,
      blockHeading: {
        ...defaultGetQuoteBlockProps.blockHeading,
        value: t('get_quote_block.header'),
      },
      nameTextField:{
        ...defaultGetQuoteBlockProps.nameTextField,
        label: {
          ...defaultGetQuoteBlockProps.nameTextField?.label,
          value: t('get_quote_block.name.label'),
        },
        textInput: {
          textPlaceholder: t('get_quote_block.name.placeholder'),
          onTextChanged: handleChangeEquipmentName,
        },
      },
      costTextField: {
        ...defaultGetQuoteBlockProps.costTextField,
        label: {
          ...defaultGetQuoteBlockProps.costTextField?.label,
          value: t('get_quote_block.cost.label'),
        },
        textInput: {
          textPlaceholder: t('get_quote_block.cost.placeholder'),
          onTextChanged: handleChangeEquipmentCost,
        },
      },
      leaseTypeSelectField: {
        ...defaultGetQuoteBlockProps.leaseTypeSelectField,
        label: {
          ...defaultGetQuoteBlockProps.leaseTypeSelectField.label,
          value: t('get_quote_block.lease_type.label')
        },
        select: {
          ...defaultGetQuoteBlockProps.leaseTypeSelectField.select,
          text: {
            ...defaultGetQuoteBlockProps.leaseTypeSelectField.select?.text,
            value: equipmentLeaseType
          }
        },
        contextualMenu: contextualMenu,
        selectId: t('get_quote_block.lease_type.label'),
      },
      nextButton:{
        ...defaultGetQuoteBlockProps.nextButton,
        text: {
          value: t('get_quote_block.submit')
        },
        onButtonClicked: handleClickNext,
        disabled: !isFormValid,
      }
    };

    return (
      <View
        // loading={loading}
        // error={error}
        // header={defaultGetQuoteBlockProps.header} 
        {...blockProps}
      />
    );
  };

  return Presenter;
};

export default withPresenter;
