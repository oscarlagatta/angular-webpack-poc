/**
 * The CrisisCenterComponent is much like the AppComponent shell.
 * It is the root of the Crisis Center area just as AppComponent 
 * is the root of the entire application.
 * It is a shell for the crisis management feature area just as 
 * the AppComponent is a shell to manage the high-level workflow.
 * It is dead simple — simpler even than the AppComponent template. 
 * It has no content, no links, just a <router-outlet> for the
 * Crisis Center child views.
 * 
*/
import { Component} from '@angular/core';
@Component({
  template:  `
    <h2>Harvey Nichols' Crisis Center</h2>

    <!-- The CrisisCenterComponent is a Routing Component 
         It has its own RouterOutlet and its own child routes.
         
         -->

    <router-outlet></router-outlet>
  `
})
export class CrisisCenterComponent { }

