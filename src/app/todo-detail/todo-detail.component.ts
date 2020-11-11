import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../todo';
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common';
import { TodoService } from '../todo.service'

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {
  // the todo property must be an input so it can bind todosCompoent with todoDetail
  @Input() todo: Todo;

  constructor(
    //route parameters - id
    private route: ActivatedRoute,
    // gets todo data to display
    private todoService: TodoService,
    //allows nagivation by interacting with the browser
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.getTodo();
  }

  //navigates back one step in the browers history
  goBack(){
    this.location.back();
  }

  //updates edited todo
  save(){
    this.todoService.updateTodo(this.todo)
    .subscribe(() => this.goBack())
  }


  getTodo() {
    // snapShot- route info after component creation
    // paraMap 'id' key returns id of the todo to fetch
    const id = +this.route.snapshot.paramMap.get('id');
    this.todoService.getTodo(id)
    .subscribe(todo => this.todo = todo)
  }
}
