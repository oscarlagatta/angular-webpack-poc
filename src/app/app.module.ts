import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }          from '@angular/forms';
import { AppComponent } from './app.component';

import { CrisisListComponent  } from './crisis-list.component';
import { HeroListComponent } from './heroes/hero-list.component';
import { AppRoutingModule} from './app-routing.module';
import { HeroesModule} from './heroes/heroes.module';
import { CrisisCenterModule } from './crisis-center/crisis-center.module';
import { PageNotFoundComponent} from './not-found.component';

import { ComposeMessageComponent} from './compose-message.component';

import { LoginRoutingModule }      from './login-routing.module';
import { LoginComponent }          from './login.component';

import { AdminModule }             from './admin/admin.module';

import { DialogService }           from './dialog.service';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HeroesModule,
    LoginRoutingModule,
    //CrisisCenterModule,
    AdminModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    // Remove the HeroListComponent from the AppModule's declarations
    // because it's now provided by the HeroesModule. 
    // This is important. 
    // There can be only one owner for a declared component.
    // *******************
    // HeroListComponent,
    // *******************
    // In this case, the Heroes module is the owner 
    // of the Heroes components and is making them available 
    // to components in the AppModule via the HeroesModule.
    /**
     * As a result, the AppModule no longer has specific knowledge 
     * of the hero feature, its components, or its route details. 
     * We can evolve the hero feature with more components and different routes. 
     * That's a key benefit of creating a separate module for each feature area.
     */
    //ComposeMessageComponent,
    CrisisListComponent,
    LoginComponent,
    PageNotFoundComponent
   
  ],
  providers: [
    DialogService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
