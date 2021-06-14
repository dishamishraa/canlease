import React from 'react';
import cx from 'classnames';

import styles from './LeaseDetailsPage.module.scss';

import TopBar, { TopBarProps } from '../../organisms/TopBar';
import LeaseInfoBlock, { LeaseInfoBlockProps } from '../../blocks/LeaseInfoBlock';

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
    leaseDetailsSection: {
      detailItemList: {
        quoteDetailItems: [
        ],
      },
    },
  } as LeaseInfoBlockProps,
};

export type LeaseDetailsPageProps = {
  topBar?: TopBarProps;
  block?: LeaseInfoBlockProps;
  className?: string;
};

const LeaseDetailsPage: React.FC<LeaseDetailsPageProps> = ({
  topBar,
  block,
  className,
}) => (
    <div className={cx(styles.leaseDetailsPage, className)}>
      <TopBar
        className={styles.topBar}
        {...topBar} />
      <LeaseInfoBlock
        className={styles.block}
        {...block} />
    </div>
);

LeaseDetailsPage.defaultProps = defaultProps;

export default LeaseDetailsPage;
