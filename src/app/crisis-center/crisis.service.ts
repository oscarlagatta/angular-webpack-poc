import { Injectable } from '@angular/core';

export class Crisis {
  constructor(public id: number, public name: string) { }
}
let CRISES = [
 new Crisis(1,  'Lobster Burning Harvey Nichols'),
  new Crisis(2, 'OFS Not Processing Refunds'),
  new Crisis(3, 'Giant Asteroid destroy G2 server'),
  new Crisis(4, 'Procrastinators Meeting Delayed Again'),
];

let crisesPromise = Promise.resolve(CRISES);

@Injectable()
export class CrisisService {

  static nextCrisisId = 100;
  
  getCrises() { return crisesPromise; }

  getCrisis(id: number | string) {
    return crisesPromise
      .then(crises => crises.find(crises => crises.id === +id));
  }

  addCrisis(name: string) {
    name = name.trim();
    if (name) {
      let crisis = new Crisis(CrisisService.nextCrisisId++, name);
      crisesPromise.then(crises => crises.push(crisis));
    }
  }
  
}
