import { Injectable } from '@angular/core';
export class Hero {
  constructor(public id: number, public name: string) { }
}
let HEROES = [
  new Hero(11, 'Jodi Kettle'),
  new Hero(12, 'Guillermo Castro'),
  new Hero(13, 'Giovanni Olivieri'),
  new Hero(14, 'John Field'),
  new Hero(15, 'Mauro Schaparini'),
  new Hero(16, 'Navin Sadarangani'),
  new Hero(17, 'Oscar Lagatta'),
  new Hero(18, 'Tom Morenikeji'),
  new Hero(19, 'Tun Hein'),
  new Hero(20, 'Uzma Hassan')
];
let heroesPromise = Promise.resolve(HEROES);
@Injectable()
export class HeroService {
  getHeroes() { return heroesPromise; }
  getHero(id: number | string) {
    return heroesPromise
      .then(heroes => heroes.find(hero => hero.id === +id));
  }
}
