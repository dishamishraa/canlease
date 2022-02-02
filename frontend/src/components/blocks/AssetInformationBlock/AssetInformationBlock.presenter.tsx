import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getTodaysDateString, isEmptyString, isValidDate } from '../../../lib/utils';
import { defaultProps as defaultRadioButtonItemProps } from '../../atoms/RadioButtonItem/RadioButtonItem';
import { defaultProps as defaultQuoteDetailItemProps } from '../../molecules/QuoteDetailItem/QuoteDetailItem';
import { defaultProps as defaultTextFieldProps, TextFieldStateType } from '../../molecules/TextField/TextField';
import { RadioFieldProps } from '../../molecules/RadioField';
import { DetailsSectionProps } from '../../organisms/DetailsSection';
import { AssetInformationBlockProps, defaultProps } from './AssetInformationBlock';
import { IS_SAFARI } from '../../../lib/constants';

export type AssetInformationBlockPresenterProps = AssetInformationBlockProps;

type FormState = {
  assetAgeErrorMessage: string,
  dateErrorMessage: string
};

const withPresenter = (
  View: React.FC<AssetInformationBlockProps>,
): React.FC<AssetInformationBlockPresenterProps> => {
  const Presenter: React.FC<AssetInformationBlockPresenterProps> = (props) => {
    const {
      setAssetInfo,
      quote,
      assetInfo,
      className,
      stepperCurrentValue,
      stepperTotalValue,
    } = props;
    const { t } = useTranslation();
    const [assetCondition, setAssetCondition] = useState<'New' | 'Used'>();
    const [showAssetAgeField, setShowAssetAgeField] = useState(false);
    const [assetAge, setAssetAge] = useState<number>();
    const [expectedDeilivery, setExpectedDelivery] = useState<string>();
    const [formState, setFormState] = useState<FormState>();
    const [ageOfAssetError, setAgeOfAssetError] = useState<TextFieldStateType>('Default');
    const [expectedDeiliveryError, setExpectedDeiliveryError] = useState<TextFieldStateType>('Default');

    let currFormState: FormState = {
      assetAgeErrorMessage: '',
      dateErrorMessage: ''
    };

    useEffect(() => {
      if (assetInfo) {
        setAssetCondition(assetInfo.assetCondition);
        setShowAssetAgeField(assetInfo.assetCondition === 'Used');
        setAssetAge(assetInfo.ageOfAsset);
        setExpectedDelivery(assetInfo.expectedDeliveryDate);
      }
    }, [assetInfo]);

    const handleConditionClicked = (condition: 'New' | 'Used') => () => {
      setAssetCondition(condition);
      setShowAssetAgeField(condition === 'Used');
    };

    const handleChangeAssetAge = ({ target: { value } }) => {
      setAssetAge(value);
    };

    const handleChangeExpectedDate = ({ target: { value } }) => {
      setExpectedDelivery(value);
    };

    const isFormValid = () => {
      if (assetCondition === 'New' && !isEmptyString(expectedDeilivery)) {
        return true;
      } if (assetCondition === 'Used' && !isEmptyString(expectedDeilivery) && assetAge) {
        return true;
      }
      return false;
    };

    const isAssetAgeValid = (): boolean => {
      return assetAge ? assetAge >= 0 : assetCondition === 'New';
    }

    const handleClickNext = () => {
      if (setAssetInfo && assetCondition && expectedDeilivery) {
        let allFieldsAreValid = true;
        if (!isAssetAgeValid()) {
          allFieldsAreValid = false;
          currFormState.assetAgeErrorMessage = t('application_form.error_message');
          setFormState(currFormState);
          setAgeOfAssetError('Error');
        }

        if (!isValidDate(expectedDeilivery, 'future')) {
          allFieldsAreValid = false;
          currFormState.dateErrorMessage = t('error_message.invalid_date');
          setFormState(currFormState);
          setExpectedDeiliveryError('Error');
        }

        if (allFieldsAreValid) {
          setAssetInfo({
            ageOfAsset: assetAge || 0,
            assetCondition,
            expectedDeliveryDate: expectedDeilivery,
          });
          setAgeOfAssetError('Default');
          setExpectedDeiliveryError('Default');
        }
      }
    };

    const assetConditionRadioField: RadioFieldProps = {
      ...defaultProps.assetConditionRadioField,
      label: {
        ...defaultProps.assetConditionRadioField.label,
        value: t('application_form.asset_information.condition.label'),
      },
      radioButtonItems: [
        {
          ...defaultRadioButtonItemProps,
          state: assetCondition === 'New' ? 'Selected' : 'Unselected',
          selectedIcon: {
            ...defaultRadioButtonItemProps.selectedIcon,
          },
          unselectedIcon: {
            ...defaultRadioButtonItemProps.unselectedIcon,
            onIconClicked: handleConditionClicked('New'),
          },
          text: {
            ...defaultRadioButtonItemProps.text,
            value: t('application_form.asset_information.condition.new'),
          },
        },
        {
          ...defaultRadioButtonItemProps,
          state: assetCondition === 'Used' ? 'Selected' : 'Unselected',
          selectedIcon: {
            ...defaultRadioButtonItemProps.selectedIcon,
          },
          unselectedIcon: {
            ...defaultRadioButtonItemProps.unselectedIcon,
            onIconClicked: handleConditionClicked('Used'),
          },
          text: {
            ...defaultRadioButtonItemProps.text,
            value: t('application_form.asset_information.condition.used'),
          },
        },
      ],
    };

    let detailsSectionProps: DetailsSectionProps = {};

    if (quote) {
      const {
        applicationAmount, asset, quoteId,
      } = quote;

      detailsSectionProps = {
        text: {
          ...defaultProps.leaseDetailsSection.text,
          value: t('view_quote.quote_rate_section_heading_text'),
        },
        detailItemList: {
          ...defaultProps.leaseDetailsSection.detailItemList,
          quoteDetailItems: [
            {
              labelText: {
                ...defaultQuoteDetailItemProps.labelText,
                value: t('view_quote.quote_detail.application_amount.label'),
              },
              infoText: {
                ...defaultQuoteDetailItemProps.infoText,
                value: t('view_quote.quote_detail.application_amount.value', {
                  applicationAmount,
                }),
              },
            },
            {
              labelText: {
                ...defaultQuoteDetailItemProps.labelText,
                value: t('view_quote.quote_detail.equipment_label'),
              },
              infoText: {
                ...defaultQuoteDetailItemProps.infoText,
                value: asset,
              },
            },
            {
              labelText: {
                ...defaultQuoteDetailItemProps.labelText,
                value: t('view_quote.quote_detail.quote_id_label'),
              },
              infoText: {
                ...defaultQuoteDetailItemProps.infoText,
                value: quoteId,
              },
            },
          ],
        },
      };
    }

    const assetInformationBlockProps: AssetInformationBlockProps = {
      ...defaultProps,
      detailsSection: detailsSectionProps,
      quote,
      stepper: {
        text: {
          ...defaultProps.stepper.text,
          value: t('application_form.stepper', {
            current: stepperCurrentValue,
            total: stepperTotalValue,
          }),
        },
      },
      blockHeading: {
        ...defaultProps.blockHeading,
        value: t('application_form.asset_information.heading_text'),
      },
      assetConditionRadioField,
      ageOfAssetTextField: {
        ...defaultProps.ageOfAssetTextField,
        state: ageOfAssetError,
        errorMessage: {
          ...defaultTextFieldProps.errorMessage,
          value: formState?.assetAgeErrorMessage
        },
        label: {
          ...defaultProps.ageOfAssetTextField?.label,
          value: t('application_form.asset_information.age'),
        },
        textInput: {
          ...defaultProps.ageOfAssetTextField.textInput,
          textValue: assetAge !== undefined ? `${assetAge}` : undefined,
          onTextChanged: handleChangeAssetAge,
        },
      },
      expectedDeliveryDateTextField: {
        ...defaultProps.expectedDeliveryDateTextField,
        state: expectedDeiliveryError,
        errorMessage: {
          ...defaultTextFieldProps.errorMessage,
          value: formState?.dateErrorMessage
        },
        textInput: {
          min: getTodaysDateString(),
          inputType: IS_SAFARI ? 'text' : 'date',
          onTextChanged: handleChangeExpectedDate,
          textPlaceholder: t('application_form.asset_information.date_placeholder')
        },
        label: {
          ...defaultProps.expectedDeliveryDateTextField?.label,
          value: t('application_form.asset_information.expected_date'),
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
    };
    return (
      <View
        className={className}
        {...assetInformationBlockProps}
        showAssetAgeField={showAssetAgeField}
      />
    );
  };

  return Presenter;
};

export default withPresenter;
