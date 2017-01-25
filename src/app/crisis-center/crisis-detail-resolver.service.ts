/**
 * At the moment, the CrisisDetailComponent retrieves the selected crisis. 
 * If the crisis is not found, it navigates back to the crisis list view.
 * 
 * 
 * The experience might be better all if this were handled first, 
 * before the route is activated. A CrisisDetailResolver service could retrieve 
 * a Crisis or navigate away if the Crisis does not existing before activating 
 * the route and creating the CrisisDetailComponent.
 * 
 * We create the crisis-detail-resolver.service.ts file within the Crisis Center feature area.
 */
import { Injectable }             from '@angular/core';
/**
 * Import the Crisis model and CrisisService and also the Router
 *  so you can navigate elsewhere if you can't fetch the crisis.
*/
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Crisis, CrisisService } from './crisis.service';


// Implement the Resolve interface with a type of Crisis.
@Injectable()
export class CrisisDetailResolver implements Resolve<Crisis> {
  
  // Inject the CrisisService and Router and implement the resolve method
  constructor(private cs: CrisisService, private router: Router) {}
  
  // The resolve method could return a Promise, an Observable, or a synchronous return value.
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Crisis> {
    
    let id = route.params['id'];
    
    /**
     * The CrisisService.getCrisis method returns a promise. 
     * Return that promise to prevent the route from loading
     * until the data is fetched, If it doesn't return a valid Crisis, 
     * navigate the user back to the CrisisListComponent, canceling the previous 
     * in-flight navigation to the CrisisDetailComponent.
     */
    return this.cs.getCrisis(id).then(crisis => {
      if (crisis) {
        return crisis;
      } else { // id not found
        this.router.navigate(['/crisis-center']);
        return null;
      }
    });
  }
}

/**
 * Import this resolver in the crisis-center-routing.module.ts and 
 * add a resolve object to the CrisisDetailComponent route configuration.
 */
