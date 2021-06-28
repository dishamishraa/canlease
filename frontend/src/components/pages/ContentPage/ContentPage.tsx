import React from 'react';
import cx from 'classnames';

import styles from './ContentPage.module.scss';

import TopBlock, { TopBlockProps } from '../../blocks/TopBlock';
import TopActionBlock, { TopActionBlockProps } from '../../blocks/TopActionBlock';
import Table, { TableProps } from '../../blocks/Table';

export const defaultProps = {
  topBlock: {
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
    tabs: {
      tabsList: {
        tabItems: [
        ],
      },
      divider: {
        style: 'Horizontal',
      },
    },
  } as TopBlockProps,
  topActionBlock: {
    textInput: {
      type: 'Text',
    },
    select: {
      text: {
        style: 'Basic800',
        align: 'Left',
        size: 'Large',
        type: 'Paragraph1',
      },
      icon: {
        asset: 'ChevronDown',
        style: 'Basic800',
      },
    },
    button: {
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
  } as TopActionBlockProps,
  table: {
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
    },
    tableItemList: {
      tableItems: [
      ],
    },
  } as TableProps,
};

export type ContentPageProps = {
  topBlock?: TopBlockProps;
  topActionBlock?: TopActionBlockProps;
  className?: string;
  table?: TableProps;
  contentType?: string;
  searchQuery?: string;
  setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
  statusFilter?: string;
  setStatusFilter?: React.Dispatch<React.SetStateAction<string>>;
};

const ContentPage: React.FC<ContentPageProps> = ({
  topBlock,
  topActionBlock,
  className,
  table,
  contentType,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
}) => (
    <div className={cx(styles.contentPage, className)}>
      <TopBlock
        className={styles.topBlock}
        {...topBlock} 
        contentType={contentType}/>
      <TopActionBlock
        className={styles.topActionBlock}
        {...topActionBlock}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery} 
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}/>
      <Table
        className={styles.table}
        {...table} 
        contentType={contentType}
        searchQuery={searchQuery}
        statusFilter={statusFilter} />
    </div>
);

ContentPage.defaultProps = defaultProps;

export default ContentPage;
