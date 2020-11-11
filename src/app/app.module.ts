import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { FormsModule } from '@angular/forms';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { HomepageComponent } from './homepage/homepage.component';

//NgModule - similar to component decorator - where app wide metadata is stored
@NgModule({
  declarations: [
    //all this modules components
    AppComponent,
    TodosComponent,
    TodoDetailComponent,
    HomepageComponent
  ],
  imports: [
    //external modules that the app needs
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // angulars mechanism for commmunicationg with remote server (HTTP)
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation:false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
