import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AutofocusModule } from 'angular-autofocus-fix';
import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import {TodoService} from './todo.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';


// On crée les routes de notre Application
const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'registerUser', component: RegisterComponent },
  { path: 'loginUser', component: LoginComponent },
  { path: 'todo-item', component: TodoItemComponent },
  { path: 'todo-list', component: TodoListComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: '**', redirectTo: '/home', }

];



@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule, FormsModule, AutofocusModule,
    RouterModule.forRoot(routes), ReactiveFormsModule,
  ],
  exports: [RouterModule],

  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
