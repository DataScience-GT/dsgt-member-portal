export interface BillingDetails {
  address: {
    city: string;
    country: string;
    line1: string;
    line2?: string;
    postal_code: number | string;
    state: string;
  };
  email: string;
  name: string;
  phone?: string;
}
