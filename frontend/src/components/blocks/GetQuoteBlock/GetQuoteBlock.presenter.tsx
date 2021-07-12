import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GetQuoteBlockProps, defaultProps as defaultGetQuoteBlockProps } from './GetQuoteBlock';
import { ContextualMenuProps } from '../../molecules/ContextualMenu';
import { defaultProps as defaultMenuItemProps } from '../../atoms/ContextualMenuItem/ContextualMenuItem';
import { isEmptyString } from '../../../lib/utils';
import { useEffect } from 'react';
import { LeaseType } from '../../../modules/quote/types';

export type GetQuoteBlockPresenterProps = GetQuoteBlockProps & {
};

const withPresenter = (
  View: React.FC<GetQuoteBlockProps>,
): React.FC<GetQuoteBlockPresenterProps> => {
  const Presenter: React.FC<GetQuoteBlockPresenterProps> = (props) => {
    const { t } = useTranslation();
    const { 
      equipmentLeaseInfo,
      setEquipmentLeaseInfo,
    } = props;

    const [equipmentName, setEquipmentName] = useState<string>();
    const [equipmentCost, setEquipmentCost] = useState<string>();
    const [equipmentLeaseType, setEquipmentLeaseType] = useState<LeaseType>('stretch');

    useEffect(() => {
      if(equipmentLeaseInfo) {
        setEquipmentName(equipmentLeaseInfo.name);
        setEquipmentCost(equipmentLeaseInfo.cost);
        setEquipmentLeaseType(equipmentLeaseInfo.leaseType);
      }
    }, [equipmentLeaseInfo]);

    const isFormValid = !isEmptyString(equipmentName) && !isEmptyString(equipmentCost);

    const handleClickNext = () => {
      if (equipmentName && equipmentCost && setEquipmentLeaseInfo) {
        const leaseInfo = {
          name: equipmentName,
          cost: equipmentCost,
          leaseType: equipmentLeaseType,
        };
        setEquipmentLeaseInfo(leaseInfo);
      }
    };
    const handleChangeEquipmentName = ({ target: { value } }) => setEquipmentName(value);
    const handleChangeEquipmentCost = ({ target: { value } }) => setEquipmentCost(value);
    const handleChangeLeaseType = (leaseType: LeaseType) => () =>  setEquipmentLeaseType(leaseType);

    const contextualMenu: ContextualMenuProps = {
      contextualMenuItemList: {
        contextualMenuItems: [
          {
            onContextualMenuItemClicked: handleChangeLeaseType('stretch'),
            text: {
              ...defaultMenuItemProps.text,
              value: t('get_quote_block.lease_type.options.stretch'),
            },
          },
          {
            onContextualMenuItemClicked: handleChangeLeaseType('$10'),
            text: {
              ...defaultMenuItemProps.text,
              value: t('get_quote_block.lease_type.options.ten'),
            },
          },
        ],
      },
    };

    const blockProps: GetQuoteBlockProps = {
      ...defaultGetQuoteBlockProps,
      ...props,
      blockHeading: {
        ...defaultGetQuoteBlockProps.blockHeading,
        value: t('get_quote_block.header'),
      },
      nameTextField: {
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
          inputType: 'number',
          textPlaceholder: t('get_quote_block.cost.placeholder'),
          textValue: equipmentCost,
          onTextChanged: handleChangeEquipmentCost,
        },
      },
      leaseTypeSelectField: {
        ...defaultGetQuoteBlockProps.leaseTypeSelectField,
        label: {
          ...defaultGetQuoteBlockProps.leaseTypeSelectField.label,
          value: t('get_quote_block.lease_type.label'),
        },
        select: {
          ...defaultGetQuoteBlockProps.leaseTypeSelectField.select,
          text: {
            ...defaultGetQuoteBlockProps.leaseTypeSelectField.select?.text,
            value: equipmentLeaseType === 'stretch' ? 
              t('get_quote_block.lease_type.options.stretch') :
              t('get_quote_block.lease_type.options.ten'),
          },
        },
        contextualMenu,
        selectId: t('get_quote_block.lease_type.label'),
      },
      nextButton: {
        ...defaultGetQuoteBlockProps.nextButton,
        text: {
          value: t('get_quote_block.submit'),
        },
        onButtonClicked: handleClickNext,
        disabled: !isFormValid,
      },
    };

    return (
      <View
        {...props}
        {...blockProps}
      />
    );
  };

  return Presenter;
};

export default withPresenter;
