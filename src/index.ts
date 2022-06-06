import { KeyCloakOIDC } from './interface/KeycloakOIDC';
import fetch, { Response } from 'node-fetch';
import { KeycloakTokenResponse } from './interface/KeycloakTokenResponse';

class Login {
  config: KeyCloakOIDC;
  redirect: string;

  headers: {
    [key: string]: string;
  };

  getTokenUrl: string;
  getUserinfoUrl: string;
  getLogoutUrl: string;

  constructor(config: KeyCloakOIDC, redirect: string = '') {
    this.config = config;
    this.redirect = redirect;
    this.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    this.getTokenUrl = `${this.config['auth-server-url']}realms/${this.config.realm}/protocol/openid-connect/token`;
    this.getUserinfoUrl = `${this.config['auth-server-url']}realms/${this.config.realm}/protocol/openid-connect/userinfo`;
    this.getLogoutUrl = `${this.config['auth-server-url']}realms/${this.config.realm}/protocol/openid-connect/logout`;
  }

  createLoginString = (): string => {
    return `${this.config['auth-server-url']}realms/${this.config.realm}/protocol/openid-connect/auth?client_id=${
      this.config.resource
    }${
      this.redirect !== '' ? `&redirect_uri=${this.redirect}` : ''
    }&response_mode=query&response_type=code&scope=web-origins`;
  };

  getToken = async (code: string): Promise<KeycloakTokenResponse | unknown> => {
    this.headers = {};
    this.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

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

    const dataJson = await response.json();

    const data: KeycloakTokenResponse | unknown = dataJson;

    return data;
  };

  getUserInfo = async (token: string): Promise<any> => {
    this.headers = {};
    this.headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(this.getUserinfoUrl, {
      method: 'POST',
      headers: this.headers,
    });
    const data = await response.json();

    return data;
  };

  logout = async (refreshtoken: string): Promise<boolean> => {
    this.headers = {};
    this.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const formData = new URLSearchParams();

    formData.append('refresh_token', refreshtoken);
    formData.append('client_id', this.config.resource);

    await fetch(this.getLogoutUrl, {
      method: 'POST',
      body: formData.toString(),
      headers: this.headers,
    });

    return true;
  };
}

export default Login;
