import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  keycloak: Keycloak;

  constructor() {
    this.keycloak = new Keycloak({
      url: 'http://127.0.0.1:8080/auth',
      realm: 'myrealm',
      clientId: 'myclient',
    });
  }

  logout() {
    this.keycloak.logout();
  }

  init() {
    this.keycloak
      .init({
        onLoad: 'login-required',
      })
      .then((authenticated) => {
        if (!authenticated) {
          window.location.reload();
        } else {
          console.log('Authenticated :>> 已认证', authenticated);
        }
        setInterval(() => {
          console.log(Date.now());
          this.update();
        }, 5000);
        console.log(authenticated ? 'authenticated' : 'not authenticated');
      })
      .catch(function () {
        console.log('failed to initialize');
      });
  }

  private update() {
    this.keycloak
      .updateToken(75)
      .then((refreshed: boolean) => {
        if (refreshed) {
          console.log('token refreshed', refreshed);
        } else {
          // 表示access token的有效时间,默认是300s
          if (this.keycloak.timeSkew && this.keycloak.tokenParsed?.exp) {
            console.log(
              'Token not refreshed, valid for ' +
                Math.round(
                  this.keycloak.tokenParsed.exp +
                    this.keycloak.timeSkew -
                    new Date().getTime() / 1000
                ) +
                ' seconds'
            );
          }
        }
      })
      .catch(() => {
        console.log('failed to refresh token');
      });
  }


}
