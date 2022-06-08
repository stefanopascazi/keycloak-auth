import { KeyCloakOIDC } from '../interface/KeycloakOIDC';
import Auth from './Auth';
import User from './User';

class Keycloak {
  static config: KeyCloakOIDC;

  static redirect: string;

  static init = (config: KeyCloakOIDC | null = null, redirect: string = ''): void => {
    if (config !== null) {
      Keycloak.config = config;
      Keycloak.redirect = redirect;
    }
  };

  static auth = (): Auth => {
    const args = new Auth(Keycloak.config, Keycloak.redirect);

    return args;
  };

  static user = (token: string): User => {
    const args = new User(Keycloak.config, token);

    return args;
  };
}

export default Keycloak;
