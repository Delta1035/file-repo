import {registerAuthenticationStrategy} from '@loopback/authentication';
import {
  Application,
  Binding,
  Component,
  CoreBindings,
  inject,
} from '@loopback/core';
import {JwtAuthenticationStrategy} from './authentication.strategy';
import {KeycloakApiProvider} from './keycloak/keycloak-api.provider';
import {KeycloakService} from './keycloak/keycloak.service';
import {KeycloakServiceConstant} from './keycloak/keycloak.service.constant';
import {JwtService} from './token/jwt.service';
import {TokenServiceConstant} from './token/token.service.constant';

/**
 * 認證元件
 */
export class AuthenticationComponent implements Component {
  /**
   * 服務綁定
   *
   * @memberof AuthenticationComponent
   */
  public bindings: Binding[] = [
    // 请求keycloak服务的接口
    Binding.bind(KeycloakServiceConstant.SERVICE_INJECT).toProvider(
      KeycloakApiProvider,
    ),
    Binding.bind(KeycloakServiceConstant.SERVICE_BINDING).toClass(
      KeycloakService,
    ),
    // jwt服务
    Binding.bind(TokenServiceConstant.SERVICE_BINDING).toClass(JwtService),
    Binding.bind(TokenServiceConstant.TOKEN_SECRET).to(
      TokenServiceConstant.TOKEN_SECRET_VALUE,
    ),
    Binding.bind(TokenServiceConstant.TOKEN_EXPIRES_IN).to(
      TokenServiceConstant.TOKEN_EXPIRES_IN_VALUE,
    ),
  ];

  /**
   * @param app APP程式進入點
   */
  constructor(@inject(CoreBindings.APPLICATION_INSTANCE) app: Application) {
    registerAuthenticationStrategy(app, JwtAuthenticationStrategy);
  }
}
