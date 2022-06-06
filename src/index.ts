import { KeyCloakOIDC } from './interface/KeycloakOIDC';

export const CreateLoginString = (config: KeyCloakOIDC, redirect: string = ''): string => {
  return `${config['auth-server-url']}/realms/${config.realm}/protocol/openid-connect/auth?client_id=${
    config.resource
  }${redirect !== '' ? `&redirect_uri=${redirect}` : ''}&response_mode=query&response_type=code&scope=web-origins`;
};
