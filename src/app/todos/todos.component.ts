import { Component, OnInit } from '@angular/core';

import { Todo } from '../todo'
import { TodoService } from '../todo.service';
import { Router } from '@angular/router'

// The component decorator function is where the metadata for this component is stored
@Component({
  //selector name for component that can be inserted into another html template
  selector: 'app-todos',
  //link to components html template
  templateUrl: './todos.component.html',
    //link to components style sheet
  styleUrls: ['./todos.component.css']
})

//always export the component so it can be imported elsewhere
export class TodosComponent implements OnInit {
// todos is an array of Todo objects
todos: Todo[];

// inject TodoService
  constructor(private todoService: TodoService,
    private router: Router) { }

//lifecycle hook that gets called after component creation
  ngOnInit(): void {
   //calls getTodos on init
    this.getTodos();
  }


  //get todos from the todoService
  //subscribe passes the emitted array to callback which sets the components todos property
  getTodos() {
  this.todoService.getTodos()
  .subscribe(todos => this.todos = todos)
  }

  //add new todo 
  add(title: string, body: string): void {
    title = title.trim();
    body = body.trim()
    //make sure the is both a title and a body
    if (!title || !body) { return; }

    //send object to addTodo 
    this.todoService.addTodo({ title , body} as Todo)
    //receives the new todo and pushes it to todos list to be displayed
      .subscribe(todo => {
        this.todos.push(todo);
      });
  }

//delete todo from todos list
  delete(todo: Todo): void {
    this.todos = this.todos.filter(t => t !== todo);
    
    this.todoService.deleteTodo(todo).subscribe();
  }

}
