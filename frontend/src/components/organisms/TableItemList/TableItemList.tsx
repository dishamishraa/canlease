import React from 'react';
import cx from 'classnames';

import styles from './TableItemList.module.scss';

import TableItem, { TableItemProps } from '../../molecules/TableItem';

export const defaultProps = {
  tableItems: [
  ] as TableItemProps[],
};

export type TableItemListProps = {
  tableItems?: TableItemProps[];
  className?: string;
};

const TableItemList: React.FC<TableItemListProps> = ({
  tableItems,
  className,
}) => {
  const tableItemArray = tableItems?.map((tableItem) => (
    <TableItem
      key={tableItem.id}
      className={styles.tableItem}
      {...tableItem} />
  ));
  return (
    <div className={cx(styles.tableItemList, className)}>
      {tableItemArray}
    </div>
  );
};

TableItemList.defaultProps = defaultProps;

export default TableItemList;
