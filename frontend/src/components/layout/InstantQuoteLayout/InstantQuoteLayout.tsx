import React from 'react';
import cx from 'classnames';

import styles from './InstantQuoteLayout.module.scss';

import Header, { HeaderProps } from '../../organisms/Header';
import SimplePage, { SimplePageProps } from '../../pages/SimplePage';
import { useTranslation } from 'react-i18next';

export const defaultProps = {
  header: {
    logo: {
      size: 'Large',
    },
    userProfile: {
      style: 'Light',
      state: 'SignedIn',
      userIcon: {
        type: 'Initials',
        style: 'Default',
      },
      text: {
        style: 'Basic800',
        align: 'Left',
        size: 'Large',
        type: 'Paragraph1',
      },
      icon: {
        asset: 'ChevronDown',
        style: 'Basic800',
      },
    },
    divider: {
      style: 'Horizontal',
    },
  } as HeaderProps,
  simplePage: {
    getQuoteBlock: {
      blockHeading: {
        style: 'Basic800',
        align: 'Left',
        size: 'Large',
        type: 'Heading1',
      },
      nameTextField: {
        state: 'Default',
        label: {
          style: 'Basic800',
          align: 'Left',
          size: 'Medium',
          type: 'Paragraph2',
        },
        textInput: {
        },
      },
      costTextField: {
        state: 'Default',
        label: {
          style: 'Basic800',
          align: 'Left',
          size: 'Medium',
          type: 'Paragraph2',
        },
        textInput: {
        },
      },
      leaseTypeSelectField: {
        label: {
          style: 'Basic800',
          align: 'Left',
          size: 'Medium',
          type: 'Paragraph2',
        },
        select: {
          text: {
            style: 'Basic500',
            align: 'Left',
            size: 'Large',
            type: 'Paragraph1',
          },
          icon: {
            asset: 'ChevronDown',
            style: 'Basic800',
          },
        },
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
    },
    actionBlock: {
      text: {
        style: 'Basic800',
        align: 'Center',
        size: 'Large',
        type: 'Paragraph1',
      },
      button: {
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
    },
  } as SimplePageProps,
};

export type InstantQuoteLayoutProps = {
  header?: HeaderProps;
  simplePage?: SimplePageProps;
  className?: string;
};

const InstantQuoteLayout: React.FC<InstantQuoteLayoutProps> = ({
  header,
  simplePage,
  className,
}) => {
  const { t } = useTranslation();
  const descriptionText = t('contact_us.description');
  const buttonText = t('contact_us.button_text');

  simplePage = {
    actionBlock:{
      text:{
        ...defaultProps.simplePage.actionBlock?.text,
        value: descriptionText
      },
      button:{
        ...defaultProps.simplePage.actionBlock?.button,
        text:{
          ...defaultProps.simplePage.actionBlock?.button?.text,
          value: buttonText
        }
      }
    }
  }

  return (
    <div className={cx(styles.instantQuoteLayout, className)}>
      <Header
        className={styles.header}
        {...header} />
      <div className={styles.body}>
        <div className={styles.bodyContent}>
          <SimplePage
            className={styles.simplePage}
            {...simplePage} />
        </div>
      </div>
    </div>
  );
};

InstantQuoteLayout.defaultProps = defaultProps;

export default InstantQuoteLayout;
