import { KeyCloakOIDC } from './interface/KeycloakOIDC';
import fetch, { Response } from 'node-fetch';

export default class KeycloakLogin {
  config: KeyCloakOIDC;
  redirect: string;

  headers: {
    [key: string]: string;
  };

  getTokenUrl: string;

  constructor(config: KeyCloakOIDC, redirect: string = '') {
    this.config = config;
    this.redirect = redirect;
    this.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    this.getTokenUrl = `${this.config['auth-server-url']}realms/${this.config.realm}/protocol/openid-connect/token`;
  }

  createLoginString = (): string => {
    return `${this.config['auth-server-url']}realms/${this.config.realm}/protocol/openid-connect/auth?client_id=${
      this.config.resource
    }${
      this.redirect !== '' ? `&redirect_uri=${this.redirect}` : ''
    }&response_mode=query&response_type=code&scope=web-origins`;
  };

  getToken = async (code: string): Promise<any> => {
    const formData = new URLSearchParams();

    formData.append('grant_type', 'authorization_code');
    formData.append('client_id', this.config.resource);
    formData.append('code', code);
    formData.append('redirect_uri', this.redirect);

    if (typeof this.config.credentials !== 'undefined') {
      formData.append('secret', this.config.credentials.secret);
    }

    const response: Response = await fetch(this.getTokenUrl, {
      method: 'POST',
      headers: this.headers,
      body: formData.toString(),
    });

    const data = await response.json();

    return data;
  };
}