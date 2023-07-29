import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {KeycloakDataSource} from '../datasources';
// 登陆后keycloak服务器的响应
export interface LoginResponse {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  access_token: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  expires_in: 300;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  refresh_expires_in: 1800;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  refresh_token: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  token_type: 'bearer';
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'not-before-policy': 0;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  session_state: string;
  scope: string;
}
export interface KeycloakApi {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  login(username: string, password: string): Promise<LoginResponse>;
}

export class KeycloakApiProvider implements Provider<KeycloakApi> {
  constructor(
    // keycloak must match the name property in the datasource json file
    @inject('datasources.keycloak')
    protected dataSource: KeycloakDataSource = new KeycloakDataSource(),
  ) {}

  value(): Promise<KeycloakApi> {
    return getService(this.dataSource);
  }
}
