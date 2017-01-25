import { Component } from '@angular/core';
/**
 * The AppComponent imports the application-wide css 
 * with a simple import statement.
 */
/**
 * The AppComponent itself has its own html template and css file. 
 * WebPack loads them with calls to require(). 
 * Webpack stashes those component-scoped files in the app.js bundle too. 
 * We don't see those calls in our source code; 
 * they're added behind the scenes by the angular2-template-loader plug-in.
 */
import '../../public/css/styles.css';


/**
 * The root AppComponent is the application shell. 
 * It has a title at the top, a navigation bar 
 * with two links, and a router outlet at the bottom where 
 * the router swaps views on and off the page.
 */


@Component({
  selector: 'my-app',
  template: `
    <h1 class="title">Harvey Nichols' Router</h1>
    <nav>
      <a routerLink="/crisis-center" routerLinkActive="active">Crisis Center</a>
      <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
      <a routerLink="/admin" routerLinkActive="active">Admin</a>
      <a routerLink="/login" routerLinkActive="active">Login</a>
      <a [routerLink]="[{ outlets: { popup: ['compose'] } }]">Contact</a>
    </nav>
    <router-outlet></router-outlet>
    <router-outlet name="popup"></router-outlet>
  `
})
export class AppComponent {
}
