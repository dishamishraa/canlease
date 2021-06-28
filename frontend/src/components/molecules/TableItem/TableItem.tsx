import React from 'react';
import cx from 'classnames';

import styles from './TableItem.module.scss';

import Text, { TextProps } from '../../atoms/Text';

export const defaultProps = {
  companyName: {
    style: 'Basic400',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
  contactName: {
    style: 'Basic400',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
  status: {
    style: 'Basic400',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
  createOn: {
    style: 'Basic400',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
  assetName: {
    style: 'Basic400',
    align: 'Left',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
  cost: {
    style: 'Basic400',
    align: 'Right',
    size: 'Medium',
    type: 'Paragraph2',
  } as TextProps,
};

export type TableItemProps = {
  companyName?: TextProps;
  contactName?: TextProps;
  status?: TextProps;
  createOn?: TextProps;
  assetName?: TextProps;
  cost?: TextProps;
  className?: string;
};

const TableItem: React.FC<TableItemProps> = ({
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
    dispayContantName= (   
    <Text
      className={styles.contactName}
      {...contactName} />)
  }
  return (
      <div className={cx(styles.tableItem, className)}>
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
}

TableItem.defaultProps = defaultProps;

export default TableItem;
