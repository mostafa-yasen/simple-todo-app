import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos:Todo[] | undefined | null;
  isLoading:boolean = false;
  hideDone:boolean = false;
  snackBarOptions = {
    duration: 3000
  }

  constructor(
      private _snackBar: MatSnackBar, 
      private _todo_service: TodoService,
      private _router: Router
    ) {
  }

  async ngOnInit(): Promise<void|boolean> {
    if (!sessionStorage.getItem("logged-in")) {
      return this._router.navigate(['identity'])
    }
    this.todos = []
    debugger
    // BUG: check why the list is cached
    await this.getAllItems()
  }
  ngOnDestroy() {
    this.todos = [];
    console.log("TODOs Cleared");
  }

  async editItem(todoItem:Todo): Promise<void> {
    this.isLoading = true
    this._todo_service.update(todoItem)
      .subscribe(res => {
        this._snackBar.open(res.message, 'Dismiss', this.snackBarOptions);
        this.isLoading = false
      }, error => {
        this._snackBar.open(error, 'Dismiss', this.snackBarOptions);
        this.isLoading = false
      })
  }

  async newItemEvent(newItem:Todo): Promise<void> {
    this.isLoading = true
    this._todo_service.insert(newItem).subscribe(
      res => {
        this.todos?.push(res.data)
        this.isLoading = false
      },
      err => {
        this._snackBar.open(err, "Dismiss", this.snackBarOptions)
        this.isLoading = false
      }
    )
  }

  private async getAllItems() {
    this.isLoading = true
    this._todo_service.getAll()
      .subscribe(res => {
        this.todos = res.data
        this.isLoading = false
      }, err => {
        this._snackBar.open(err, 'Dismiss')
        this.isLoading = false
      })
  }

  async deleteItem(_id:string): Promise<void> {
    this.isLoading = true

    this._todo_service.delete(_id)
      .subscribe(res => {
        this.todos = this.todos?.filter((todo: Todo) => todo._id != _id );
        this._snackBar.open(res.message, 'Dismiss', this.snackBarOptions);
        this.isLoading = false
      }, error => {
        this._snackBar.open(error, 'Dismiss', this.snackBarOptions);
        this.isLoading = false
      })
  }
}
