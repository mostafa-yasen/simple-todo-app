import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos:Todo[] = []

  constructor() { }

  ngOnInit(): void {
    this.todos.push({
      title: "Study Hard",
      done: false,
      created: new Date()
    })
    this.todos.push({
      title: "Connect to database ASAP",
      done: false,
      created: new Date()
    })
  }

}
