import React from 'react';
import cx from 'classnames';

import styles from './EndUserDashboardPage.module.scss';

import PageHeaderBlock, { PageHeaderBlockProps } from '../../blocks/PageHeaderBlock';
import DataBlock, { DataBlockProps } from '../../blocks/DataBlock';

export const defaultProps = {
  pageHeaderBlock: {
    blockHeader: {
      style: 'Heading1',
      type: 'Default',
      text: {
        style: 'Basic800',
        align: 'Left',
        size: 'Large',
        type: 'Heading1',
      },
    },
  } as PageHeaderBlockProps,
  quotesBlock: {
    blockHeader: {
      style: 'Heading2',
      type: 'WithButton',
      text: {
        style: 'Basic800',
        align: 'Left',
        size: 'Large',
        type: 'Heading2',
      },
      button: {
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
    },
    dashboardCardList: {
      dashboardCards: [
      ],
    },
  } as DataBlockProps,
  applicationsBlock: {
    blockHeader: {
      style: 'Heading2',
      type: 'WithButton',
      text: {
        style: 'Basic800',
        align: 'Left',
        size: 'Large',
        type: 'Heading2',
      },
      button: {
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
    },
    dashboardCardList: {
      dashboardCards: [
      ],
    },
  } as DataBlockProps,
};

export type EndUserDashboardPageProps = {
  pageHeaderBlock?: PageHeaderBlockProps;
  quotesBlock?: DataBlockProps;
  applicationsBlock?: DataBlockProps;
  className?: string;
};

const EndUserDashboardPage: React.FC<EndUserDashboardPageProps> = ({
  pageHeaderBlock,
  quotesBlock,
  applicationsBlock,
  className,
}) => {
  return (
    <div className={cx(styles.endUserDashboardPage, className)}>
      <PageHeaderBlock
        className={styles.pageHeaderBlock}
        {...pageHeaderBlock} />
      <DataBlock
        className={styles.quotesBlock}
        {...quotesBlock} />
      <DataBlock
        className={styles.applicationsBlock}
        {...applicationsBlock} />
    </div>
  );
};

EndUserDashboardPage.defaultProps = defaultProps;

export default EndUserDashboardPage;
