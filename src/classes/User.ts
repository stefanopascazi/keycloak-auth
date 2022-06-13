import { KeyCloakOIDC } from '../interface/KeycloakOIDC';
import fetch, { Response } from 'node-fetch';
import { KeycloakUser } from '../interface/KeycloakUser';

class User {
  config: KeyCloakOIDC;
  token: string;

  headers: {
    [key: string]: string;
  };

  getUserinfoUrl: string;

  /**
   *
   * @param config
   * @param token
   */
  constructor(config: KeyCloakOIDC, token: string = '') {
    this.config = config;
    this.token = token;
    this.headers = {
      Accept: '*/*',
      Authorization: 'Bearer ' + token,
    };

    this.getUserinfoUrl = `${this.config['auth-server-url']}realms/${this.config.realm}/protocol/openid-connect/userinfo`;
  }

  /**
   *
   * @returns user collection
   */
  getInfo = async (): Promise<any> => {
    const response: Response = await fetch(this.getUserinfoUrl, {
      method: 'POST',
      headers: this.headers,
    });
    const data: KeycloakUser = await response.json();

    return data;
  };
}

export default User;
