export type User = {
  id: number;
  uuid: string;
  accountId: number;
};

export type Account = {
  id: number;
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
};

export type ServiceErrorResponse = {
  code: number;
  type: string;
  message: string;
};

export type EquipmentLeaseInfo = {
  name?: string,
  cost?: string,
  leaseType?: string,
}

export type ContactInfoVendor = {
  vendorName?: string,
  businessEmail?: string,
  companyName?: string,
  customerName?: string,
  customerEmail?: string,
  customerCompanyName?: string,
}

export type ContactInfoCustomer = {
  customerName?: string,
  customerEmail?: string,
  customerCompanyName?: string,
}

export type ContactInfo = ContactInfoVendor | ContactInfoCustomer;
