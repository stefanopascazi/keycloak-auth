export interface Credentials {
  secret: string;
}

export interface KeyCloakOIDC {
  realm: string;
  'auth-server-url': string;
  'ssl-required': string;
  resource: string;
  credentials: undefined | Credentials;
  'confidential-port': number;
  'public-client': undefined | boolean;
}
