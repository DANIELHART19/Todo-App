import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosComponent } from './todos/todos.component'
import { TodoDetailComponent} from './todo-detail/todo-detail.component'
import { HomepageComponent } from './homepage/homepage.component';



//Array of route paths
const routes: Routes = [
  //path is a string that matches the URL
  //component is the component the router should create when navigation to this route
  {path: '', redirectTo: '/homepage', pathMatch: 'full'},
  {path: 'homepage', component: HomepageComponent},
  {path: 'todos', component: TodosComponent},
  //parameterized route
  {path: 'detail/:id', component: TodoDetailComponent}
];

@NgModule({
  //forRoot configures the router at the app root level
  imports: [RouterModule.forRoot(routes)],
  //makes routerModule availble throughout app
  exports: [RouterModule]
})
export class AppRoutingModule { }
