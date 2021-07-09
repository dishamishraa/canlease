import React from 'react';
import cx from 'classnames';

import styles from './TableHeader.module.scss';

import Text, { TextProps } from '../../atoms/Text';

export const defaultProps = {
  companyName: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph3',
  } as TextProps,
  contactName: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph3',
  } as TextProps,
  status: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph3',
  } as TextProps,
  createOn: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph3',
  } as TextProps,
  assetName: {
    style: 'Basic800',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph3',
  } as TextProps,
  cost: {
    style: 'Basic800',
    align: 'Right',
    size: 'Medium',
    type: 'Paragraph3',
  } as TextProps,
};

export type TableHeaderProps = {
  companyName?: TextProps;
  contactName?: TextProps;
  status?: TextProps;
  createOn?: TextProps;
  assetName?: TextProps;
  cost?: TextProps;
  className?: string;
};

const TableHeader: React.FC<TableHeaderProps> = ({
  companyName,
  contactName,
  status,
  createOn,
  assetName,
  cost,
  className,
}) => {
  let dispayContantName;
  if (contactName?.value) {
    dispayContantName = (<Text
      className={styles.contactName}
      {...contactName} />);
  }

  return (
      <div className={cx(styles.tableHeader, className)}>
        <Text
          className={styles.companyName}
          {...companyName} />
        {dispayContantName}
        <Text
          className={styles.status}
          {...status} />
        <Text
          className={styles.createOn}
          {...createOn} />
        <Text
          className={styles.assetName}
          {...assetName} />
        <Text
          className={styles.cost}
          {...cost} />
      </div>
  );
};

TableHeader.defaultProps = defaultProps;

export default TableHeader;
