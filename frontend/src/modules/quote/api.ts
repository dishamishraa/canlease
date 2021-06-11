import axios from 'axios'
import i18next from 'i18next';
import { getServerUrl } from '../../lib/utils';
import { Quote } from '../types';
import { CreateQuotePayload } from '../types';

export const createQuote = async(payload: CreateQuotePayload): Promise<Quote> => {
    try{
        const { data } = await axios.post<Quote>(`${getServerUrl}/v2/quote`, payload, { withCredentials: true });
        return data as Quote
    }catch(error){
        if(axios.isAxiosError(error) && error.response){
            throw error;
        }
        throw error;
    }
}

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
