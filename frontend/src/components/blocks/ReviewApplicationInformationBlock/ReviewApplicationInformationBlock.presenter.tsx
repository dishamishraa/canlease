import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReviewApplicationInformationBlockProps, defaultProps } from './ReviewApplicationInformationBlock';
import { DetailsSectionProps } from '../../organisms/DetailsSection';
import { defaultProps as defaultQuoteDetailItemProps } from '../../molecules/QuoteDetailItem/QuoteDetailItem';
import { Profile } from '../../../modules/profile/types';
import { convertMonth, getStretchMonth } from '../../../lib/utils';

export type ReviewApplicationInformationBlockPresenterProps = ReviewApplicationInformationBlockProps & {
    profile: Profile | null;
};

const withPresenter = (
    View: React.FC<ReviewApplicationInformationBlockProps>,
  ): React.FC<ReviewApplicationInformationBlockPresenterProps> => {
    const Presenter: React.FC<ReviewApplicationInformationBlockPresenterProps> = (props) => {
    const {
      quoteDetailsSelected,
      className,
      quoteSelected,
      assetInfo,
      businessInfo,
      profile,
      stepperCurrentValue,
      stepperTotalValue,
    } = props;

    const { t } = useTranslation();

    let quoteDetails: DetailsSectionProps = {};
    let paymentDetails: DetailsSectionProps = {};
    let assetDetails: DetailsSectionProps = {};
    let businessTypeDetails: DetailsSectionProps = {};
    let personalDetails: DetailsSectionProps = {};
    let contactDetails: DetailsSectionProps = {};
    let profileBusinessDetails: DetailsSectionProps = {};

    const nextClicked = () => {
      if(setStepperCurrentValue && stepperCurrentValue){
        setStepperCurrentValue(stepperCurrentValue + 1);
        history.push('/portal/application/termsOfApplication')
      }
    };
    
    const handleEditClicked = (page) => (event: any) => {
      if (setStepperCurrentValue && stepperCurrentValue){
        switch (page) {
          case "assetInfo":
            setStepperCurrentValue(stepperCurrentValue-2)
            history.push('/portal/application/assetInfo')
            break;
          case "businessType":
            setStepperCurrentValue(stepperCurrentValue-1)
            history.push('/portal/application/businessType')
            break;
          case "paymentDetails":
            setStepperCurrentValue(stepperCurrentValue-3)
            history.push('/portal/application/applyQuote')
            break;
          case "quoteDetails":
            break;
          default:
            break;
        }
      }
    }

    if(profile){
      const {
        firstName, 
        lastName, 
        email, 
        phone, 
        address, 
        city, 
        province, 
        postalCode, 
        companyName, 
        operatingName, 
        businessSector, 
        operatingSinceDate, 
        businessPhone, 
        website,
      } = profile;
      
      let operatingSince = new Date(operatingSinceDate);
      
      personalDetails = {
        text: {
          ...defaultProps.businessTypeDetails.text,
          value: t('application_form.review_application.personal_information_header'),
        },
        detailItemList: {
          ...defaultProps.businessTypeDetails.detailItemList,
          quoteDetailItems: [
            {
              labelText: {
                ...defaultQuoteDetailItemProps.labelText,
                value: t('text_field_label.first_name'),
              },
              infoText: {
                ...defaultQuoteDetailItemProps.infoText,
                value: firstName,
              },
            },
            {
              labelText: {
                ...defaultQuoteDetailItemProps.labelText,
                value: t('text_field_label.last_name'),
              },
              infoText: {
                ...defaultQuoteDetailItemProps.infoText,
                value: lastName,
              },
            }
          ]
        }
      }

      contactDetails = {
        text: {
          ...defaultProps.businessTypeDetails.text,
          value: t('application_form.review_application.contact_information_header'),
        },
        detailItemList: {
          ...defaultProps.businessTypeDetails.detailItemList,
          quoteDetailItems: [
            {
              labelText: {
                ...defaultQuoteDetailItemProps.labelText,
                value: t('text_field_label.email'),
              },
              infoText: {
                ...defaultQuoteDetailItemProps.infoText,
                value: email,
              },
            },
            {
              labelText: {
                ...defaultQuoteDetailItemProps.labelText,
                value: t('text_field_label.phone_number'),
              },
              infoText: {
                ...defaultQuoteDetailItemProps.infoText,
                value: phone,
              },
            },
            {
              labelText: {
                ...defaultQuoteDetailItemProps.labelText,
                value: t('text_field_label.street_address'),
              },
              infoText: {
                ...defaultQuoteDetailItemProps.infoText,
                value: address,
              },
            },
            {
              labelText: {
                ...defaultQuoteDetailItemProps.labelText,
                value: t('text_field_label.city'),
              },
              infoText: {
                ...defaultQuoteDetailItemProps.infoText,
                value: city,
              },
            },
            {
              labelText: {
                ...defaultQuoteDetailItemProps.labelText,
                value: t('text_field_label.province'),
              },
              infoText: {
                ...defaultQuoteDetailItemProps.infoText,
                value: province,
              },
            },
            {
              labelText: {
                ...defaultQuoteDetailItemProps.labelText,
                value: t('text_field_label.postal_code'),
              },
              infoText: {
                ...defaultQuoteDetailItemProps.infoText,
                value: postalCode,
              },
            }
          ]
        }
      }
      profileBusinessDetails = {
        text: {
          ...defaultProps.businessTypeDetails.text,
          value: t('application_form.review_application.business_information_header'),
        },
        detailItemList: {
          ...defaultProps.businessTypeDetails.detailItemList,
          quoteDetailItems: [
            {
              labelText: {
                ...defaultQuoteDetailItemProps.labelText,
                value: t('text_field_label.full_legal_name'),
              },
              infoText: {
                ...defaultQuoteDetailItemProps.infoText,
                value: companyName,
              },
            },
            {
              labelText: {
                ...defaultQuoteDetailItemProps.labelText,
                value: t('text_field_label.operating_name'),
              },
              infoText: {
                ...defaultQuoteDetailItemProps.infoText,
                value: operatingName,
              },
            },
            {
              labelText: {
                ...defaultQuoteDetailItemProps.labelText,
                value: t('text_field_label.business_sector'),
              },
              infoText: {
                ...defaultQuoteDetailItemProps.infoText,
                value: businessSector,
              },
            },
            {
              labelText: {
                ...defaultQuoteDetailItemProps.labelText,
                value: t('text_field_label.operating_since'),
              },
              infoText: {
                ...defaultQuoteDetailItemProps.infoText,
                value: operatingSince.toDateString(),
              },
            },
            {
              labelText: {
                ...defaultQuoteDetailItemProps.labelText,
                value: t('text_field_label.business_phone'),
              },
              infoText: {
                ...defaultQuoteDetailItemProps.infoText,
                value: businessPhone,
              },
            },
            {
              labelText: {
                ...defaultQuoteDetailItemProps.labelText,
                value: t('text_field_label.website_link'),
              },
              infoText: {
                ...defaultQuoteDetailItemProps.infoText,
                value: website,
              },
            }
          ]
        }
      }
    }
    if (quoteDetailsSelected) {
      const {
        applicationAmount, asset, quoteId, leaseType,
      } = quoteDetailsSelected;
    
    if (businessInfo) {
        const {
          bankruptcy, bankruptcyDetails, businessType, dob, sin,
        } = businessInfo;
        businessTypeDetails = {
          text: {
            ...defaultProps.businessTypeDetails.text,
            value: t('application_form.review_application.business_type.heading'),
          },
          button: {
            ...defaultProps.businessTypeDetails.button,
            text: {
              ...defaultProps.businessTypeDetails.button?.text,
              value: t('application_form.review_application.edit'),
            },
            onButtonClicked: handleEditClicked("businessType"),
          },
          detailItemList: {
            ...defaultProps.businessTypeDetails.detailItemList,
            quoteDetailItems: [
              {
                labelText: {
                  ...defaultQuoteDetailItemProps.labelText,
                  value: t('application_form.review_application.business_type.heading'),
                },
                infoText: {
                  ...defaultQuoteDetailItemProps.infoText,
                  value: businessType === "Incorporated" ? "Corporation" : "Sole Proprietorship",
                },
              },
              {
                labelText: {
                  ...defaultQuoteDetailItemProps.labelText,
                  value: sin ? t('application_form.review_application.business_type.sin_label') : "",
                },
                infoText: {
                  ...defaultQuoteDetailItemProps.infoText,
                  value: sin,
                },
              },
              {
                labelText: {
                  ...defaultQuoteDetailItemProps.labelText,
                  value: dob? t('application_form.review_application.business_type.date_of_birth_label') : "",
                },
                infoText: {
                  ...defaultQuoteDetailItemProps.infoText,
                  value: dob,
                },
              },
              {
                labelText: {
                  ...defaultQuoteDetailItemProps.labelText,
                  value: bankruptcy ? t('application_form.review_application.business_type.bankruptcy_label') : "",
                },
                infoText: {
                  ...defaultQuoteDetailItemProps.infoText,
                  value: bankruptcy,
                },
              },
            ]
          }
        }
    }
    if (assetInfo) {
      const {
        ageOfAsset, assetCondition, expectedDeliveryDate,
      } = assetInfo;
     
      assetDetails = {
        text: {
          ...defaultProps.assetDetails.text,
          value: t('application_form.review_application.asset_details.heading'),
        },
        button: {
          ...defaultProps.assetDetails.button,
          text: {
            ...defaultProps.assetDetails.button?.text,
            value: t('application_form.review_application.edit'),
          },
          onButtonClicked: handleEditClicked("assetInfo"),
        },
        detailItemList: {
          ...defaultProps.assetDetails.detailItemList,
          quoteDetailItems: [
            {
              labelText: {
                ...defaultQuoteDetailItemProps.labelText,
                value: t('application_form.review_application.asset_details.condition_label'),
              },
              infoText: {
                ...defaultQuoteDetailItemProps.infoText,
                value: assetCondition,
              },
            },
            {
              labelText: {
                ...defaultQuoteDetailItemProps.labelText,
                value: (ageOfAsset != 0) ? t('application_form.review_application.asset_details.age_label') : "",
              },
              infoText: {
                ...defaultQuoteDetailItemProps.infoText,
                value: (ageOfAsset != 0) ? t('application_form.review_application.asset_details.age_value', {
                  ageOfAsset,
                }) : "",
              },
            },
            {
              labelText: {
                ...defaultQuoteDetailItemProps.labelText,
                value: t('application_form.review_application.asset_details.date_of_delivery_label'),
              },
              infoText: {
                ...defaultQuoteDetailItemProps.infoText,
                value: expectedDeliveryDate
              },
            }
          ],
        }
      }
    }
    if (quoteSelected) {
      const {
        term: termString, monthlyAmount, financeRate,
      } = quoteSelected;
      const term = convertMonth(termString);

      paymentDetails = {
        text: {
          ...defaultProps.paymentDetails.text,
          value: t('application_form.review_application.payment_details.heading'),
        },
        button: {
          ...defaultProps.paymentDetails.button,
          text: {
            ...defaultProps.paymentDetails.button?.text,
            value: t('application_form.review_application.edit'),
          },
          onButtonClicked: handleEditClicked("paymentDetails"),
        },
        detailItemList: {
          ...defaultProps.paymentDetails.detailItemList,
          quoteDetailItems: [
            {
              labelText: {
                ...defaultQuoteDetailItemProps.labelText,
                value: t('application_form.review_application.payment_details.monthly_payment_label'),
              },
              infoText: {
                ...defaultQuoteDetailItemProps.infoText,
                value: t('application_form.review_application.payment_details.monthly_payment_value', {
                  monthlyAmount,
                }),
              },
            },
            {
              labelText: {
                ...defaultQuoteDetailItemProps.labelText,
                value: t('application_form.review_application.payment_details.lease_term_label'),
              },
              infoText: {
                ...defaultQuoteDetailItemProps.infoText,
                value: t('application_form.review_application.payment_details.lease_term_value', {
                  termValue: (leaseType === 'stretch') 
                  ? getStretchMonth(term)
                  : term,
                }),
              },
            },
            {
              labelText: {
                ...defaultQuoteDetailItemProps.labelText,
                value: t('application_form.review_application.payment_details.cost_of_finance_label'),
              },
              infoText: {
                ...defaultQuoteDetailItemProps.infoText,
                value: `${financeRate}%`,
              },
            },
            {
              labelText: {
                ...defaultQuoteDetailItemProps.infoText,
                value: (leaseType === 'stretch')
                ? t('view_quote.rate_card.stretch_purchase_term', { purchaseOptionMonths: term })
                : t('view_quote.rate_card.ten_dollar_purchase_term'),
              },
            },
          ],
        },
      }
    }
  
      quoteDetails = {
        text: { 
          ...defaultProps.quoteDetails.text,
          value: t('view_quote.quote_rate_section_heading_text'),
        },
        button: {
          ...defaultProps.quoteDetails.button,
          text: {
            ...defaultProps.quoteDetails.button?.text,
          },
          onButtonClicked: handleEditClicked("quoteDetails"),
        },
        detailItemList: {
          ...defaultProps.quoteDetails.detailItemList,
          quoteDetailItems: [
            {
              labelText: {
                ...defaultQuoteDetailItemProps.labelText,
                value: t('view_quote.quote_detail.application_amount.label'),
              },
              infoText: {
                ...defaultQuoteDetailItemProps.infoText,
                value: t('application_form.review_application.quote_details_based_on_value', {
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
   
    const reviewApplicationInformationBlockProps: ReviewApplicationInformationBlockProps = {
      ...defaultProps,
      stepper: {
        text: {
            ...defaultProps.stepper.text,
            value: t(`application_form.stepper`, {
              current: stepperCurrentValue,
              total: stepperTotalValue,
            })
        }
      },
      blockHeading:{
        ...defaultProps.blockHeading,
        value:t('application_form.review_application.review_header'),
      },
      sectionHeadingOne:{
        ...defaultProps.sectionHeadingOne,
        value:t('application_form.review_application.asset_header'),
      },
      sectionHeadingTwo:{
        ...defaultProps.sectionHeadingOne,
        value:t('application_form.review_application.profile_header'),
      },
      text: {
        ...defaultProps.text,
        value: <div dangerouslySetInnerHTML={{ __html:  t('application_form.review_application.profile_description') }} />
      },
      quoteDetails,
      paymentDetails,
      assetDetails,
      businessTypeDetails,
      personalDetails,
      contactDetails,
      profileBusinessDetails,
      nextButton:{
        ...defaultProps.nextButton,
        text: {
          ...defaultProps.nextButton.text,
          value: t('application_form.select_lease.next_button'),
        },
        onButtonClicked: nextClicked,
      },
    }

    return (
        <View
        className={className}
        {...reviewApplicationInformationBlockProps}
        />
      );
  };
  
    return Presenter;
  };
  
  export default withPresenter;