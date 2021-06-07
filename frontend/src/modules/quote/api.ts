import axios from 'axios'
import i18next from 'i18next';
import { getServerUrl } from '../../lib/utils';
import { Quote, QuoteOption } from '../types';

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
export const getQuote = async(portalId: number | string): Promise<Quote | Error> => {
    try{
        //replace with server url when updated
        const { data } = await axios.get<Quote>(`${getServerUrl}/quotes/${portalId}}`);
        return data as Quote;
    }catch(error){
        if(axios.isAxiosError(error) && error.response){
            throw error;
        }
        throw error;
    }
}
