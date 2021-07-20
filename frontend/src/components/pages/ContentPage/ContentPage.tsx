import React from 'react';
import cx from 'classnames';
import { Switch, Route } from 'react-router-dom';
import styles from './ContentPage.module.scss';
import TopBlock, { TopBlockProps } from '../../blocks/TopBlock';
import TopActionBlock, { TopActionBlockProps } from '../../blocks/TopActionBlock';
import Table, { TableProps } from '../../blocks/Table';
import { ContentFilter, ContentTypeTabs } from '../../../modules/types';

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
  searchQuery?: string;
  setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
  statusFilter?: ContentFilter;
  setStatusFilter?: React.Dispatch<React.SetStateAction<ContentFilter>>;
  tab?: ContentTypeTabs;
};

const routes = {
  quotes: '/portal/quotes',
  customerQuotes: '/portal/quotes/customer',
  applications: '/portal/applications',
  customerApplications: '/portal/applications/customer',
};

const ContentPage: React.FC<ContentPageProps> = ({
  topBlock,
  topActionBlock,
  className,
  table,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  tab,
}) => (
    <div className={cx(styles.contentPage, className)}>
      <Switch>
        <Route exact path={[routes.quotes, routes.customerQuotes]}>
          <TopBlock
            className={styles.topBlock}
            {...topBlock}
            contentType='Quote'
            tab={tab}/>
          <TopActionBlock
            className={styles.topActionBlock}
            {...topActionBlock}
            contentType='Quote'
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            tab={tab} />
          <Table
            className={styles.table}
            {...table}
            contentType='Quote'
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            tab={tab}/>
        </Route>
        <Route exact path={[routes.applications, routes.customerApplications]}>
          <TopBlock
            className={styles.topBlock}
            {...topBlock}
            contentType='Application'
            tab={tab}/>
          <TopActionBlock
            className={styles.topActionBlock}
            {...topActionBlock}
            contentType='Application'
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            tab={tab}/>
          <Table
            className={styles.table}
            {...table}
            contentType='Application'
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            tab={tab}/>
        </Route>
      </Switch>

    </div>
);

ContentPage.defaultProps = defaultProps;

export default ContentPage;
