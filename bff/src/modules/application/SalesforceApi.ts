import axios from 'axios';
import { SALESFORCE_API_URL } from '../../lib/config';

import { CreateApplication } from './types';

export default class SalesforceApi {
  async createApplication(payload: CreateApplication): Promise<void> {
    try {
      await axios.post<void>(
        `${SALESFORCE_API_URL}/v2/credit_apps`,
        {
          properties: {
            leasePortalId: payload.leasePortalId,
            operatingName: payload.operatingName,
            businessName: payload.businessName,
            businessType: payload.businessType,
            yearsInBusiness: payload.yearsInBusiness,
            contactName: payload.contactName,
            contactEmail: payload.contactEmail,
            contactPhone: payload.contactPhone,
            contactWebsite: payload.contactWebsite,
            street: payload.street,
            city: payload.city,
            province: payload.province,
            postalCode: payload.postalCode,
            term: payload.term,
            applicationAmount: payload.applicationAmount,
            asset: payload.asset,
            condition: payload.condition,
            ageOfAsset: payload.ageOfAsset,
            businessOwnerName: payload.businessOwnerName,
            businessOwnerStreet: payload.businessOwnerStreet,
            businessOwnerCity: payload.businessOwnerCity,
            bankruptcy: payload.bankruptcy,
            creditCheckConsent: payload.creditCheckConsent,
            sin: payload.sin,
            dob: payload.dob,
            vendorPortalId: payload.vendorPortalId,
            quoteId: payload.quoteId,
            expectedDeliveryDate: payload.expectedDeliveryDate,
            bankruptcyDetails: payload.bankruptcyDetails
          },
        },
      );
    } catch (error) {
      return error.message;
    }
  }
}
