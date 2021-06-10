import axios from 'axios'
import i18next from 'i18next';
import { getServerUrl } from '../../lib/utils';
import { Quote, QuoteOption } from '../types';
import mockData from '../../components/blocks/QuoteBlock/mockData'

export type CreateQuotePayload = {
    userType: string, //replace with Customer | Vendor
    asset: string,
    applicationAmount: number,
    leaseType: string,
    contactName: string,
    contactEmail: string,
    vendorName: string,
    vendorEmail: string,
    vendorBusinessName: string,
    quoteOption: QuoteOption[]
}

//For view quote
export const getQuote = async(quoteId: number | string): Promise<Quote> => {
    try{
        //replace with server url when updated
        // const { data } = await axios.get<Quote>(`${getServerUrl}/quote/${quoteId}}`);
        return mockData as Quote;
        // return data as Quote
    }catch(error){
        if(axios.isAxiosError(error) && error.response){
            throw error;
        }
        throw error;
    }
}
