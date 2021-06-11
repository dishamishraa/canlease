import React from 'react';
import cx from 'classnames';

import styles from './DetailItemList.module.scss';

import QuoteDetailItem, { QuoteDetailItemProps } from '../../molecules/QuoteDetailItem';

export const defaultProps = {
  quoteDetailItems: [
  ] as QuoteDetailItemProps[],
};

export type DetailItemListProps = {
  quoteDetailItems?: QuoteDetailItemProps[];
  className?: string;
};

const DetailItemList: React.FC<DetailItemListProps> = ({
  quoteDetailItems,
  className,
}) => {
  const quoteDetailItemArray = quoteDetailItems?.map((quoteDetailItem) => (
    <QuoteDetailItem
      className={styles.quoteDetailItem}
      {...quoteDetailItem} />
  ));
  
  return (
    <div className={cx(styles.detailItemList, className)}>
      {quoteDetailItemArray}
    </div>
  );
};

DetailItemList.defaultProps = defaultProps;

export default DetailItemList;
