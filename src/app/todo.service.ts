import { Injectable } from '@angular/core';
import { Todo } from './todo';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

//Dependency injection system
@Injectable({
  // allows todoService to be injected into any class that asks for it
  providedIn: 'root'
})
export class TodoService {


  httpOptions = {
    //let server know it is Json
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // URL to web api
  private todosUrl = 'api/todos'; 

  constructor(
    private http: HttpClient,
  ) { }

//Observable from rxJs library
//Observable is a  technique use for event handling ,asynchronous programming and handling multiple events
//Obeervable emits a Todo array
  getTodos() : Observable<Todo[]> {
    //call get request on the todosUrl
    //returns a obverable of todo array
    return this.http.get<Todo[]>(this.todosUrl)
    //pipe http result
    .pipe(
      //catchError catches Obserables that fail, the passes the error
      // to the error handling function
      catchError(this.handleError<Todo[]>('getTodos', []))
    )
  }


  //request URL with desired todo's id
  //return a single object of a todo instead of an array
  getTodo(id:number): Observable<Todo>{
    const url = `${this.todosUrl}/${id}`;
    return this.http.get<Todo>(url).pipe(
      catchError(this.handleError<Todo>(`getTodo id=${id}`))
    );
  }

  //update the todo on the server with PUT
  updateTodo(todo:Todo): Observable<any>{
    return this.http.put(this.todosUrl, todo, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateTodo'))
    )

  }


  // completedTodo(todo:Todo): Observable<Todo>{
  //   return this.http.put(this.todosUrl, todo, this.httpOptions).pipe(
  //     catchError(this.handleError<any>('completedTodo'))
  // }


  //POST: add a new hero to the server 
  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, this.httpOptions).pipe(
      catchError(this.handleError<Todo>('addTodo'))
    );
  }


  // delete the hero from the server
  deleteTodo(todo: Todo | number): Observable<Todo> {
    const id = typeof todo === 'number' ? todo : todo.id;
    const url = `${this.todosUrl}/${id}`
    //calls HttpClient delete
    return this.http.delete<Todo>(url, this.httpOptions)
    .pipe(
      catchError(this.handleError<Todo>('deleteTodo'))
    )
  }


  //handle Http operation that failed
  //let app continue
  //name of operation that failed
  //result value to return as observable result
  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      // log to console the error
      console.error(error)
      //let the app keep running by returning an empty result
      return of(result as T);
    }
  }
}