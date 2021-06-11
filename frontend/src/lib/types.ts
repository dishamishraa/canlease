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
  name?: String,
  cost?: String,
  leastType?: String,
}

export type ContactInfoVendor = {
  vendorName?: String,
  businessEmail?: String,
  companyName?: String,
  customerName?: String,
  customerEmail?: String,
  customerCompanyName?: String,
}

export type ContactInfoCustomer = {
  customerName?: String,
  customerEmail?: String,
  customerCompanyName?: String,
}

export type ContactInfo = ContactInfoVendor | ContactInfoCustomer;
