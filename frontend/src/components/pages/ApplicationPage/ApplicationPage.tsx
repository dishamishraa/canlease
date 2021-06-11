import React from 'react';
import cx from 'classnames';

import styles from './ApplicationPage.module.scss';

import TopBar, { TopBarProps } from '../../organisms/TopBar';
import StartApplicationBlock, { StartApplicationBlockProps } from '../../blocks/StartApplicationBlock';

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
  } as StartApplicationBlockProps,
};

export type ApplicationPageProps = {
  topBar?: TopBarProps;
  block?: StartApplicationBlockProps;
  className?: string;
};

const ApplicationPage: React.FC<ApplicationPageProps> = ({
  topBar,
  block,
  className,
}) => (
    <div className={cx(styles.applicationPage, className)}>
      <TopBar
        className={styles.topBar}
        {...topBar} />
      <StartApplicationBlock
        className={styles.block}
        {...block} />
    </div>
);

ApplicationPage.defaultProps = defaultProps;

export default ApplicationPage;
