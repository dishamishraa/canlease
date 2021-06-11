import axios from 'axios'
import { Quote } from './types';
import { CreateQuotePayload } from './types';
import { getServerUrl } from '../../lib/utils';


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
