import React, {useState} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TableProps, defaultProps } from './Table';
import { TableItemListProps } from '../../organisms/TableItemList';
import { TableItemProps } from '../../molecules/TableItem';
import Text, { TextProps } from '../../atoms/Text';
import TableItem, { defaultProps as TableItemDefaultProps } from '../../molecules/TableItem/TableItem';
import { isExpiring, isExpired, createdOn} from '../../../lib/utils';
import { Portfolio, Quote } from '../../../modules/types';

export type TablePresenterProps = TableProps & {
    contentType?: string;
    searchQuery?: string;
    statusFilter?: string;
    tab?: 'Customer' | 'Personal';
    personalQuotes: Quote[] | null;
    customerQuotes: Quote[] | null;
    personalPortfolio: Portfolio | null;
    customerPortfolio: Portfolio | null;
};

const withPresenter = (
  View: React.FC<TableProps>,
): React.FC<TablePresenterProps> => {
  const Presenter: React.FC<TablePresenterProps> = (props) => {
    const {
        contentType,
        searchQuery,
        statusFilter,
        personalQuotes,
        customerQuotes,
        personalPortfolio,
        customerPortfolio,
        tab,
    } = props;
    const { t } = useTranslation();
    const history = useHistory();
    const tableItemArray: TableItemProps[] = [];
    let filteredTableItemArray: TableItemProps[] = [];
    let tableItemListProps: TableItemListProps = {};
 
    const checkStatus = (quoteExpiryDate, tab, quoteId) => {
        let isApplied;
        if (tab === 'Customer' && customerPortfolio) {
            const { createApps } = customerPortfolio
            isApplied = createApps.some(function(el) {
                return el.quoteId === quoteId;
            })
        }
        else if (personalPortfolio){
            const { createApps } = personalPortfolio
            isApplied = createApps.some(function(el) {
                return el.quoteId === quoteId;
            })
        }
        if(isApplied){
            return t('application_page.status.applied')
        }
        else if (isExpired(quoteExpiryDate)) {
            return  t('application_page.status.expired')
        }
        else if(isExpiring(quoteExpiryDate)){
            return t('application_page.status.expiring_soon')
        } else {
            return t('application_page.status.active')
        }
    }

    const checkCreatedOn = (quoteExpiryDate) => {
        return createdOn(quoteExpiryDate).toDateString();
    }

    const filterTableItems = (itemsArray, searchQuery, statusFilter) => {
        let filteredArray = itemsArray;
        if(!searchQuery && statusFilter === 'All'){
            return itemsArray;
        } 
        if (statusFilter != 'All'){
            filteredArray = filteredArray.filter((item) => {
                const status = item.status?.value.toLowerCase();
                const filter = statusFilter.toLowerCase();
                return status?.includes(filter)
            })
        }
        if (searchQuery){
            filteredArray = filteredArray.filter((item) => {
                const itemCompanyName = item.companyName?.value.toLowerCase();
                const itemContactName = item.contactName?.value.toLowerCase();
                const itemStatus = item.status?.value.toLowerCase();
                const itemCreateOn = item.createOn?.value.toLowerCase();
                const itemAssetName = item.assetName?.value.toLowerCase();
                const itemCost = item.cost?.value.toString().toLowerCase();
                const search = searchQuery.toLowerCase();
                return itemCompanyName?.includes(search) || itemContactName?.includes(search) || itemStatus?.includes(search) || 
                        itemCreateOn?.includes(search) || itemAssetName?.includes(search) || itemCost?.includes(search);
            })
        }
        return filteredArray;
    }
    if (tab === 'Customer' && customerQuotes) {
        customerQuotes.forEach((quote) => {
            const {applicationAmount, quoteExpiryDate, quoteId, asset} = quote
            const tableItemProps: TableItemProps = {
                companyName: {
                    ...TableItemDefaultProps.companyName,
                    value: 'company',
                },
                contactName:{
                    ...TableItemDefaultProps.contactName,
                    value: 'name',
                },
                status: {
                    ...TableItemDefaultProps.status,
                    value: checkStatus(quoteExpiryDate, tab, quoteId),
                },
                createOn: {
                    ...TableItemDefaultProps.createOn,
                    value: checkCreatedOn(quoteExpiryDate),
                },
                assetName: {
                    ...TableItemDefaultProps.assetName,
                    value: asset,
                },
                cost: {
                    ...TableItemDefaultProps.cost,
                    value: applicationAmount,
                },
                onTableItemClicked: () => {
                    history.push(`/portal/content/quote/${quoteId}`)
                }
            }
            tableItemArray.push(tableItemProps);
        })
    }
    if (tab === 'Personal' && personalQuotes) {
        personalQuotes.forEach((quote) => {
            const {applicationAmount, quoteExpiryDate, asset, quoteId} = quote
            const tableItemProps: TableItemProps = {
                companyName: {
                    ...TableItemDefaultProps.companyName,
                    value: 'company',
                },
                status: {
                    ...TableItemDefaultProps.status,
                    value: checkStatus(quoteExpiryDate, tab, quoteId),
                },
                createOn: {
                    ...TableItemDefaultProps.createOn,
                    value: checkCreatedOn(quoteExpiryDate),
                },
                assetName: {
                    ...TableItemDefaultProps.assetName,
                    value: asset,
                },
                cost: {
                    ...TableItemDefaultProps.cost,
                    value: applicationAmount,
                },
                onTableItemClicked: () => {
                    history.push(`/portal/content/quote/${quoteId}`)
                }
            }
            tableItemArray.push(tableItemProps);
        })
    }
    
    filteredTableItemArray = filterTableItems(tableItemArray, searchQuery, statusFilter)

    tableItemListProps = {
        tableItems: filteredTableItemArray,
    }

    const tableProps: TableProps = {
        ...defaultProps,
        tableHeader:{
            ...defaultProps.tableHeader,
            companyName: {
                ...defaultProps.tableHeader.companyName,
                value: t('application_page.table_headers.company'),
            },
            contactName: {
                ...defaultProps.tableHeader.contactName,
                value: tab === 'Customer' ? t('application_page.table_headers.name'): '',
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
            }

        },
        tableItemList: tableItemListProps,
    }

    return <View
        {...tableProps}
        />;
  };
  return Presenter;
};
export default withPresenter;