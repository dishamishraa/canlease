import React from 'react';
import { generatePath, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TableProps, defaultProps } from './Table';
import { TableItemListProps } from '../../organisms/TableItemList';
import { TableItemProps } from '../../molecules/TableItem';
import { defaultProps as tableItemDefaultProps } from '../../molecules/TableItem/TableItem';
import { isExpiring, isExpired, createdOn } from '../../../lib/utils';
import { CreditApplication, Portfolio } from '../../../modules/portfolio/types';
import { Quote } from '../../../modules/quote/types';
import { ContentFilter, ContentType, ContentTypeTabs, LeaseInfo } from '../../../modules/types';

type TableItem = {
  company: string;
  vendor?: string;
  contactName: string;
  status: ContentFilter;
  createdOn: string;
  asset: string;
  cost: number;
  link: string;
  linkState?: LeaseInfo;
}

export type TablePresenterValueProps = {
  quotes: Quote[] | null;
  portfolio: Portfolio | null;
};

export type TablePresenterProps = TableProps & TablePresenterValueProps;

const getQuoteStatus = ({ quoteId, quoteExpiryDate }: Quote, portfolio: Portfolio | null): ContentFilter => {
  if(!portfolio) {
    return 'active';
  }
  const { createApps } = portfolio;
  const isApplied: boolean = createApps.some((application) => application.quoteId === quoteId);

  if (isApplied) {
    return 'applied';
  }
  if (isExpired(quoteExpiryDate)) {
    return 'expired';
  }
  if (isExpiring(quoteExpiryDate)) {
    return 'expiring';
  }
  return 'active';
};

const getApplicationStatus = ({ applicationStatus }: CreditApplication): ContentFilter => {
  switch (applicationStatus) {
    case 'financed':
      return 'financed';
    case 'rejected':
      return 'rejected';
    case 'not active':
      return 'not_active';
    default:
      return 'under_review';
  }
};

const getCurrentItems = (
  contentType: ContentType | undefined, quotes: Quote[] | null, portfolio: Portfolio | null
): TableItem[] => {
  let items: TableItem[] = [];
  switch(contentType) {
    case 'Quote':
      if (quotes) {
        items = quotes.map((quote: Quote): TableItem => {
          return {
            company: quote.companyName,
            contactName: quote.name,
            status: getQuoteStatus(quote, portfolio),
            createdOn: createdOn(quote.quoteExpiryDate).toDateString(),
            asset: quote.asset,
            cost: quote.applicationAmount,
            link: `/portal/quote/${quote.quoteId}`,
          }
        });
      }
      break;
    case 'Application':
      if (portfolio && portfolio.createApps && portfolio.leases) {
        items = portfolio.createApps.map((application: CreditApplication): TableItem => {
          const companyName = application.companyName;
          const contactName = application.name;
          const lease = portfolio.leases.find(lease => lease.quoteId === application.quoteId)
          const vendorName = lease?.vendorName ?? ' - ';
          return {
            company: companyName,
            vendor: vendorName,
            contactName: contactName ?? application.name,
            status: getApplicationStatus(application),
            createdOn: new Date(application.createdDate).toDateString(),
            asset: application.asset,
            cost: application.applicationAmount,
            link: generatePath("/portal/application/:applicationDetails", { applicationDetails: application.creditAppNumber }),
            linkState: { application, lease }
          }
        });
      }
      break;
    default:
      break;
  }

  return items;
}

const filterItems = (
  items: TableItem[], searchQuery?: string, statusFilter?: ContentFilter,
): TableItem[] => { 
  const filteredItems = statusFilter === 'all' ? items : items.filter((item: TableItem) => {
    return item.status === statusFilter;
  });
  if(searchQuery) {
    const search = searchQuery.toLowerCase();
    const itemsMatchSearch = filteredItems.filter((item: TableItem) => {
      const itemCompanyName = item.company.toLowerCase();
      const itemContactName = item.contactName.toLowerCase();
      const createdOn = item.createdOn.toLowerCase();
      const itemAssetName = item.asset.toLowerCase();
      const itemCost = item.cost.toString().toLowerCase();
      return itemCompanyName?.includes(search) || itemContactName?.includes(search) ||
        createdOn?.includes(search) || itemAssetName?.includes(search) ||
        itemCost?.includes(search);
    });
    return itemsMatchSearch;
  }
  return filteredItems;
}

const withPresenter = (
  View: React.FC<TableProps>,
): React.FC<TablePresenterProps> => {
  const Presenter: React.FC<TablePresenterProps> = (props) => {
    const {
      contentType,
      searchQuery,
      statusFilter,
      tab,
      quotes, 
      portfolio,
    } = props;
    const { t } = useTranslation();
    const history = useHistory();

    const currentItems =  getCurrentItems(contentType, quotes, portfolio);
    const filteredItems = filterItems(currentItems, searchQuery, statusFilter);

    const tableItemListProps: TableItemListProps = {
      ...defaultProps.tableItemList,
      tableItems: filteredItems.map(({
        company, contactName, status, createdOn, asset, cost, link, vendor, linkState
      }: TableItem): TableItemProps => {
        return {
          ...tableItemDefaultProps,
          companyName: {
            ...tableItemDefaultProps.companyName,
            value: tab === 'Customer' ? vendor : company,
          },
          contactName: {
            ...tableItemDefaultProps.contactName,
            value: tab === 'Customer' ? contactName : "",
          },
          status: {
            ...tableItemDefaultProps.status,
            value: t(`application_page.status.${status}`),
          },
          createOn: {
            ...tableItemDefaultProps.createOn,
            value: createdOn,
          },
          assetName: {
            ...tableItemDefaultProps.assetName,
            value: asset,
          },
          cost: {
            ...tableItemDefaultProps.cost,
            value: cost,
          },
          onTableItemClicked: () => {
            history.push(link, { fromTab: tab,  ...linkState });
          },
        }
      }),
    };

    const tableProps: TableProps = {
      ...defaultProps,
      tableHeader: {
        ...defaultProps.tableHeader,
        companyName: {
          ...defaultProps.tableHeader.companyName,
          value: t('application_page.table_headers.company'),
        },
        contactName: {
          ...defaultProps.tableHeader.contactName,
          value: tab === 'Customer' ? t('application_page.table_headers.name') : '',
        },
        status: {
          ...defaultProps.tableHeader.status,
          value: t('application_page.table_headers.status'),
        },
        createOn: {
          ...defaultProps.tableHeader.createOn,
          value: t('application_page.table_headers.create_on'),
        },
        assetName: {
          ...defaultProps.tableHeader.assetName,
          value: t('application_page.table_headers.asset'),
        },
        cost: {
          ...defaultProps.tableHeader.cost,
          value: t('application_page.table_headers.cost'),
        },

      },
      tableItemList: tableItemListProps,
    };

    return <View
      {...props}
      {...tableProps}
      />;
  };
  return Presenter;
};
export default withPresenter;
