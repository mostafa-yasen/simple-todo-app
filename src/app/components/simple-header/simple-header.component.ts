import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-header',
  templateUrl: './simple-header.component.html',
  styleUrls: ['./simple-header.component.scss']
})
export class SimpleHeaderComponent implements OnInit {
  title: string = "Simple TODO App"
  constructor() { }

  ngOnInit(): void {
  }

}
