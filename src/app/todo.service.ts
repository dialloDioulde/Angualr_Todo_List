import { Injectable } from '@angular/core';
import {TodoListData} from './dataTypes/TodoListData';
import {Observable, BehaviorSubject} from 'rxjs';
import {TodoItemData} from './dataTypes/TodoItemData';

@Injectable()
export class TodoService {

  // Récupération des Données du TodoList dans le Local Storage
  private todoListSubject=  new BehaviorSubject<TodoListData>({label: 'TodoList', items: []} );

  constructor() {
    this.todoListSubject = new BehaviorSubject<TodoListData>(JSON.parse(localStorage.getItem("todoList")));
  }

  getTodoListDataObservable(): Observable<TodoListData> {
    return this.todoListSubject.asObservable();
  }

  setItemsLabel(label: string, ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label,
      items: tdl.items.map( I => items.indexOf(I) === -1 ? I : ({label, isDone: I.isDone}) )
    });
    this.localStorageData();
  }

  setItemsDone(isDone: boolean, ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label,
      items: tdl.items.map( I => items.indexOf(I) === -1 ? I : ({label: I.label,  isDone}) )
    });
    this.localStorageData();
  }

  appendItems( ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label, // ou on peut écrire: ...tdl,
      items: [...tdl.items, ...items]
    });
    this.localStorageData();
  }

  removeItems( ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label, // ou on peut écrire: ...tdl,
      items: tdl.items.filter( I => items.indexOf(I) === -1 )
    });
    this.localStorageData();
  }

  // On initialise les Données du Local Storage
  dataInitialization(){
    if(!localStorage.getItem('todoList') || {} ){
      let data = JSON.stringify(this.todoListSubject.getValue());
      localStorage.setItem("todoList", data);
    }
  }

  // On met à Jour les Données du Local Storage
  localStorageData(){
    let newData = JSON.stringify(this.todoListSubject.getValue());
    localStorage.setItem("todoList", newData);
  }

}
