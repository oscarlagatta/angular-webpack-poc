import { NgModule }              from '@angular/core';
import { RouterModule, Routes, PreloadAllModules }  from '@angular/router';
import { CrisisListComponent }   from './crisis-list.component';
import { HeroListComponent }     from './heroes/hero-list.component';
import { PageNotFoundComponent } from './not-found.component';
import { ComposeMessageComponent } from './compose-message.component';
import { AuthGuard }                from './auth-guard.service';
import { CanDeactivateGuard }      from './can-deactivate-guard.service';
//import { SelectivePreloadingStrategy }   from './selective-preloading-strategy';


const appRoutes: Routes = [
  //  {
  //   path: 'compose',
  //   component: ComposeMessageComponent,
  //   outlet: 'popup'
  // },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'crisis-center',
    loadChildren: './crisis-center/crisis-center.module#CrisisCenterModule',
    data: { preload: true }
  },
  // { path: 'crisis-center', component: CrisisListComponent },
  /**
   * Since the Heroes routes are defined within the feature module, 
   * you can also remove the initial heroes route from the 
   * app-routing.module.ts
   */
  // { path: 'heroes',        component: HeroListComponent },
  { path: '',   redirectTo: '/heroes', pathMatch:  'full' },
  { path: '**', component: PageNotFoundComponent }
//   ,
//   {
//   path: 'compose',
//   component: ComposeMessageComponent,
//   outlet: 'popup'
// },
];

@NgModule({
  imports: [
    // To enable preloading of all lazy loaded modules, 
    // import the PreloadAllModules token from the Angular router package.
    RouterModule.forRoot(
      appRoutes
       , { preloadingStrategy: PreloadAllModules })
  ],
  exports: [
    RouterModule
  ],
  providers: [
    /**
     * Add the Guard to the main AppRoutingModule providers
     * so the Router can inject it during the navigation process.
     */
    CanDeactivateGuard
    //,
    //SelectivePreloadingStrategy
  ]
})

export class AppRoutingModule {}
