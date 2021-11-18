import { NgModule } from "@angular/core";
import {Routes, RouterModule, Router } from "@angular/router"
import { IdentityComponent } from "./components/identity/identity.component"
import { TodoListComponent } from "./components/todo-list/todo-list.component";


const routes: Routes = [
    { path: "identity", component: IdentityComponent },
    { path: "todos", component: TodoListComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = [IdentityComponent, TodoListComponent]
