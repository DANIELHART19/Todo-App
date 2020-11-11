import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

//Todo database
  createDb() {
    const todos = [
    {
      id: 1,
      title: 'Washing Up',
      body: 'Get the washing up done',
      completed: false,
     
    },
    {
      id: 2,
      title: 'Go to the Gym',
      body: 'Get to the gym for 1pm',
      completed: false,
     
    },
    {
      id: 3,
      title: 'Make dinner',
      body: 'Get the dinner on for 6pm',
      completed: false,
     
    },
  ];
  return {todos};
  }

  // ensure that a todo always has an id.
  // If the todos array is empty, return the initial number (1).
  // if the todos array is not empty, return  id + 1.

  genId(todos: Todo[]): number{
    return todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1 
  }

  
}
