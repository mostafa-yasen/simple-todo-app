import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss']
})
export class TodoInputComponent implements OnInit {
  value:string = "";
  @Output() newItem:EventEmitter<Todo>

  constructor() { 
    this.newItem = new EventEmitter<Todo>()
  }

  _addItem(event: Event):void {
    if (!this.value) return
    let item = new Todo("", this.value, false, new Date(), 0)
    this.newItem.emit(item)
    this.value = ""
  }

  ngOnInit(): void {
  }

}
