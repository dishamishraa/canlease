import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { TextInputProps } from '../../atoms/TextInput';
import { GetQuoteBlockProps, defaultProps as defaultGetQuoteBlockProps  } from './GetQuoteBlock';
import { ContextualMenuProps } from '../../molecules/ContextualMenu';
import { ContextualMenuItemProps } from '../../atoms/ContextualMenuItem';
import { defaultProps as defaultMenuItemProps } from '../../atoms/ContextualMenuItem/ContextualMenuItem';
import { isEmptyString } from '../../../lib/utils';
import { EquipmentLeaseInfo } from '../../../lib/types';


export type GetQuoteBlockPresenterProps = {
  setEquipmentLeaseInfo?: React.Dispatch<React.SetStateAction<EquipmentLeaseInfo>>;
};

const withPresenter = (
  View: React.FC<GetQuoteBlockProps>,
): React.FC<GetQuoteBlockPresenterProps> => {
  const Presenter: React.FC<GetQuoteBlockPresenterProps> = (props) => {
    const { t } = useTranslation();
    const history = useHistory();
    const { setEquipmentLeaseInfo } = props;
    
    const [equipmentName, setEquipmentName] = useState<string>('');
    const [equipmentCost, setEquipmentCost] = useState<string>('');
    const [equipmentLeaseType, setEquipmentLeaseType] = useState<string>(t('get_quote_block.lease_type.options.stretch'));

    const isFormValid = !isEmptyString(equipmentName) && !isEmptyString(equipmentCost);

    const handleClickNext = () => {
      if(isFormValid && setEquipmentLeaseInfo){
        setEquipmentLeaseInfo({name: equipmentName, cost: equipmentCost, leastType: equipmentLeaseType});
        history.push('/contactInformation', {name: equipmentName, cost: equipmentCost, leastType: equipmentLeaseType});
      }
    };
    const handleChangeEquipmentName = ({ target: { value } }) => setEquipmentName(value);
    const handleChangeEquipmentCost = ({ target: { value } }) => setEquipmentCost(value);
    const handleStretchClick = () => setEquipmentLeaseType(t('get_quote_block.lease_type.options.stretch'));
    const handleTenClick = () => setEquipmentLeaseType(t('get_quote_block.lease_type.options.ten'));

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
