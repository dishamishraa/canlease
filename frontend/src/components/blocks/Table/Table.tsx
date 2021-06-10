import React from 'react';
import cx from 'classnames';

import styles from './Table.module.scss';

import TableHeader, { TableHeaderProps } from '../../molecules/TableHeader';
import TableItemList, { TableItemListProps } from '../../organisms/TableItemList';

export const defaultProps = {
  tableHeader: {
    companyName: {
      style: 'Basic800',
      align: 'Left',
      size: 'Medium',
      type: 'Paragraph3',
    },
    contactName: {
      style: 'Basic800',
      align: 'Left',
      size: 'Medium',
      type: 'Paragraph3',
    },
    status: {
      style: 'Basic800',
      align: 'Left',
      size: 'Medium',
      type: 'Paragraph3',
    },
    createOn: {
      style: 'Basic800',
      align: 'Left',
      size: 'Medium',
      type: 'Paragraph3',
    },
    assetName: {
      style: 'Basic800',
      align: 'Left',
      size: 'Medium',
      type: 'Paragraph3',
    },
    cost: {
      style: 'Basic800',
      align: 'Right',
      size: 'Medium',
      type: 'Paragraph3',
    },
  } as TableHeaderProps,
  tableItemList: {
    tableItems: [
    ],
  } as TableItemListProps,
};

export type TableProps = {
  tableHeader?: TableHeaderProps;
  tableItemList?: TableItemListProps;
  className?: string;
};

const Table: React.FC<TableProps> = ({
  tableHeader,
  tableItemList,
  className,
}) => {
  return (
    <div className={cx(styles.table, className)}>
      <TableHeader
        className={styles.tableHeader}
        {...tableHeader} />
      <TableItemList
        className={styles.tableItemList}
        {...tableItemList} />
    </div>
  );
};

Table.defaultProps = defaultProps;

export default Table;
