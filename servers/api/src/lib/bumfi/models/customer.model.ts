export type CustomerArgs = {
  customer_ident?: string;
  discord?: string;
  email: string;
  name?: string;
  number?: string;
  twitter?: string;
  wallet_address?: string;
};

export type Customer = {
  created_at: string;
  deleted_at: string;
  email: string;
  id: string;
  metadata: object;
  name: string;
  org_id: string;
  phone: string;
  properties: object;
  reference: string;
  updated_at: string;
  v1: string;
  wallet_addresss: string;
};
