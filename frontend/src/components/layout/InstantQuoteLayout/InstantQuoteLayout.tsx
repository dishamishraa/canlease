import React from 'react';
import cx from 'classnames';

import styles from './InstantQuoteLayout.module.scss';

import Header, { HeaderProps } from '../../organisms/Header';
import SimplePage, { SimplePageProps } from '../../pages/SimplePage';

export const defaultProps = {
  header: {
    type: 'Default',
    logo: {
      size: 'Large',
    },
    userProfile: {
      style: 'Light',
      state: 'SignedOut',
      primary: {
        type: 'Button',
        size: 'Medium',
        fill: 'Basic',
        colour: 'Basic',
        text: {
          style: 'Brand500',
          align: 'Center',
          size: 'Small',
          type: 'ButtonGiant',
        },
      },
      secondary: {
        type: 'Button',
        size: 'Medium',
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
    divider: {
      style: 'Horizontal',
    },
  } as HeaderProps,
  simplePage: {
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
        align: 'Left',
        size: 'Large',
        type: 'Heading1',
      },
      nameTextField: {
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
      costTextField: {
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
}) => (
    <div className={cx(styles.instantQuoteLayout, className)}>
      <Header
        className={styles.header}
        {...header} />
      <div className={styles.body}>
        <div className={styles.bodyContent}>
          <SimplePage
            className={styles.simplePage}
            flowType='instaQuote'
            {...simplePage} />
        </div>
      </div>
    </div>
);

InstantQuoteLayout.defaultProps = defaultProps;

export default InstantQuoteLayout;
