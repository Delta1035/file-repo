import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { UtilsService } from '../utils/utils.service';
import { keycloakInitOptions } from '../configs/keycloak.config'

@Injectable({
    providedIn: 'root'
})
export class KeycloakService {

    private static keycloak = Keycloak(keycloakInitOptions);

    constructor(
        private utils: UtilsService,
    ) { }

    init() {
        return new Promise((resolved, reject) => {
            KeycloakService.keycloak.init({
                onLoad: 'login-required'
            }).then(auth => {
                if (!auth) {
                    reject('Authenticated Failed');
                } else {
                    const token = this.utils.deepClone(KeycloakService.keycloak.token);
                    const profile = this.utils.deepClone(KeycloakService.keycloak.idTokenParsed);
                    resolved({ token, profile });
                }
            }).catch(() => {
                reject('Authenticated Failed');
            });
        });
    }

    public logout() {
        KeycloakService.keycloak.logout();
    }

    public isAuth() {
        return KeycloakService.keycloak.authenticated;
    }
}
