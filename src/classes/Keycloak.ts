import { KeyCloakOIDC } from '../interface/KeycloakOIDC';
import Auth from './Auth';
import User from './User';

class Keycloak {
  
  static config: KeyCloakOIDC;

  static redirect: string;

  /**
   * 
   * @param config 
   * @param redirect 
   */
  static init = (config: KeyCloakOIDC | null = null, redirect: string = ''): void => {
    if (config !== null) {
      Keycloak.config = config;
      Keycloak.redirect = redirect;
    }
  };

  /**
   * 
   * @returns Auth class
   */
  static auth = (): Auth => {
    const args = new Auth(Keycloak.config, Keycloak.redirect);

    return args;
  };

  /**
   * 
   * @param token 
   * @returns User class
   */
  static user = (token: string): User => {
    const args = new User(Keycloak.config, token);

    return args;
  };
}

export default Keycloak;

