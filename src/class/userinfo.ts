import { KeyCloakOIDC } from '../interface/KeycloakOIDC';
import fetch, { Response } from 'node-fetch';

class Userinfo {
  config: KeyCloakOIDC;
  redirect: string;
  token: string;

  headers: {
    [key: string]: string;
  };

  getUserinfoUrl: string;

  constructor(config: KeyCloakOIDC, redirect: string = '', token: string = '') {
    this.config = config;
    this.redirect = redirect;
    this.token = token;
    this.headers = {
      Accept: '*/*',
      Authorization: 'Bearer ' + token,
    };

    this.getUserinfoUrl = `${this.config['auth-server-url']}realms/${this.config.realm}/protocol/openid-connect/userinfo`;
  }

  getUserInfo = async (): Promise<any> => {
    const response = await fetch(this.getUserinfoUrl, {
      method: 'POST',
      headers: this.headers,
    });
    const data = await response.json();

    return data;
  };
}

export default Userinfo;
