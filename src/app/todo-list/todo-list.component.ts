import { ActivatedRoute } from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {TodoListData} from '../dataTypes/TodoListData';
import {TodoItemData} from '../dataTypes/TodoItemData';
import {TodoService} from '../todo.service';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  private todoItemData: TodoItemData;
  private todoList: TodoListData;
  filter: string;

  constructor(private todoService: TodoService) {
    todoService.getTodoListDataObservable().subscribe( tdl => this.todoList = tdl );
  }

  ngOnInit() {
    // Par défaut la page de la Navigation à afficher est All
    this.filter = 'all';
  }

  get label(): string {
    return this.todoList.label;
  }

  get items(): TodoItemData[] {
    return this.todoList.items;
  }

  // Début : Gestion de la Navigation du TodoList
  itemFiltered(){
    if( this.filter === 'all' ){
      return this.todoList.items;
    }
    else if( this.filter === 'active') {
      return this.todoList.items.filter(item => !item.isDone);

    }
    else if(this.filter == 'completed'){
      return this.todoList.items.filter(item => item.isDone);

    }
  }
  // Fin : Gestion de la Navigation du TodoList


  // Début : Ajout des items
  appendItem(label: string){
    let count = 0;
    for(var i = 0; i < label.length; i = i + 1){
      if(label[i] === ' '){
        count = count + 1;
      }
    }
    if(label.length != 0 && !(count == label.length) ){
      this.todoService.appendItems({
      label,
      isDone: false,
    });
    }
  }
  // Fin : Ajout des items

  // Début : Marquage de tous les items en IsDone ou !IsDone
  allItemIsDone(){
    let allItemDone = true;
    for(var item of this.todoList.items){
      if (item.isDone == false){
       this.todoService.setItemsDone(true,item);
       allItemDone = false;
      }
    }
    if(allItemDone){
      for(var item of this.todoList.items){
        this.todoService.setItemsDone(false,item);
      }
      allItemDone = false;
    }
  }
  // Fin :  Marquage de tous les items en IsDone ou !IsDone

  // Début : Comptage des items non Marqués en IsDone
  countItemNotDone(){
    let count = 0;
    for(var item of this.todoList.items){
      if(item.isDone == false) {
        count = count + 1;
      }
    }
    return count;
  }
  // Fin : Comptage des items non Marqués en IsDone

  // Début : Suppression de tous les items marqués en IsDone
  clearCompletedBtn(){
    let stop = false;
    for( var item of this.todoList.items){
      if(item.isDone == true){
        stop = true;
      }
    }
    return stop;
  }
  //
  clearCompleted(){
    for(var item of this.todoList.items){
      if(item.isDone == true){
        this.todoService.removeItems(item);
      }
    }
  }
  // Fin : Suppression de tous les items marqués en IsDone


  //
  itemDone(item: TodoItemData, done:boolean){
    this.todoService.setItemsDone(done,item);
  }

  itemLabel(item: TodoItemData, label:string){
    this.todoService.setItemsLabel(label, item);
  }

  itemDelete(item: TodoItemData) {
    this.todoService.removeItems(item);
  }
  //

}


