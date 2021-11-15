import { Component, OnInit, Input, Output } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @Input() todo!: Todo;
  @Output() delete:EventEmitter<string>
  @Output() edit:EventEmitter<Todo>

  constructor() {
    this.delete = new EventEmitter()
    this.edit = new EventEmitter()
  }

  _edit(item:Todo) {
    this.edit.emit(item)
  }

  _delete(itemId:string) {
    this.delete.emit(itemId)
  }

  ngOnInit(): void {
  }

}
