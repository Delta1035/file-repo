import {registerAuthenticationStrategy} from '@loopback/authentication';
import {
  Application,
  Binding,
  Component,
  CoreBindings,
  inject
} from '@loopback/core';
import {SERVICE_BINDING} from '../token/constant';
import {JwtService} from '../token/jwt.service';
import {JwtAuthenticationStrategy} from './jwt.authentication.strategy';


/**
 * 認證元件
 */
export class JWTAuthenticationComponent implements Component {
  /**
   * 實例綁定（JwtService是TokenService子項）
   * @memberof JWTAuthenticationComponent
   */
  public bindings: Binding[] = [
    Binding.bind(SERVICE_BINDING).toClass(JwtService),
  ];

  /**
   * @param app APP程式進入點
   */
  constructor(@inject(CoreBindings.APPLICATION_INSTANCE) app: Application) {
    registerAuthenticationStrategy(app, JwtAuthenticationStrategy);
  }
}
