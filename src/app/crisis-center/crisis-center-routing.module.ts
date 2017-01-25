
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrisisCenterHomeComponent } from './crisis-center-home.component';
import { CrisisCenterComponent } from './crisis-center.component';
import { CrisisListComponent } from './crisis-list.component';
import { CrisisDetailComponent } from './crisis-detail.component';



/** comments ** 
 * - Notice that the parent crisis-center route has a children property 
 *   with a single route containing the CrisisListComponent.
 * 
 * - The CrisisListComponent route also has a children array with two routes.
 *   These two routes navigate to the two Crisis Center child components,
 *   CrisisCenterHomeComponent and CrisisDetailComponent.
 * 
 *   The router displays the components of these routes in the RouterOutlet
 *   of the CrisisCenterComponent, not in the RouterOutlet of 
 *   the AppComponent shell.
 *   
 *   At the top level, paths that begin with / refer to the root of the application.
 *   But these are child routes. They extend the path of the parent route. 
 *   With each step down the route tree, you add a slash followed by the route path 
 *   (unless the route path is empty).
 * 
 *   For example, the parent path to the CrisisCenterComponent is /crisis-center 
 *   The router appends these child paths to the parent path to the 
 *   CrisisCenterComponent (/crisis-center).
 * 
 *   - to navigate to the CrisisCenterHomeComponent, the full URL is 
 *     /crisis-center (/crisis-center + '' + '').
 * 
 *   - to navigate to the CrisisDetailComponent for a crisis with id=2, 
 *     the full URL is /crisis-center/2 (/crisis-center + '' + '/2').
 */

import { CanDeactivateGuard }    from '../can-deactivate-guard.service';

import { CrisisDetailResolver }   from './crisis-detail-resolver.service';

const crisisCenterRoutes: Routes = [
  
  {
    path: '',
    component: CrisisCenterComponent,
    children: [
      {
        path: '',
        /**
         * The CrisisListComponent contains the crisis list and a RouterOutlet 
         * to display the Crisis Center Home and Crisis Detail route components.
         */
        component: CrisisListComponent,
        children: [
          {
            path: ':id',
            component: CrisisDetailComponent,
            canDeactivate: [CanDeactivateGuard],
            resolve: {
              crisis: CrisisDetailResolver
            }
          },
          {
            path: '',
            component: CrisisCenterHomeComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(crisisCenterRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CrisisDetailResolver 
    // The CrisisDetailComponent should no longer fetch the crisis.
  ]
})
export class CrisisCenterRoutingModule { }