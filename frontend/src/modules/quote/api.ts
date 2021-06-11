import axios from 'axios'
import i18next from 'i18next';
import { getServerUrl } from '../../lib/utils';
import { Quote, QuoteOption } from '../types';

//For view quote
export const getQuote = async(quoteId: number | string): Promise<Quote> => {
    try{
        const { data } = await axios.get<Quote>(`${getServerUrl}/quote/${quoteId}}`);
        return data as Quote
    }catch(error){
        if(axios.isAxiosError(error) && error.response){
            throw error;
        }
        throw error;
    }
}
