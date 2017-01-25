/**
 * This is a general purpose guard — you can imagine other features that require authenticated users
 * — so you create an auth-guard.service.ts in the application root folder.
 * 
 * Next you open admin-routing.module.ts, import the AuthGuard class, and update the admin route 
 * with a CanActivate guard property that references it:
 */

import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';
import { AuthService }      from './auth.service';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  /**
   * Extend the AuthGuard to protect when navigating 
   * between the admin routes. 
   * Add the CanActivateChild interface 
   * from the router package.
   */
  CanActivateChild,
  NavigationExtras,
  CanLoad,
  Route

} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    // Notice that you inject the AuthService 
    // and the Router in the constructor. 
    // You haven't provided the AuthService yet but 
    // it's good to know that you can inject helpful services
    //  into routing guards.
    constructor(private authService: AuthService, 
                private router: Router) {}
   
   canActivate(route: ActivatedRouteSnapshot, 
               state: RouterStateSnapshot) {
    
      // The ActivatedRouteSnapshot contains the future route 
      // that will be activated and 
      // the RouterStateSnapshot contains 
      // the future RouterState of the application, 
      // should you pass through the guard check.
      
      // If the user is not logged in, 
      //  we you store the attempted URL the user came from 
      // using the RouterStateSnapshot.url and tell the router 
      // to navigate to a login page 

      let url: string = state.url;           
    
      // console.log('AuthGuard#canActivate called');
      // return true;
      return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, 
                   state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
  }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;


    // Create a dummy session id
    let sessionId = 123456789;

    /**
     * Query Parameters and Fragments
     * 
     * what if you wanted optional parameters available to all routes?
     * This is where query parameters come into play.
     * 
     * Fragments refer to certain elements on the page identified with an id attribute.
     * 
     * We update the AuthGuard to provide a session_id query that will remain
     * after navigating to another route.
     */

    // We add an anchor element so you can jump to a certain point on the page.
    // Set our navigation extras object
    // that contains our global query params and fragment
    let navigationExtras: NavigationExtras = {
      queryParams: { 'session_id': sessionId },
      fragment: 'anchor'
    };

    // We add the NavigationExtras object to the router.navigate method 
    // that navigates you to the /login route.
    // Navigate to the login page with extras
    this.router.navigate(['/login'], navigationExtras);
    return false;
  }


  /**
   * We're already protecting the AdminModule with a CanActivate guard that prevents unauthorized 
   * users from accessing the admin feature area. 
   * It redirects to the login page if the user is not authorized.
   * 
   * But the router is still loading the AdminModule even if the user can't visit any of its components. 
   * Ideally, we only load the AdminModule if the user is logged in.
   * 
   * We add a CanLoad guard that only loads the AdminModule once the user is logged in 
   * and attempts to access the admin feature area. 
   * 
   * import the AuthGuard into the AppRoutingModule and add the AuthGuard to the 
   * canLoad array for the admin route. 
   */
  canLoad(route: Route): boolean {
    let url = `/${route.path}`;

    return this.checkLogin(url);
  }

}


/** NOTE 
 * 
 * We can also preserve query parameters and fragments across navigations without having to
 * re-provide them when navigating. 
 * In the LoginComponent, we'll add an object as the second argument in the router.navigate function 
 * and provide the preserveQueryParams and preserveFragment to pass along the current query parameters 
 * and fragment to the next route.
 */