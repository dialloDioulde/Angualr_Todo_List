import {ChangeDetectionStrategy, Component} from '@angular/core';
import * as firebase from "firebase";
import {TodoService} from './todo.service';
import {TodoListData} from './dataTypes/TodoListData';
import {TodoItemData} from './dataTypes/TodoItemData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'Angular Todo-List';

  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyCeVw5V4FPKZc-P3e09ikfUDOQiKhAcYT8',
      authDomain: 'angular-todolist-27ed3.firebaseapp.com',
      databaseURL: 'https://angular-todolist-27ed3.firebaseio.com',
      projectId: 'angular-todolist-27ed3',
      storageBucket: 'angular-todolist-27ed3.appspot.com',
      messagingSenderId: '742415764216',
      appId: '1:742415764216:web:4dc8f346f0106f86f8c90d'
    };
    firebase.initializeApp(firebaseConfig);
  }
}
