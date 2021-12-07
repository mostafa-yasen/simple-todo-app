import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simple-header',
  templateUrl: './simple-header.component.html',
  styleUrls: ['./simple-header.component.scss']
})
export class SimpleHeaderComponent implements OnInit {
  title: string = "Simple Todo"

  @Input() isLoggedIn: boolean = true
  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    sessionStorage.removeItem('jwt-token')
    sessionStorage.setItem('logged-in', 'false')
    this._router.navigate(['/identity'])
  }
}
