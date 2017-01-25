/**
 * Put the Routing Module file in the same folder as its companion module file. 
 * Here both heroes-routing.module.ts and heroes.module.ts are in the same 
 * app/heroes folder.
 * 
 * We recommend giving each feature module its own route configuration file.
 * It may seem like overkill early when the feature routes are simple.
 * But routes have a tendency to grow more complex and 
 * consistency in patterns pays off over time.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroListComponent} from './hero-list.component';
import { HeroDetailComponent } from './hero-detail.component';

const heroesRoutes: Routes = [
  { path: 'heroes',  component: HeroListComponent },
  { path: 'hero/:id', component: HeroDetailComponent }
];

@NgModule({
    imports: [
        // registers the routes with the RouterModule
        // bia the RouterModule.
        // The small but critical difference now in a 
        // feature module we must use static forChild method.
        RouterModule.forChild(heroesRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class HeroRoutingModule {}