import { Component, NgZone, OnInit } from '@angular/core';
import { KeycloakService } from './services/keycloak.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'keyclock-ng-demo';

  constructor(private keycloakService: KeycloakService) {
    this.keycloakService.init();
  }
  ngOnInit(): void {

  }
}
