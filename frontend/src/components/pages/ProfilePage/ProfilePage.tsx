import React from 'react';
import cx from 'classnames';

import styles from './ProfilePage.module.scss';

import TopBar, { TopBarProps } from '../../organisms/TopBar';
import ProfileBlock, { ProfileBlockProps } from '../../blocks/ProfileBlock';
import { Profile } from '../../../modules/profile/types';

export const defaultProps = {
  topBar: {
    backButton: {
      type: 'IconTextButton',
      size: 'Small',
      fill: 'None',
      colour: 'Basic',
      icon: {
        asset: 'ArrowLeft',
        style: 'Brand500',
      },
      text: {
        style: 'Brand500',
        align: 'Center',
        size: 'Small',
        type: 'ButtonGiant',
      },
    },
  } as TopBarProps,
  block: {
    blockHeading: {
      style: 'Basic800',
      align: 'Left',
      size: 'Large',
      type: 'Heading1',
    },
    description: {
      style: 'Basic800',
      align: 'Left',
      size: 'Large',
      type: 'Paragraph1',
    },
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
    },
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
    },
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
    },
  } as ProfileBlockProps,
};

export type ProfilePageProps = {
  topBar?: TopBarProps;
  block?: ProfileBlockProps;
  className?: string;
  profile?: Profile;
};

const ProfilePage: React.FC<ProfilePageProps> = ({
  topBar,
  block,
  className,
  profile
}) => (
    <div className={cx(styles.profilePage, className)}>
      <TopBar
        className={styles.topBar}
        {...topBar} />
      <ProfileBlock
        className={styles.block}
        {...block} />
    </div>
);

ProfilePage.defaultProps = defaultProps;

export default ProfilePage;
