import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos:Todo[];

  constructor() {
    this.todos = []
  }

  ngOnInit(): void {
    this.todos.push({
      _id: "000000001",
      title: "Study Hard",
      done: false,
      created: new Date()
    })
    this.todos.push({
      _id: "000000002",
      title: "Connect to database ASAP",
      done: false,
      created: new Date()
    })
  }

  deleteItem(_id:string):void {
    this.todos = this.todos.filter(todo => todo._id != _id );
  }

}
