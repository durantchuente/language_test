import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {
  constructor() { }
  createDb() {
    return {
      languages: [
        {
          id: 1,
          language: 'fr',
          spoken_level: 'current',
          written_level: 'current',
          comprehension_level: 'intermediate'
        },
        {
          id: 2,
          language: 'en',
          spoken_level: 'current',
          written_level: 'pre_intermediate',
          comprehension_level: 'intermediate'
        },
      ]
    };
  }
}