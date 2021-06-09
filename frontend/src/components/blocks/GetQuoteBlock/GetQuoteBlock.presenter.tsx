import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { TextInputProps } from '../../atoms/TextInput';
import { GetQuoteBlockProps, defaultProps as defaultGetQuoteBlockProps  } from './GetQuoteBlock';
import { ContextualMenuProps } from '../../molecules/ContextualMenu';
import { ContextualMenuItemProps } from '../../atoms/ContextualMenuItem';
import { defaultProps as defaultMenuItemProps } from '../../atoms/ContextualMenuItem/ContextualMenuItem';


export type GetQuoteBlockPresenterProps = {};

const withPresenter = (
  View: React.FC<GetQuoteBlockProps>,
): React.FC<GetQuoteBlockPresenterProps> => {
  const Presenter: React.FC<GetQuoteBlockPresenterProps> = (props) => {
    const { t } = useTranslation();
    const history = useHistory();

    const location = useLocation();
    const { search } = location;
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

    const handleChangeEquipmentName: TextInputProps['onTextChanged'] = ({ target: { value } }) => setEquipmentName(value);
    const handleChangeEquipmentCost: TextInputProps['onTextChanged'] = ({ target: { value } }) => setEquipmentCost(value);
    const handleStretchClick: ContextualMenuItemProps['onContextualMenuItemClicked'] = () => setEquipmentLeaseType(t('get_quote_block.lease_type.options.stretch'));
    const handleTenClick: ContextualMenuItemProps['onContextualMenuItemClicked'] = () => setEquipmentLeaseType(t('get_quote_block.lease_type.options.ten'));

    console.log({history, location});
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
          textValue: equipmentName,
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
          textValue: equipmentCost,
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
        {...blockProps}
      />
    );
  };

  return Presenter;
};

export default withPresenter;
