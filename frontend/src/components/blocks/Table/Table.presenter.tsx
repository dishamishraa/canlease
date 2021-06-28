import React, {useState} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TableProps, defaultProps } from './Table';
import { TableItemListProps } from '../../organisms/TableItemList';
import { TableItemProps } from '../../molecules/TableItem';
import Text, { TextProps } from '../../atoms/Text';
import TableItem, { defaultProps as TableItemDefaultProps } from '../../molecules/TableItem/TableItem';

export type TablePresenterProps = TableProps & {
    contentType?: string;
    searchQuery?: string;
    statusFilter?: string;
};

const withPresenter = (
  View: React.FC<TableProps>,
): React.FC<TablePresenterProps> => {
  const Presenter: React.FC<TablePresenterProps> = (props) => {
    const {
        contentType,
        searchQuery,
        statusFilter,
    } = props;
    const { t } = useTranslation();
    const tableItemArray: TableItemProps[] = [];
    let filteredTableItemArray: TableItemProps[] = [];
    let tableItemListProps: TableItemListProps = {};

    const quotes = [ 
        {
            companyName: "sdf",
            name: "asdf",
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
            quoteExpiryDate: "2021-06-25T19:53:52.343Z"
        },
        {
            companyName: "xxxx",
            name: "azf",
            quoteId: "string",
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
                const status = item.status.value.toLowerCase();
                const filter = statusFilter.toLowerCase();
                return status.includes(filter)
            })
        }
        if (searchQuery){
            filteredArray = filteredArray.filter((item) => {
                const itemCompanyName = item.companyName.value.toLowerCase();
                const itemContactName = item.contactName.value.toLowerCase();
                const itemStatus = item.status.value.toLowerCase();
                const itemCreateOn = item.createOn.value.toLowerCase();
                const itemAssetName = item.assetName.value.toLowerCase();
                const itemCost = item.cost.value.toString().toLowerCase();
                const search = searchQuery.toLowerCase();
                return itemCompanyName.includes(search) | itemContactName.includes(search) | itemStatus.includes(search) | itemCreateOn.includes(search) | itemAssetName.includes(search) | itemCost.includes(search);
            })
        }
        return filteredArray;
    }

    quotes.forEach((quote) => {
        const {companyName, name, applicationAmount} = quote
        const tableItemProps: TableItemProps = {
            companyName: {
                ...TableItemDefaultProps.companyName,
                value: companyName,
            },
            // contactName: contactNameTableItem,
            contactName:{
                ...TableItemDefaultProps.contactName,
                value: name,
            },
            status: {
                ...TableItemDefaultProps.status,
                value: "Expiring soon"
            },
            createOn: {
                ...TableItemDefaultProps.createOn,
                value: "test"
            },
            assetName: {
                ...TableItemDefaultProps.assetName,
                value: "test"
            },
            cost: {
                ...TableItemDefaultProps.cost,
                value: applicationAmount,
            },
        }
        tableItemArray.push(tableItemProps);
    })

    filteredTableItemArray = filterTableItems(tableItemArray, searchQuery, statusFilter)

    tableItemListProps = {
        tableItems: filteredTableItemArray,
    }

    //only show if its for a customer
    const contactName: TextProps = {
        ...defaultProps.tableHeader.contactName,
        value: t('application_page.table_headers.name'),
    }
    const contactNameTableItem: TextProps = {
        ...TableItemDefaultProps.contactName,
        value: "test"
    }

    const tableProps: TableProps = {
        ...defaultProps,
        tableHeader:{
            ...defaultProps.tableHeader,
            companyName: {
                ...defaultProps.tableHeader.companyName,
                value: t('application_page.table_headers.company'),
            },
            contactName,
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