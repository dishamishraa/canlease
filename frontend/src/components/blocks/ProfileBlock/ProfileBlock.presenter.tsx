import React from 'react';
import { useTranslation } from 'react-i18next';
import { Profile } from '../../../modules/profile/types';
import { QuoteDetailItemProps, defaultProps as defaultQuoteDetailItemProps } from '../../molecules/QuoteDetailItem/QuoteDetailItem';
import { ProfileBlockProps, defaultProps } from './ProfileBlock';
import { NOT_AVAILABLE } from '../../../lib/constants';

export type ProfileBlockPresenterProps = ProfileBlockProps & {
  profile: Profile | null;
};

const withPresenter = (
  View: React.FC<ProfileBlockProps>,
): React.FC<ProfileBlockPresenterProps> => {
  const Presenter: React.FC<ProfileBlockPresenterProps> = (props) => {
    const { t } = useTranslation();
    const {
      profile,
      className,
    } = props;
    let personalDetails: QuoteDetailItemProps[] = [];
    let contactDetails: QuoteDetailItemProps[] = [];
    let businessDetails: QuoteDetailItemProps[] = [];

    if (profile) {
      const {
        firstName,
        lastName,
        email,
        phone,
        street,
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

      const personalInfo = [firstName, lastName];
      personalDetails = personalInfo.map((item, index) => ({
        ...defaultQuoteDetailItemProps,
        labelText: {
          ...defaultQuoteDetailItemProps.labelText,
          value: t(`profile_page.personal_info.label.${index}`),
        },
        infoText: {
          ...defaultQuoteDetailItemProps.infoText,
          value: item,
        },
      }));

      const contactInfo = [email, phone, street, city, province, postalCode];
      contactDetails = contactInfo.map((item, index) => ({
        ...defaultQuoteDetailItemProps,
        labelText: {
          ...defaultQuoteDetailItemProps.labelText,
          value: t(`profile_page.contact_info.label.${index}`),
        },
        infoText: {
          ...defaultQuoteDetailItemProps.infoText,
          value: item,
        },
      }));

      const operatingSince = new Date(operatingSinceDate).toDateString();
      const businessInfo = [
        companyName,
        operatingName,
        businessSector,
        operatingSince,
        businessPhone,
        website,
      ];
      businessDetails = businessInfo.map((item, index) => ({
        ...defaultQuoteDetailItemProps,
        labelText: {
          ...defaultQuoteDetailItemProps.labelText,
          value: t(`profile_page.business_info.label.${index}`),
        },
        infoText: {
          ...defaultQuoteDetailItemProps.infoText,
          value: item ? item : NOT_AVAILABLE,
        },
      }));
    }

    const profileBlockProps: ProfileBlockProps = {
      ...defaultProps,
      blockHeading: {
        ...defaultProps.blockHeading,
        value: t('profile_page.header'),
      },
      description: {
        ...defaultProps.description,
        value: <div dangerouslySetInnerHTML={{ __html: t('profile_page.description') }} />,
      },
      personalDetailsSection: {
        ...defaultProps.personalDetailsSection,
        text: {
          ...defaultProps.personalDetailsSection.text,
          value: t('profile_page.personal_info.header'),
        },
        detailItemList: {
          quoteDetailItems: personalDetails,
        },
      },
      contactDetailsSection: {
        ...defaultProps.contactDetailsSection,
        text: {
          ...defaultProps.contactDetailsSection.text,
          value: t('profile_page.contact_info.header'),
        },
        detailItemList: {
          quoteDetailItems: contactDetails,
        },
      },
      businessDetailsSection: {
        ...defaultProps.businessDetailsSection,
        text: {
          ...defaultProps.businessDetailsSection.text,
          value: t('profile_page.business_info.header'),
        },
        detailItemList: {
          quoteDetailItems: businessDetails,
        },
      },
    };

    return <View {...profileBlockProps} className={className} />;
  };

  return Presenter;
};

export default withPresenter;
