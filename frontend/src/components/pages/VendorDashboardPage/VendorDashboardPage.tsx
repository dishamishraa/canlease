import React from 'react';
import cx from 'classnames';

import styles from './VendorDashboardPage.module.scss';

import DataBlock, { DataBlockProps } from '../../blocks/DataBlock';
import { ResourceBlockProps } from '../../blocks/ResourceBlock';

export const defaultProps = {
  dataBlock: {
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
    dashboardCardList: {
      dashboardCards: [
      ],
    },
  } as DataBlockProps,
  resourceBlock: {
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
    resourceCardList: {
      resourceCards: [
      ],
    },
  } as ResourceBlockProps,
};

export type VendorDashboardPageProps = {
  dataBlock?: DataBlockProps;
  resourceBlock?: ResourceBlockProps;
  className?: string;
};

const VendorDashboardPage: React.FC<VendorDashboardPageProps> = ({
  dataBlock,
  resourceBlock,
  className,
}) => (
    <div className={cx(styles.vendorDashboardPage, className)}>
      <DataBlock
        className={styles.dataBlock}
        {...dataBlock}/>
    </div>
);

VendorDashboardPage.defaultProps = defaultProps;

export default VendorDashboardPage;
