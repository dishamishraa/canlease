import React, { useState } from 'react';
import { useEffect } from 'react';
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
      console.log(operatingName)
      //TODO: clean this up
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

      contactDetails = [
        {
          ...defaultQuoteDetailItemProps,
          labelText: {
            ...defaultQuoteDetailItemProps.labelText,
            value: t('profile_page.contact_info.label.email')
          },
          infoText: {
            ...defaultQuoteDetailItemProps.infoText,
            value: email
          }
        },
        {
          ...defaultQuoteDetailItemProps,
          labelText: {
            ...defaultQuoteDetailItemProps.labelText,
            value: t('profile_page.contact_info.label.phone_number')
          },
          infoText: {
            ...defaultQuoteDetailItemProps.infoText,
            value: phone
          }
        },
        {
          ...defaultQuoteDetailItemProps,
          labelText: {
            ...defaultQuoteDetailItemProps.labelText,
            value: t('profile_page.contact_info.label.street_address')
          },
          infoText: {
            ...defaultQuoteDetailItemProps.infoText,
            value: street
          }
        },
        {
          ...defaultQuoteDetailItemProps,
          labelText: {
            ...defaultQuoteDetailItemProps.labelText,
            value: t('profile_page.contact_info.label.city')
          },
          infoText: {
            ...defaultQuoteDetailItemProps.infoText,
            value: city
          }
        },
        {
          ...defaultQuoteDetailItemProps,
          labelText: {
            ...defaultQuoteDetailItemProps.labelText,
            value: t('profile_page.contact_info.label.province')
          },
          infoText: {
            ...defaultQuoteDetailItemProps.infoText,
            value: province
          }
        },
        {
          ...defaultQuoteDetailItemProps,
          labelText: {
            ...defaultQuoteDetailItemProps.labelText,
            value: t('profile_page.contact_info.label.postal_code')
          },
          infoText: {
            ...defaultQuoteDetailItemProps.infoText,
            value: postalCode
          }
        },
      ]

      businessDetails = [
        {
          ...defaultQuoteDetailItemProps,
          labelText: {
            ...defaultQuoteDetailItemProps.labelText,
            value: t('profile_page.business_info.label.legal_name')
          },
          infoText: {
            ...defaultQuoteDetailItemProps.infoText,
            value: companyName
          }
        },
        {
          ...defaultQuoteDetailItemProps,
          labelText: {
            ...defaultQuoteDetailItemProps.labelText,
            value: t('profile_page.business_info.label.operating_name')
          },
          infoText: {
            ...defaultQuoteDetailItemProps.infoText,
            value: operatingName
          }
        },
        {
          ...defaultQuoteDetailItemProps,
          labelText: {
            ...defaultQuoteDetailItemProps.labelText,
            value: t('profile_page.business_info.label.business_sector')
          },
          infoText: {
            ...defaultQuoteDetailItemProps.infoText,
            value: businessSector
          }
        },
        {
          ...defaultQuoteDetailItemProps,
          labelText: {
            ...defaultQuoteDetailItemProps.labelText,
            value: t('profile_page.business_info.label.operating_since')
          },
          infoText: {
            ...defaultQuoteDetailItemProps.infoText,
            value: operatingSinceDate
          }
        },
        {
          ...defaultQuoteDetailItemProps,
          labelText: {
            ...defaultQuoteDetailItemProps.labelText,
            value: t('profile_page.business_info.label.business_phone')
          },
          infoText: {
            ...defaultQuoteDetailItemProps.infoText,
            value: businessPhone
          }
        },
        {
          ...defaultQuoteDetailItemProps,
          labelText: {
            ...defaultQuoteDetailItemProps.labelText,
            value: t('profile_page.business_info.label.website_link')
          },
          infoText: {
            ...defaultQuoteDetailItemProps.infoText,
            value: website
          }
        },
      ]
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