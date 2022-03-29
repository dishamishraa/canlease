/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { GetQuoteBlockProps, defaultProps as defaultGetQuoteBlockProps } from './GetQuoteBlock';
import { ContextualMenuProps } from '../../molecules/ContextualMenu';
import { defaultProps as defaultMenuItemProps } from '../../atoms/ContextualMenuItem/ContextualMenuItem';
import { isEmptyString } from '../../../lib/utils';
import { defaultProps as defaultTextFieldProps, TextFieldStateType } from "../../molecules/TextField/TextField";
import { LeaseType } from '../../../modules/quote/types';
import { UserType } from '../../../modules/profile/types';
import { EquipmentLeaseInfo } from '../../../modules/types';

export type GetQuoteBlockPresenterProps = GetQuoteBlockProps & {
};

type FormState = {
  equipmentCostError: string;
}

const withPresenter = (
  View: React.FC<GetQuoteBlockProps>,
): React.FC<GetQuoteBlockPresenterProps> => {
  const Presenter: React.FC<GetQuoteBlockPresenterProps> = (props) => {
    const { t } = useTranslation();
    const {
      equipmentLeaseInfo,
      setEquipmentLeaseInfo,
      profile,
      rateCards,
    } = props;

    const [equipmentName, setEquipmentName] = useState<string>();
    const [equipmentCost, setEquipmentCost] = useState<string>();
    const [equipmentFees, setEquipmentFees] = useState<string>();
    const [equipmentLeaseType, setEquipmentLeaseType] = useState<LeaseType>('stretch');
    const [equipmentRatecard, setEquipmentRatecard] = useState<string>();
    const [userType, setUserType] = useState<UserType>();
    const [formState, setFormState] = useState<FormState>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [costError, setCostError] = useState<TextFieldStateType>('Default');

    let currFormState: FormState = {
      equipmentCostError: ""
    };

    useEffect(() => {
      if (profile) {
        const { userType } = profile;
        setUserType(userType);
      }
    }, [profile]);

    useEffect(() => {
      if (equipmentLeaseInfo) {
        setEquipmentName(equipmentLeaseInfo.name);
        setEquipmentCost(equipmentLeaseInfo.cost);
        setEquipmentLeaseType(equipmentLeaseInfo.leaseType);
      }
    }, [equipmentLeaseInfo]);

    const isFormValid = !isEmptyString(equipmentName) && !isEmptyString(equipmentCost) && !isLoading;
    const isRepFormValid = isFormValid
      && !isEmptyString(equipmentRatecard)
      && !isEmptyString(equipmentFees);

    const isEquipmentCostValid = (cost: number): boolean => {
      return cost >= 1000 && cost <= 499999;
    }

    const handleClickNext = async () => {
      if (equipmentName && equipmentCost && setEquipmentLeaseInfo) {
        if (!isEquipmentCostValid(parseFloat(equipmentCost))) {
          currFormState.equipmentCostError = parseFloat(equipmentCost) < 1000 ? t('get_quote_block.error_message_low') : t('get_quote_block.error_message_high');
          setFormState(currFormState);
          setCostError('Error');
        } else {
          setCostError('Default');
          let leaseInfo: EquipmentLeaseInfo = {
            name: equipmentName,
            cost: equipmentCost,
            leaseType: equipmentLeaseType,
          };
          if ((profile?.userType === 'rep' || profile?.userType === 'admin') && equipmentRatecard && equipmentFees) {
            leaseInfo = {
              ...leaseInfo,
              rateCardType: equipmentRatecard,
              fee: parseFloat(equipmentFees),
            };
          }
          setIsLoading(true);
          await setEquipmentLeaseInfo(leaseInfo);
          setIsLoading(false);
        }
      }

    };

    const handleChangeEquipmentName = ({ target: { value } }) => setEquipmentName(value);
    const handleChangeEquipmentCost = ({ target: { value } }) => setEquipmentCost(value);
    const handleChangeEquipmentFees = ({ target: { value } }) => setEquipmentFees(value);
    const handleChangeLeaseType = (leaseType: LeaseType) => () => setEquipmentLeaseType(leaseType);
    const handleChangeRatecard = (rateCard: string) => () => setEquipmentRatecard(rateCard);

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

    const ratecardContextualMenu: ContextualMenuProps = {
      contextualMenuItemList: {
        contextualMenuItems: rateCards?.map((rateCard, index) => {
          const { cardtype } = rateCard;
          return {
            onContextualMenuItemClicked: handleChangeRatecard(cardtype),
            text: {
              ...defaultMenuItemProps.text,
              value: cardtype,
            },
          };
        }),
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
        state: costError,
        errorMessage: {
          ...defaultTextFieldProps.errorMessage,
          value: formState?.equipmentCostError,
        },
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
            value: equipmentLeaseType === 'stretch'
              ? t('get_quote_block.lease_type.options.stretch')
              : t('get_quote_block.lease_type.options.ten'),
          },
        },
        contextualMenu,
        selectId: t('get_quote_block.lease_type.label'),
      },
      ratecardSelectField: {
        ...defaultGetQuoteBlockProps.ratecardSelectField,
        label: {
          ...defaultGetQuoteBlockProps.ratecardSelectField.label,
          value: t('get_quote_block.rate_card'),
        },
        select: {
          ...defaultGetQuoteBlockProps.ratecardSelectField.select,
          text: {
            ...defaultGetQuoteBlockProps.ratecardSelectField.select?.text,
            value: equipmentRatecard,
          },
        },
        contextualMenu: ratecardContextualMenu,
        selectId: t('get_quote_block.rate_card'),
      },
      feesTextField: {
        ...defaultGetQuoteBlockProps.feesTextField,
        label: {
          ...defaultGetQuoteBlockProps.feesTextField?.label,
          value: t('get_quote_block.fees'),
        },
        textInput: {
          inputType: 'number',
          textValue: equipmentFees,
          onTextChanged: handleChangeEquipmentFees,
        },
      },
      nextButton: {
        ...defaultGetQuoteBlockProps.nextButton,
        text: {
          value: t('get_quote_block.submit'),
        },
        onButtonClicked: handleClickNext,
        disabled: userType === 'rep' || userType === 'admin' ? !isRepFormValid : !isFormValid,
      },
    };

    return <View {...props} {...blockProps} />;
  };

  return Presenter;
};

export default withPresenter;
