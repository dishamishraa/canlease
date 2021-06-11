import React from 'react';
import cx from 'classnames';

import styles from './ProfileSetupPage.module.scss';

import TopBar, { TopBarProps } from '../../organisms/TopBar';
import PersonalInformationBlock, { PersonalInformationBlockProps } from '../../blocks/PersonalInformationBlock';

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
    stepper: {
      text: {
        style: 'Brand500',
        align: 'Left',
        size: 'Medium',
        type: 'Paragraph3',
      },
    },
    blockHeading: {
      style: 'Basic800',
      align: 'Left',
      size: 'Large',
      type: 'Heading1',
    },
    firstNameTextField: {
      state: 'Default',
      type: 'Text',
      label: {
        style: 'Basic800',
        align: 'Left',
        size: 'Medium',
        type: 'Paragraph2',
      },
      textInput: {
        type: 'Text',
      },
    },
    lastNameTextField: {
      state: 'Default',
      type: 'Text',
      label: {
        style: 'Basic800',
        align: 'Left',
        size: 'Medium',
        type: 'Paragraph2',
      },
      textInput: {
        type: 'Text',
      },
    },
    radiobuttonList: {
      radioButtonItems: [
      ],
    },
    nextButton: {
      type: 'Button',
      size: 'Large',
      fill: 'Colour',
      colour: 'Brand',
      text: {
        style: 'Basic100',
        align: 'Center',
        size: 'Small',
        type: 'ButtonGiant',
      },
    },
  } as PersonalInformationBlockProps,
};

export type ProfileSetupPageProps = {
  topBar?: TopBarProps;
  block?: PersonalInformationBlockProps;
  className?: string;
};

const ProfileSetupPage: React.FC<ProfileSetupPageProps> = ({
  topBar,
  block,
  className,
}) => (
    <div className={cx(styles.profileSetupPage, className)}>
      <TopBar
        className={styles.topBar}
        {...topBar} />
      <PersonalInformationBlock
        className={styles.block}
        {...block} />
    </div>
);

ProfileSetupPage.defaultProps = defaultProps;

export default ProfileSetupPage;
