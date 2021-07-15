import React from 'react';
import { useTranslation } from 'react-i18next';
import { QuoteDetailItemProps, defaultProps as defaultQuoteDetailItemProps } from '../../molecules/QuoteDetailItem/QuoteDetailItem';
import { ProfileBlockProps, defaultProps } from './ProfileBlock';

export type ProfileBlockPresenterProps = ProfileBlockProps & {
};

const withPresenter = (
  View: React.FC<ProfileBlockProps>,
): React.FC<ProfileBlockPresenterProps> => {
  const Presenter: React.FC<ProfileBlockPresenterProps> = (props) => {
    const { t } = useTranslation();
    const {
      profile
    } = props;
    let personalDetails: QuoteDetailItemProps[] = [];
    let contactDetails: QuoteDetailItemProps[] = [];
    let businessDetails: QuoteDetailItemProps[] = [];

    if(profile){
      const { 
        firstName, 
        lastName, 
        email, 
        phone, 
        street ,
        city,
        province,
        postalCode,
        companyName,
        operatingName,
        businessSector,
        operatingSinceDate,
        businessPhone,
        website
      } = profile;
      const contactInfo = [email, phone, street, city, province, postalCode];
      const businessInfo = [companyName, operatingName, businessSector, operatingSinceDate, businessPhone, website];
      personalDetails = [
        {
          ...defaultQuoteDetailItemProps,
          labelText: {
            ...defaultQuoteDetailItemProps.labelText,
            value: t('profile_page.personal_info.label.first_name')
          },
          infoText: {
            ...defaultQuoteDetailItemProps.infoText,
            value: firstName
          }
        },
        {
          ...defaultQuoteDetailItemProps,
          labelText: {
            ...defaultQuoteDetailItemProps.labelText,
            value: t('profile_page.personal_info.label.last_name')
          },
          infoText: {
            ...defaultQuoteDetailItemProps.infoText,
            value: lastName
          }
        },
      ];
      for(let i =0; i < contactInfo.length; i++){
        contactDetails.push(
          {
            ...defaultQuoteDetailItemProps,
            labelText: {
              ...defaultQuoteDetailItemProps.labelText,
              value: t(`profile_page.contact_info.label.${i}`)
            },
            infoText: {
              ...defaultQuoteDetailItemProps.infoText,
              value: contactInfo[i]
            }
          }
        )
        businessDetails.push(
          {
            ...defaultQuoteDetailItemProps,
            labelText: {
              ...defaultQuoteDetailItemProps.labelText,
              value: t(`profile_page.business_info.label.${i}`)
            },
            infoText: {
              ...defaultQuoteDetailItemProps.infoText,
              value: businessInfo[i]
            }
          }
        )
      };
    }

    const profileBlockProps: ProfileBlockProps = {
      ...defaultProps,
      blockHeading: {
        ...defaultProps.blockHeading,
        value: t('profile_page.header')
      },
      description: {
        ...defaultProps.description,
        value: t('profile_page.description')
      },
      personalDetailsSection: {
        ...defaultProps.personalDetailsSection,
        text: {
          ...defaultProps.personalDetailsSection.text,
          value: t('profile_page.personal_info.header')
        },
        detailItemList: {
          quoteDetailItems: personalDetails
        }
      },
      contactDetailsSection: {
        ...defaultProps.contactDetailsSection,
        text: {
          ...defaultProps.contactDetailsSection.text,
          value: t('profile_page.contact_info.header')
        },
        detailItemList: {
          quoteDetailItems: contactDetails
        }
      },
      businessDetailsSection: {
        ...defaultProps.businessDetailsSection,
        text: {
          ...defaultProps.businessDetailsSection.text,
          value: t('profile_page.business_info.header')
        },
        detailItemList: {
          quoteDetailItems: businessDetails
        }
      }
    }
    return (
        <View
          {...profileBlockProps}
        />);
    }

return Presenter;
};

export default withPresenter;