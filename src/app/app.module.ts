import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SimpleHeaderComponent } from './components/simple-header/simple-header.component';
import { TodoComponent } from './components/todo/todo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'src/material.module';
import { TodoInputComponent } from './components/todo-input/todo-input.component';

import { AppRoutingModule } from './app.routing.module';
import { routingComponents } from './app.routing.module';

import { HttpClientModule } from '@angular/common/http';
import { IdentityService } from './services/identity.service';

@NgModule({
  declarations: [
    AppComponent,
    SimpleHeaderComponent,
    TodoComponent,
    TodoInputComponent,
    routingComponents
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatTooltipModule,
    AppRoutingModule
  ],
  providers: [IdentityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
