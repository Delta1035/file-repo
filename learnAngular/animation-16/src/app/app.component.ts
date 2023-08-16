import { Component } from '@angular/core';
import { routes } from './app-routing.module';
import { ChildrenOutletContexts,RouterOutlet } from '@angular/router';
import { slideInAnimation } from './shared/animations/slide-in.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {
  constructor(private contexts: ChildrenOutletContexts) { }
  getRouteAnimationData () {
    return this.contexts.getContext('primary')?.route?.snapshot.data['animation'];
  }
  prepareRoute (outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData;
  }
  title = 'animation-16';
  routes = routes;
}
