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
import { AssetInfo } from '../../../modules/types';

export type AssetInformationBlockPresenterProps = AssetInformationBlockProps & {
    quoteDetails: Quote | null;
    setAssetInfo?: React.Dispatch<React.SetStateAction<AssetInfo>>;
    assetInfo?: AssetInfo;
    stepperCurrentValue?: number,
    setStepperCurrentValue?: React.Dispatch<React.SetStateAction<number>>;
    stepperTotalValue?: number,
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
        setStepperCurrentValue,
        stepperTotalValue,
    } = props;
    const { t } = useTranslation();
    const history = useHistory();
    const [showAgeOfAssetField, setShowAgeOfAssetField] = useState(false);

    
    const handleChangeAssetAge = ({ target: { value }}) => {
      if (setAssetInfo){
        setAssetInfo(assetInfo => ({...assetInfo, ageOfAsset: value}))
      }
    }
    const handleChangeExpectedDate  = ({ target: { value }}) => {
      if (setAssetInfo){
        setAssetInfo(assetInfo => ({...assetInfo, expectedDeliveryDate: value}))
      }
    }
    const handleConditionClicked = (condition) => (event: any) => {
      if (condition === 'Used' && setAssetInfo) {
        setAssetInfo(assetInfo => ({...assetInfo, assetCondition: condition}))
        setShowAgeOfAssetField(true);
      }
      else if (condition === 'New'  && setAssetInfo) {
        setAssetInfo(assetInfo => ({...assetInfo, ageOfAsset: 0, assetCondition: condition}))
        setShowAgeOfAssetField(false);
      }
    }
    useEffect(() => {
      if(assetInfo){
        if (assetInfo.assetCondition === 'Used') {
          setShowAgeOfAssetField(true);
        }
      }
    }, [])

    let handleState;
    let isFormValid;
    let handleClickNext;
    let getAssetAge;
    let getDeliveryDate;

    if (assetInfo) {
    const { assetCondition, expectedDeliveryDate: expectedDate, ageOfAsset: assetAge} = assetInfo
      handleState = (type) => {
        if (assetCondition === type) {
         return 'Selected';
        }
        return 'Unselected';
      }
      isFormValid = () => {
        if (assetCondition === 'New' && !isEmptyString(expectedDate)) {
            return true;
        } else if (assetCondition === 'Used' && !isEmptyString(expectedDate) && assetAge > 0){
            return true;
        } else {
            return false;
        }
    }

      getAssetAge =  () => {
        return assetAge ? assetAge : "";
      }
      
      getDeliveryDate =  () => {
        return expectedDate ? expectedDate : "";
      }

      handleClickNext = () => {
        if(isFormValid() && setStepperCurrentValue && stepperCurrentValue){
          setStepperCurrentValue(stepperCurrentValue + 1);
          history.push('/portal/application/businessType')
        }
      };
    }
    
    const assetConditionRadioField: RadioFieldProps = {
        ...defaultProps.assetConditionRadioField,
        label: {
        ...defaultProps.assetConditionRadioField.label,
          value: t('application_form.asset_information.condition.label'),
        },
        radioButtonItems: [
          {
            ...defaultRadioButtonItemProps,
                state: handleState('New'),
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
              state: handleState('Used'),
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
                textValue: getAssetAge(),
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
                textValue: getDeliveryDate(),
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
          showAgeOfAssetField={showAgeOfAssetField}
        />
      );
    };
  
    return Presenter;
  };
  
  export default withPresenter;
  