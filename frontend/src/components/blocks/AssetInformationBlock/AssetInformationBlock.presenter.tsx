import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { AssetInformationBlockProps, defaultProps} from './AssetInformationBlock';
import { isEmptyString } from '../../../lib/utils';
import { defaultProps as defaultQuoteDetailItemProps } from '../../molecules/QuoteDetailItem/QuoteDetailItem';
import { defaultProps as defaultRadioButtonItemProps } from '../../atoms/RadioButtonItem/RadioButtonItem';
import { RadioFieldProps } from '../../molecules/RadioField';
import { DetailsSectionProps } from '../../organisms/DetailsSection';
import { Quote } from '../../../modules/quote/types';

export type AssetInformationBlockPresenterProps = AssetInformationBlockProps & {
    quoteDetails: Quote | null;
};

const withPresenter = (
  View: React.FC<AssetInformationBlockProps>,
): React.FC<AssetInformationBlockPresenterProps> => {
  const Presenter: React.FC<AssetInformationBlockPresenterProps> = (props) => {
    const {
        setAssetInfo,
        quoteDetails,
        assetInfo,
        className,
        stepperCurrentValue,
        stepperTotalValue,
    } = props;
    const { t } = useTranslation();
    const history = useHistory();
    const [assetCondition, setAssetCondition] = useState<'New' | 'Used'>();
    const [showAssetAgeField, setShowAssetAgeField] = useState(false);
    const [assetAge, setAssetAge] = useState<number>()
    const [expectedDeilivery, setExpectedDelivery] = useState<string>();


    useEffect(() => {
      if(assetInfo){
        setAssetCondition(assetInfo.assetCondition);
        setShowAssetAgeField(assetInfo.assetCondition === 'Used');
        setAssetAge(assetInfo.ageOfAsset);
        setExpectedDelivery(assetInfo.expectedDeliveryDate);
      }
    }, [assetInfo])
    
    const handleConditionClicked = (condition: 'New' | 'Used') => () => {
      setAssetCondition(condition);
      setShowAssetAgeField(condition === 'Used');
    }

    const handleChangeAssetAge = ({ target: { value }}) => {
      setAssetAge(value);
    }
    const handleChangeExpectedDate  = ({ target: { value }}) => {
      setExpectedDelivery(value);
    }
    
    const isFormValid = () => {
      if (assetCondition === 'New' && !isEmptyString(expectedDeilivery)) {
        return true;
      } else if (assetCondition === 'Used' && !isEmptyString(expectedDeilivery) && assetAge){
        return true;
      } else {
        return false;
      }
    }

    const handleClickNext = () => {
      if(setAssetInfo && assetAge && assetCondition && expectedDeilivery) {
        setAssetInfo({
          ageOfAsset: assetAge,
          assetCondition: assetCondition,
          expectedDeliveryDate: expectedDeilivery,
        })
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
      }
        ]
    }

    let detailsSectionProps: DetailsSectionProps = {};

    if (quoteDetails) {
        const {
          applicationAmount, asset, quoteId, leaseType,
        } = quoteDetails;
  
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
        }
    }
  
    const assetInformationBlockProps: AssetInformationBlockProps = {
        ...defaultProps,
        detailsSection: detailsSectionProps,
        stepper: {
            text: {
                ...defaultProps.stepper.text,
                value: t(`application_form.stepper`, {
                  current: stepperCurrentValue,
                  total: stepperTotalValue,
                })
            }
        },
        blockHeading: {
            ...defaultProps.blockHeading,
            value: t('application_form.asset_information.heading_text'),
        },
        assetConditionRadioField,
        ageOfAssetTextField: {
            ...defaultProps.ageOfAssetTextField,
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
            label: {
                ...defaultProps.expectedDeliveryDateTextField?.label,
                value: t('application_form.asset_information.expected_date'),
            },
            textInput: {
                ...defaultProps.expectedDeliveryDateTextField?.textInput,
                textPlaceholder: t('application_form.asset_information.date_placeholder'),
                textValue: expectedDeilivery,
                onTextChanged: handleChangeExpectedDate,
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
        }
    }
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
  