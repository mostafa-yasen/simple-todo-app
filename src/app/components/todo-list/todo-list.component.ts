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

  async newItemEvent(newItem:Todo): Promise<void> {
    this.isLoading = true

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var body = JSON.stringify(newItem);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: body
    };

    let res = await fetch(this.baseUrl + "/todos", requestOptions)
      .then(response => response.json())
      .catch(error => {
        this.isLoading = false
        console.error('error', error)
      });

    if (res.code != 201) {
      this.isLoading = false
      return console.error(res)
    }
    this.isLoading = false
    this.todos.push(res.data)
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
      .then(response => response.json())
      .catch(err => {
        this.isLoading = false
        console.error(err);
      })

    if (res.code != 200) {
      this.isLoading = false
      return console.error(res)
    }

    this.todos = this.todos.filter(todo => todo._id != _id );
    this.isLoading = false
  }

}
