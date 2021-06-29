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
    tab?: string;
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

 
    if (customerPortfolio){
        console.log(customerPortfolio)
    }
    if (personalPortfolio){
        console.log(personalPortfolio)
    }
 

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
            return "Applied"
        }
        else if (isExpired(quoteExpiryDate)) {
            return  "Expired"
        }
        else if(isExpiring(quoteExpiryDate)){
            return "Expiring soon"
        } else {
            return "Active"
        }
    }

    const checkCreatedOn = (quoteExpiryDate) => {
        return createdOn(quoteExpiryDate)
    }

    const quotes = [ 
        {
            quoteId: "string",
            asset: "string",
            applicationAmount: 0,
            quoteOptions: [
              {
                monthlyAmount: 0,
                term: "12M",
                financeRate: 0,
                purchaseOptionDate: "2021-06-25T19:53:52.343Z"
              }
            ],
            quoteExpiryDate: "2021-08-25T19:53:52.343Z"
        },
        {
            quoteId: "id",
            asset: "string",
            applicationAmount: 100,
            quoteOptions: [
              {
                monthlyAmount: 0,
                term: "12M",
                financeRate: 0,
                purchaseOptionDate: "2021-06-25T19:53:52.343Z"
              }
            ],
            quoteExpiryDate: "2021-06-25T19:53:52.343Z"
        }
    ]

    const filterTableItems = (itemsArray, searchQuery, statusFilter) => {
        let filteredArray = itemsArray;
        if(!searchQuery && statusFilter === "All"){
            return itemsArray;
        } 
        if (statusFilter != "All"){
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
                return itemCompanyName?.includes(search) | itemContactName?.includes(search) | itemStatus?.includes(search) | itemCreateOn?.includes(search) | itemAssetName?.includes(search) | itemCost?.includes(search);
            })
        }
        return filteredArray;
    }
    if (tab === 'Customer') {
        quotes.forEach((quote) => {
            const {applicationAmount, quoteExpiryDate, quoteId, asset} = quote
            const tableItemProps: TableItemProps = {
                companyName: {
                    ...TableItemDefaultProps.companyName,
                    value: "company",
                },
                contactName:{
                    ...TableItemDefaultProps.contactName,
                    value: "name",
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
                    history.push(`/portal/viewquote/${quoteId}`)
                }
            }
            tableItemArray.push(tableItemProps);
        })
    }
    if (tab === 'Personal') {
        quotes.forEach((quote) => {
            const {applicationAmount, quoteExpiryDate, asset, quoteId} = quote
            const tableItemProps: TableItemProps = {
                companyName: {
                    ...TableItemDefaultProps.companyName,
                    value: "company",
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
                    history.push(`/portal/viewquote/${quoteId}`)
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
                value: tab === "Customer" ? t('application_page.table_headers.name'): "",
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