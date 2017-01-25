
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { slideInDownAnimation } from '../animations';
import { Crisis, CrisisService }  from './crisis.service';

import { DialogService }  from '../dialog.service';

@Component({
  template: `
  <div *ngIf="crisis">
    <h3>"{{ editName }}"</h3>
    <div>
      <label>Id: </label>{{ crisis.id }}</div>
    <div>
      <label>Name: </label>
      <input [(ngModel)]="editName" placeholder="name"/>
    </div>
    <p>
      <button (click)="save()">Save</button>
      <button (click)="cancel()">Cancel</button>
    </p>
  </div>
  `,
  styles: ['input {width: 20em}'],
  animations: [ slideInDownAnimation ]
})

export class CrisisDetailComponent implements OnInit {
  
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';
  crisis: Crisis;
  editName: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialogService: DialogService
  ) {}

  ngOnInit() {
    this.route.data
      .subscribe((data: { crisis: Crisis }) => {
        this.editName = data.crisis.name;
        this.crisis = data.crisis;
      });
  }

  gotoCrises() {
    let crisisId = this.crisis ? this.crisis.id : null;
    /**
     * Notice that the path goes up a level (../) syntax. 
     * If the current crisis id is 1, the resulting path back to the 
     * crisis list is /crisis-center/;id=3;foo=foo.
     */
      // Pass along the crisis id if available
      // so that the CrisisListComponent can select that crisis.
      // Add a totally useless `foo` parameter for kicks.
      // Relative navigation back to the crises
     this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });
  }

  cancel() {
      this.gotoCrises();
  }

  save() {
      this.crisis.name = this.editName;
      this.gotoCrises();
  }

  /**
   * Notice that the canDeactivate method can return synchronously; 
   * it returns true immediately if there is no crisis or there are no pending changes. 
   * But it can also return a Promise or an Observable and the router
   * will wait for that to resolve to truthy (navigate) or falsey (stay put).
   */
  canDeactivate(): Promise<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!this.crisis || this.crisis.name === this.editName) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }

}
