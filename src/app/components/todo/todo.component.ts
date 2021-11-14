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

  constructor() {
    this.delete = new EventEmitter()
  }

  _delete(itemId:string) {
    this.delete.emit(itemId)
  }

  ngOnInit(): void {
  }

}
