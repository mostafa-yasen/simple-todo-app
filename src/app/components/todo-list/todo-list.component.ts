import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos:Todo[];
  baseUrl: string;
  isLoading:boolean = false

  constructor() {
    this.todos = []
    this.baseUrl = "http://localhost:9090/api/v1"
  }

  newItemEvent(newItem:Todo):void {
    // TODO: consume create item API
    this.todos.push(newItem)
  }

  async ngOnInit(): Promise<void> {
    await this.getAllItems()
  }

  private async getAllItems() {
    this.isLoading = true
    let route = "/todos"
    let res = await fetch(this.baseUrl + route).then(response => response.json())
    if (res.code != 200) {
    this.isLoading = false
      return console.error(res)
    }
    this.todos = res.data
    this.isLoading = false
  }

  async deleteItem(_id:string): Promise<void> {
    this.isLoading = true

    var requestOptions = {
      method: 'DELETE'
    };

    let res = await fetch(`${this.baseUrl}/todos/${_id}`, requestOptions)
      .then(response => response.json());

    if (res.code != 200) {
      this.isLoading = false
      return console.error(res)
    }

    this.todos = this.todos.filter(todo => todo._id != _id );
    this.isLoading = false
  }

}
