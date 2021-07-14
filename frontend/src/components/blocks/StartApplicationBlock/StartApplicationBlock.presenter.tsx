import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { StartApplicationBlockProps, defaultProps } from './StartApplicationBlock';
import { ContextualMenuProps } from '../../molecules/ContextualMenu';
import { defaultProps as defaultMenuItemProps } from '../../atoms/ContextualMenuItem/ContextualMenuItem';
import { isEmptyString } from '../../../lib/utils';
import { EquipmentLeaseInfo } from '../../../modules/types';
import { LeaseType } from '../../../modules/quote/types';

export type StartApplicationBlockPresenterProps = StartApplicationBlockProps & {
    stepperCurrentValue?: number,
    setStepperCurrentValue?: React.Dispatch<React.SetStateAction<number>>;
    stepperTotalValue?: number,
    setStepperTotalValue?: React.Dispatch<React.SetStateAction<number>>;
    equipInfo?: EquipmentLeaseInfo;
    setEquipInfo?: React.Dispatch<React.SetStateAction<EquipmentLeaseInfo>>;
    handleCreateQuote?: () => void;
};

const withPresenter = (
  View: React.FC<StartApplicationBlockProps>,
): React.FC<StartApplicationBlockPresenterProps> => {
  const Presenter: React.FC<StartApplicationBlockPresenterProps> = (props) => {
    const { t } = useTranslation();
    const {
        stepperCurrentValue,
        setStepperCurrentValue,
        stepperTotalValue,
        setStepperTotalValue,
        equipInfo,
        setEquipInfo,
        handleCreateQuote
    } = props
    const history = useHistory();
    const [equipmentName, setEquipmentName] = useState<string>('');
    const [equipmentCost, setEquipmentCost] = useState<string>('');
    const [equipmentLeaseType, setEquipmentLeaseType] = useState<LeaseType>(t('application_form.start_application.lease_type.options.stretch'));

    const handleChangeEquipmentName = ({ target: { value } }) => setEquipmentName(value);
    const handleChangeEquipmentCost = ({ target: { value } }) => setEquipmentCost(value);
    const handleStretchClick = () => setEquipmentLeaseType(t('application_form.start_application.lease_type.options.stretch'));
    const handleTenClick = () => setEquipmentLeaseType(t('application_form.start_application.lease_type.options.ten'));
    const formInvalid = (isEmptyString(equipmentName) || isEmptyString(equipmentCost))

    useEffect(() => {
        if(setStepperTotalValue && setStepperCurrentValue){
            setStepperCurrentValue(1);
            setStepperTotalValue(7);
        }
    },[setStepperCurrentValue, setStepperTotalValue])

    const handleClickNext = async () => {
        if(!formInvalid && stepperCurrentValue && setStepperCurrentValue && setEquipInfo && handleCreateQuote){
            setEquipInfo({
                name: equipmentName,
                cost: equipmentCost,
                leaseType: equipmentLeaseType
            });
            setStepperCurrentValue(stepperCurrentValue + 1);
            handleCreateQuote();
        }
    }

    const contextualMenu: ContextualMenuProps = {
        contextualMenuItemList: {
          contextualMenuItems: [
            {
              onContextualMenuItemClicked: handleStretchClick,
              text: {
                ...defaultMenuItemProps.text,
                value: t('application_form.start_application.lease_type.options.stretch'),
              },
            },
            {
              onContextualMenuItemClicked: handleTenClick,
              text: {
                ...defaultMenuItemProps.text,
                value: t('application_form.start_application.lease_type.options.ten'),
              },
            },
          ],
        },
      };


    let startApplicationBlockProps: StartApplicationBlockProps = {
        ...defaultProps,
        stepper: {
            ...defaultProps.stepper,
            text: {
                ...defaultProps.stepper.text,
                value: t(`stepper`, {
                    current: stepperCurrentValue,
                    total: stepperTotalValue,
                  })
            }
        },
        blockHeading: {
            ...defaultProps.blockHeading,
            value: t('application_form.start_application.heading_text')
        },
        nameTextField: {
            ...defaultProps.nameTextField,
            label: {
                ...defaultProps.nameTextField.label,
                value: t('application_form.start_application.equip_name.label')
            },
            textInput: {
                textPlaceholder: t('application_form.start_application.equip_name.placeholder'),
                textValue: equipmentName,
                onTextChanged: handleChangeEquipmentName,
              },
        },
        costTextField: {
            ...defaultProps.costTextField,
            label: {
                ...defaultProps.costTextField.label,
                value: t('application_form.start_application.equip_cost.label')
            },
            textInput: {
                textPlaceholder: t('application_form.start_application.equip_cost.placeholder'),
                textValue: equipmentCost,
                onTextChanged: handleChangeEquipmentCost,
              },
        },
        leaseTypeSelectField: {
            ...defaultProps.leaseTypeSelectField,
            label: {
                ...defaultProps.leaseTypeSelectField.label,
                value: t('application_form.start_application.lease_type.label')
            },
            select: {
                ...defaultProps.leaseTypeSelectField.select,
                text: {
                  ...defaultProps.leaseTypeSelectField.select?.text,
                  value: equipmentLeaseType,
                },
              },
              contextualMenu,
              selectId: t('application_form.start_application.lease_type.label'),
        },
        nextButton: {
            ...defaultProps.nextButton,
            text: {
                ...defaultProps.nextButton.text,
                value: t('button_text.next')
            },
            onButtonClicked: handleClickNext,
            disabled: formInvalid
        }
    }

    return (
        <View
        {...startApplicationBlockProps}
        />
    )};
    return Presenter;
};
export default withPresenter;
