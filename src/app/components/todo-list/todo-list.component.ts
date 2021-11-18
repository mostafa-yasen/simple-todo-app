import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos:Todo[];
  baseUrl: string;
  isLoading:boolean = false;
  hideDone:boolean = false;
  snackBarOptions = {
    duration: 3000
  }

  constructor(private _snackBar: MatSnackBar) {
    this.todos = []
    this.baseUrl = "http://localhost:9090/api/v1"
  }

  async editItem(todoItem:Todo): Promise<void> {
    this.isLoading = true
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var body = JSON.stringify(todoItem);

    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: body
    };

    let route = `/todos/${todoItem._id}`
    let res = await fetch(this.baseUrl + route, requestOptions)
      .then(response => response.json())
      .catch(error => {
        this.isLoading = false
        this._snackBar.open(error, 'Dismiss');
      });

      if (res.code != 200) {
        this._snackBar.open(res.message, 'Dismiss');
        return console.error(res)
      }
      this.isLoading = false
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
      this._snackBar.open(res.message, 'Dismiss');
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
    let res = await fetch(this.baseUrl + route)
      .then(response => response.json())
      .catch(error => {
        this._snackBar.open(error, 'Dismiss');
      })

    if (res.code != 200) {
      this.isLoading = false
      this._snackBar.open(res.message, 'Dismiss', this.snackBarOptions);
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
        this._snackBar.open(err, 'Dismiss');
      })

    if (res.code != 200) {
      this.isLoading = false
      this._snackBar.open(res.message, 'Dismiss');
      return
    }

    this.todos = this.todos.filter(todo => todo._id != _id );
    this.isLoading = false
  }
}
