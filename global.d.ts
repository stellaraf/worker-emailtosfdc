declare const AUTH_BASIC_USER: string;

declare const AUTH_BASIC_PASSWORD: string;

declare const SFDC_SUBMIT_URL: string;

declare const SFDC_ORG_ID: string;

declare const ENVIRONMENT: 'production' | 'development';

declare const EMAIL_TO_SFDC_ORG_MATCH: KVNamespace;

type TCaseStatus =
  | 'New'
  | 'Technician Assigned'
  | 'Discovering Solution'
  | 'Scheduled'
  | 'Implementing Solution'
  | 'Pending Customer Approval'
  | 'Escalated'
  | 'Awaiting Customer Response'
  | 'Customer Responded'
  | 'Closed'
  | 'Reopened'
  | 'Canceled';

type TCaseType = 'Request' | 'Incident' | 'Production Down';

interface IUserData {
  // Cloudflare object: country field
  Country: string;
  // Cloudflare object: asn field
  ASN: number;
  // Cloudflare object: colo field
  'Cloudflare Origin': string;
  // Parsed User-Agent browser information, if available
  Browser?: string;
  // Parsed User-Agent device information, if available
  Device?: string;
  // Parsed User-Agent OS information, if available
  OS?: string;
  // Raw User-Agent string, if the above 3 fields are not available/parsable
  'User Agent'?: string;
}

type TSFDCRequest = {
  // SFDC Organization ID
  orgid: string;
  // Case Status (initial)
  status: TCaseStatus;
  // Case Type
  type: TCaseType;
  // Contact First & Last Name
  name?: string;
  // Account Name
  company?: string;
  // Contact Email Address
  email?: string;
  // Contact Phone Number
  phone?: string;
  // Case Subject
  subject?: string;
  // Case Description
  description?: string;
  // Custom field `Case__Comment`
  '00N3j00000FccHG'?: string;
  // Enable SFDC debugging
  debug?: 1;
  // Email to receive debugging reports
  debugEmail?: string;
};
