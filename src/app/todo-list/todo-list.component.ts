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

  filter: string; // On définit cette variable pour gérér la navigation du TodoList

  constructor(private todoService: TodoService) {
    todoService.dataInitialization();
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
    if( this.filter === 'all' ){ // Ici on obtient tous les items du TodoList et c'est cette liste qui est affichée par défaut
      return this.todoList.items;
    }
    else if( this.filter === 'active') { // Ici on obtient que les items non marqués en IsDone
      return this.todoList.items.filter(item => !item.isDone);

    }
    else if(this.filter == 'completed'){ // Ici on obtient les items marqués en IsDone
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

  // Début : Suppression de tous les items du TodoList
  deleteAllItems(){
    for(var item of this.todoList.items){
      this.todoService.removeItems(item);
    }
  }

  // Fin : Suppression de tous les items du TodoList

  // Début : Marquage des items en IsDone
  itemDone(item: TodoItemData, done:boolean){
    this.todoService.setItemsDone(done,item);
  }
  // Fin : Marquage des items en IsDone

  // Début : Mise à Jour des items
  itemLabel(item: TodoItemData, label:string){
    this.todoService.setItemsLabel(label, item);
  }
  // Fin : Mise à Jour des items

  // Début : Supprésion d'un item
  itemDelete(item: TodoItemData) {
    this.todoService.removeItems(item);
  }
  // Fin : Supprésion d'un item

}


