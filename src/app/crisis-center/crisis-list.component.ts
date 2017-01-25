import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Crisis, CrisisService }  from './crisis.service';

@Component({
  template: `
    <ul class="items">
      <li *ngFor="let crisis of crises | async"
        (click)="onSelect(crisis)"
        [class.selected]="isSelected(crisis)">
          <span class="badge">{{ crisis.id }}</span>
          {{ crisis.name }}
      </li>
    </ul>
    <router-outlet></router-outlet>
  `
})

export class CrisisListComponent implements OnInit {
  
  crises: Observable<Crisis[]>;
  selectedId: number;

  constructor(
    private service: CrisisService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.crises = this.route.params
      .switchMap((params: Params) => {
        this.selectedId = +params['id'];
        return this.service.getCrises();
      });
  }

  isSelected(crisis: Crisis) {
    return crisis.id === this.selectedId;
  }
  
  /**
   * onSelect
   * --------
   * Use relative navigation 
   * so you don't have to start from the top of the route configuration.
   * When you visit the Crisis Center, the ancestor path is /crisis-center, 
   * so you only need to add the id of the Crisis Center to the existing path.
   */
  onSelect(crisis: Crisis) {
    this.selectedId = crisis.id;
    // Navigate with relative link
    this.router.navigate([crisis.id], { relativeTo: this.route });
  }
}
