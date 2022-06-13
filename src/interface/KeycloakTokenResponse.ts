export interface KeycloakTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_expires_in: number;
  session_state: string;
  scope: string;
}
