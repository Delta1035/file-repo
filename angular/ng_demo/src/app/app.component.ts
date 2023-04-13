import { Component, Inject, OnInit } from '@angular/core';
import { AppConfig, APP_CONFIG } from './token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(@Inject(APP_CONFIG) config: AppConfig) {}
  ngOnInit(): void {}
}
