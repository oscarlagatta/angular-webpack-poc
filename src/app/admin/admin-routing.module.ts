import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ManageCrisesComponent } from './manage-crises.component';
import { ManageHeroesComponent } from './manage-heroes.component';
import { AdminDashboardComponent } from './admin-dashboard.component';

/**
 * Looking at the child route under the AdminComponent,there is a path and a children property 
 * but it's not using a component. We haven't made a mistake in the configuration. 
 * You've defined a component-less route.
 * The goal is to group the Crisis Center management routes under the admin path. 
 * You don't need a component to do it. 
 * 
 * A component-less route makes it easier to guard child routes.
 * 
*/

import { AuthGuard }  from '../auth-guard.service';


const adminRoutes: Routes = [
  {
      path: 'admin',
      // When the router navigates to this route, it uses the loadChildren string 
      // to dynamically load the AdminModule.
      loadChildren: './admin.module#AdminModule',
      canLoad: [AuthGuard]
  },
  {
    /**
     * The Router supports empty path routes; use them to group routes together 
     * without adding any additional path segments to the URL.
     * Users will still visit /admin and the AdminComponent still serves 
     * as the Routing Component containing child routes.
     * 
     * We change the admin path in the admin-routing.module.ts from 'admin' to an empty string,
     * '', the empty path.
     * 
     * NOTE
     * Angular provides a built-in module loader that supports SystemJS to load modules 
     * asynchronously. If we were using another bundling tool, such as Webpack , we would use 
     * the Webpack mechanism for asynchronously loading modules.
     */
    
    //path: 'admin',
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {

        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'crises', component: ManageCrisesComponent },
          { path: 'heroes', component: ManageHeroesComponent },
          { path: '', component: AdminDashboardComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}
