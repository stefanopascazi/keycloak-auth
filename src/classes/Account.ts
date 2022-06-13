import { KeyCloakOIDC } from '../interface/KeycloakOIDC';

class Account {
  config: KeyCloakOIDC;

  redirect: string;

  /**
   *
   * @param config KeyCloakOIDC json config
   * @param redirect
   */
  constructor(config: KeyCloakOIDC, redirect: string = '') {
    this.config = config;
    this.redirect = redirect;
  }

  /**
   *
   * @returns url to access account page
   */
  getUrl = (): string => {
    return `${this.config['auth-server-url']}realms/${this.config.realm}/account/${
      this.redirect !== '' ? `?referrer=${this.config.resource}&referrer_uri=${this.redirect}` : ''
    }`;
  };
}

export default Account;
