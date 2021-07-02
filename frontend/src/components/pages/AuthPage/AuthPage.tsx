import React from 'react';
import cx from 'classnames';

import styles from './AuthPage.module.scss';

import TopBar, { TopBarProps } from '../../organisms/TopBar';
import SignInBlock, { SignInBlockProps } from '../../blocks/SignInBlock';

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
      align: 'Center',
      size: 'Medium',
      type: 'Paragraph3',
    },
    description: {
      style: 'Basic800',
      align: 'Left',
      size: 'Large',
      type: 'Paragraph1',
    },
    emailTextField: {
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
    passwordField: {
      state: 'Default',
      type: 'Password',
      label: {
        style: 'Basic800',
        align: 'Left',
        size: 'Medium',
        type: 'Paragraph2',
      },
      textInput: {
        type: 'Password',
        icon: {
          asset: 'Show',
          style: 'Brand500',
        },
      },
    },
    nextButton: {
      type: 'Button',
      size: 'Large',
      fill: 'Basic',
      colour: 'Basic',
      text: {
        style: 'Brand500',
        align: 'Center',
        size: 'Small',
        type: 'ButtonGiant',
      },
    },
    forgotPasswordButton: {
      type: 'Button',
      size: 'Small',
      fill: 'None',
      colour: 'Basic',
      text: {
        style: 'Brand500',
        align: 'Center',
        size: 'Small',
        type: 'ButtonGiant',
      },
    },
  } as SignInBlockProps,
};

export type AuthPageProps = {
  topBar?: TopBarProps;
  block?: SignInBlockProps;
  className?: string;
};

const AuthPage: React.FC<AuthPageProps> = ({
  topBar,
  block,
  className,
}) => {
  return (
    <div className={cx(styles.authPage, className)}>
      <TopBar
        className={styles.topBar}
        {...topBar} />
      <SignInBlock
        className={styles.block}
        {...block} />
    </div>
  );
};

AuthPage.defaultProps = defaultProps;

export default AuthPage;
