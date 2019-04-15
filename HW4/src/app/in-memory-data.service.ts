import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 1, user: 'Jimmy', hero: 'Iron Man' },
      { id: 2, user: 'April', hero: 'Captain America' },
      { id: 3, user: 'John', hero: 'Spider Man' },
      { id: 4, user: 'Zoe', hero: 'Winter Soldier' },
      { id: 5, user: 'Rocket', hero: 'Groot' },
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 21;
  }

  constructor() { }
}
