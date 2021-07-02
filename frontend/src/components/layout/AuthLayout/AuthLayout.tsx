import React from 'react';
import cx from 'classnames';

import styles from './AuthLayout.module.scss';

import Header, { HeaderProps } from '../../organisms/Header';
import AuthPage, { AuthPageProps } from '../../pages/AuthPage';

export const defaultProps = {
  header: {
    type: 'Default',
    logo: {
      size: 'Large',
    },
    userProfile: {
      style: 'Light',
      state: 'None',
    },
    divider: {
      style: 'Horizontal',
    },
  } as HeaderProps,
  authPage: {
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
    },
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
    },
  } as AuthPageProps,
};

export type AuthLayoutProps = {
  header?: HeaderProps;
  authPage?: AuthPageProps;
  className?: string;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({
  header,
  authPage,
  className,
}) => {
  return (
    <div className={cx(styles.authLayout, className)}>
      <Header
        className={styles.header}
        {...header} />
      <div className={styles.body}>
        <div className={styles.bodyContent}>
          <AuthPage
            className={styles.authPage}
            {...authPage} />
        </div>
      </div>
    </div>
  );
};

AuthLayout.defaultProps = defaultProps;

export default AuthLayout;
