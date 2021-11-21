import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { IdentityService } from 'src/app/services/identity.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss']
})
export class IdentityComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private _identityService: IdentityService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  // Login Form
  loginEmail = new FormControl('', [
    Validators.email,
    Validators.required
  ])
  loginPassword = new FormControl('', [
    Validators.required
  ])

  // Register Form
  registerEmail = new FormControl('', [
    Validators.required,
    Validators.email
  ])
  registerFullName = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(30)
  ])
  registerPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ])
  registerRePassword = new FormControl('', [
    Validators.required
  ])
  tabIndex = 0

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.tabIndex = parseInt(params['tabIndex']) || 0;
      }
    );
  }

  login() {
    if (this.loginEmail.invalid || this.loginPassword.invalid) {
      this._snackBar.open("Please make sure the for is valid.", "Dismiss")
      return
    }

    this._identityService.login(this.loginEmail.value, this.loginPassword.value)
      .subscribe(response => {
        this._snackBar.open(`${response!.code} ${response!.message}` , "Dismiss")
        this.router.navigate(['/todos'])
      }, error => {
        this._snackBar.open(error , "Dismiss")
      })
  }

  register() {
    if (
      this.registerEmail.invalid
      || this.registerFullName.invalid
      || this.registerPassword.invalid
      || this.registerRePassword.invalid
    ) {
      this._snackBar.open("Please fill in the required fields.", "Dismiss")
      return
    }
    this._identityService.register(
      this.registerEmail.value,
      this.registerFullName.value,
      this.registerPassword.value)
      .subscribe(response => {
        this._snackBar.open(`${response.code} ${response.message}` , "Dismiss")
      }, error => {
        this._snackBar.open(error , "Dismiss")
      })
  }
}
