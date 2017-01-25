
/**
 * Create a guard that checks for the presence of a canDeactivate method in a component;
 * any component. The CrisisDetailComponent will have this method. 
 * But the guard doesn't have to know that. 
 * The guard shouldn't know the details of any component's deactivation method. 
 * It need only detect that the component has a canDeactivate method and call it. 
 * This approach makes the guard reusable.
 * 
 * Alternatively, You could make a component-specific CanDeactivate guard for the CrisisDetailComponent. 
 * The canDeactivate method provides you with the current instance of the component, 
 * the current ActivatedRoute and RouterStateSnapshot in case you needed to access some external 
 * information. This would be useful if you only wanted to use this guard for this component 
 * and needed to ask the component's properties in or to confirm whether the router 
 * should allow navigation away from it.
 */
import { Injectable }    from '@angular/core';
import { CanDeactivate , ActivatedRouteSnapshot,
         RouterStateSnapshot} from '@angular/router';
import { Observable }    from 'rxjs/Observable';


import { CrisisDetailComponent } from './crisis-center/crisis-detail.component';

export interface CanComponentDeactivate {
 canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CrisisDetailComponent> {

  canDeactivate(
    component: CrisisDetailComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    // Get the Crisis Center ID
    console.log(route.params['id']);

    // Get the current URL
    console.log(state.url);

    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!component.crisis || component.crisis.name === component.editName) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return component.dialogService.confirm('Discard changes?');
  }
}
