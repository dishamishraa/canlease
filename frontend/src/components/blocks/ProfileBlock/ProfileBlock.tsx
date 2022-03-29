import React from 'react';
import cx from 'classnames';

import styles from './ProfileBlock.module.scss';

import Text, { TextProps } from '../../atoms/Text';
import DetailsSection, { DetailsSectionProps } from '../../organisms/DetailsSection';

export const defaultProps = {
  blockHeading: {
    style: 'Basic800',
    align: 'Left',
    size: 'Large',
    type: 'Heading1',
  } as TextProps,
  description: {
    style: 'Basic800',
    align: 'Left',
    size: 'Large',
    type: 'Paragraph1',
  } as TextProps,
  personalDetailsSection: {
    type: 'Default',
    text: {
      style: 'Basic800',
      align: 'Left',
      size: 'Large',
      type: 'Heading2',
    },
    detailItemList: {
      quoteDetailItems: [
      ],
    },
  } as DetailsSectionProps,
  contactDetailsSection: {
    type: 'Default',
    text: {
      style: 'Basic800',
      align: 'Left',
      size: 'Large',
      type: 'Heading2',
    },
    detailItemList: {
      quoteDetailItems: [
      ],
    },
  } as DetailsSectionProps,
  businessDetailsSection: {
    type: 'Default',
    text: {
      style: 'Basic800',
      align: 'Left',
      size: 'Large',
      type: 'Heading2',
    },
    detailItemList: {
      quoteDetailItems: [
      ],
    },
  } as DetailsSectionProps,
};

export type ProfileBlockProps = {
  blockHeading?: TextProps;
  description?: TextProps;
  personalDetailsSection?: DetailsSectionProps;
  contactDetailsSection?: DetailsSectionProps;
  businessDetailsSection?: DetailsSectionProps;
  className?: string;
};

const ProfileBlock: React.FC<ProfileBlockProps> = ({
  blockHeading,
  description,
  personalDetailsSection,
  contactDetailsSection,
  businessDetailsSection,
  className,
}) => (
    <div className={cx(styles.profileBlock, className)}>
      <div className={styles.headingContent}>
        <Text
          className={styles.blockHeading}
          {...blockHeading} />
        <Text
          className={styles.description}
          {...description} />
      </div>
      <DetailsSection
        className={styles.personalDetailsSection}
        {...personalDetailsSection} />
      <DetailsSection
        className={styles.contactDetailsSection}
        {...contactDetailsSection} />
      <DetailsSection
        className={styles.businessDetailsSection}
        {...businessDetailsSection} />
    </div>
);

ProfileBlock.defaultProps = defaultProps;

export default ProfileBlock;
