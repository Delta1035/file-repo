import {AuthenticationComponent} from '@loopback/authentication';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {JWTAuthenticationComponent} from './components/authentication/jwt-authentication-component';
import {MySequence} from './sequence';

export {ApplicationConfig};

export class TodoApplication extends BootMixin(
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
    // Mount authentication system
    // 将认证部分粘连在一起
    this.component(AuthenticationComponent);
    // Mount jwt component(扩展认证功能,验证用户身份)
    /**
     * 1. jwt strategy  => decode user profile
     * 2. user service
     * 3. token service
     */
    this.component(JWTAuthenticationComponent);
    // Bind datasource
    // this.dataSource(DbDataSource, UserServiceBindings.DATASOURCE_NAME);
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
