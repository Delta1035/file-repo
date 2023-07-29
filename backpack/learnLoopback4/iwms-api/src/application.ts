import {AuthenticationComponent} from '@loopback/authentication';
import {JWTAuthenticationComponent} from '@loopback/authentication-jwt';
import {AuthorizationComponent} from '@loopback/authorization';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';

import {AuthenticationComponent as JwtAuthenticationComponent} from './components/authentication/authentication.component';
import {AuthorizationComponent as KeycloakAuthorizationComponent} from './components/authorization/authorization.component';

export {ApplicationConfig};

export class IwmsDashboardApiApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    //绑定原生的AuthenticationComponent、AuthorizationComponent
    this.component(AuthenticationComponent);
    this.component(AuthorizationComponent);
    //SwagerUI
    this.component(JWTAuthenticationComponent);
    //绑定自定义的AuthenticationComponent、AuthorizationComponent
    this.component(JwtAuthenticationComponent);
    this.component(KeycloakAuthorizationComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
