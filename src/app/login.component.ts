import { Component }   from '@angular/core';
import { Router, NavigationExtras }      from '@angular/router';
import { AuthService } from './auth.service';
@Component({
  template: `
    <h2>LOGIN</h2>
    <p>{{message}}</p>
    <p>
      <button (click)="login()"  *ngIf="!authService.isLoggedIn">Login</button>
      <button (click)="logout()" *ngIf="authService.isLoggedIn">Logout</button>
    </p>`
})
export class LoginComponent {
  message: string;
  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }
  
  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login() {
    this.message = 'Trying to log in ...';

    /* Preserve query parameters and fragments across navigations *
     * We can also preserve query parameters and fragments across navigations 
     * without having to re-provide them when navigating. 
     * In the LoginComponent, we add an object as the second argument in 
     * the router.navigate function and provide the preserveQueryParams and preserveFragment 
     * to pass along the current query parameters and fragment to the next route.
     */
    
    // Set our navigation extras object
    // that passes on our global query params and fragment
    let navigationExtras: NavigationExtras = {
      preserveQueryParams: true,
      preserveFragment: true
    };

    this.authService.login().subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/crisis-center/admin';
        // Redirect the user
        this.router.navigate([redirect], navigationExtras);
      }
    });
  }
  logout() {
    this.authService.logout();
    this.setMessage();
  }
}

/** NOTE 
 * 
 * Since you'll be navigating to the Admin Dashboard route after logging in,
 * we'll update it to handle the query parameters and fragment.
 * app/admin/admin-dashboard.component.ts 
 * 
 */